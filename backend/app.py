import os
from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.backends import default_backend
from cryptography.exceptions import InvalidTag
import io

# -----------------------------
# Flask App Configuration
# -----------------------------
app = Flask(__name__)

# ✅ FIXED CORS CONFIG - More permissive for development
CORS(
    app,
    resources={r"/*": {
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "expose_headers": ["Content-Disposition"],
        "supports_credentials": True
    }}
)

# ✅ Additional CORS headers via after_request (backup method)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Expose-Headers', 'Content-Disposition')
    return response

backend = default_backend()
SALT_SIZE = 16  # 16 bytes for PBKDF2 salt
IV_SIZE = 12    # 12 bytes for AES-GCM IV
PBKDF2_ITERATIONS = 100000


# -----------------------------
# Helper: Derive AES key
# -----------------------------
def get_key(password: str, salt: bytes) -> bytes:
    """Derives a 256-bit key from a password and salt using PBKDF2."""
    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,  # 32 bytes = 256 bits
        salt=salt,
        iterations=PBKDF2_ITERATIONS,
        backend=backend
    )
    return kdf.derive(password.encode('utf-8'))


# -----------------------------
# Health Check Endpoint
# -----------------------------
@app.route('/health', methods=['GET'])
def health_check():
    """Simple endpoint to test if CORS is working."""
    return jsonify({"status": "ok", "message": "Backend is running!"})


# -----------------------------
# Encrypt Endpoint
# -----------------------------
@app.route('/encrypt', methods=['POST', 'OPTIONS'])
def encrypt_file():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return '', 204
    
    if 'file' not in request.files or 'password' not in request.form:
        return jsonify({"error": "Missing file or password"}), 400

    file = request.files['file']
    password = request.form['password']

    if not file.filename:
        return jsonify({"error": "No file selected"}), 400

    try:
        file_data = file.read()
        salt = os.urandom(SALT_SIZE)
        iv = os.urandom(IV_SIZE)
        key = get_key(password, salt)

        aesgcm = AESGCM(key)
        encrypted_data = aesgcm.encrypt(iv, file_data, None)

        combined_data = salt + iv + encrypted_data
        output_file = io.BytesIO(combined_data)
        output_file.seek(0)
        output_filename = f"encrypted-{file.filename}"

        return send_file(
            output_file,
            as_attachment=True,
            download_name=output_filename,
            mimetype='application/octet-stream'
        )

    except Exception as e:
        print(f"Encryption error: {e}")
        return jsonify({"error": "An error occurred during encryption."}), 500


# -----------------------------
# Decrypt Endpoint
# -----------------------------
@app.route('/decrypt', methods=['POST', 'OPTIONS'])
def decrypt_file():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        return '', 204
    
    if 'file' not in request.files or 'password' not in request.form:
        return jsonify({"error": "Missing file or password"}), 400

    file = request.files['file']
    password = request.form['password']

    if not file.filename:
        return jsonify({"error": "No file selected"}), 400

    try:
        file_data = file.read()
        salt = file_data[:SALT_SIZE]
        iv = file_data[SALT_SIZE:SALT_SIZE + IV_SIZE]
        encrypted_data = file_data[SALT_SIZE + IV_SIZE:]

        key = get_key(password, salt)

        aesgcm = AESGCM(key)
        decrypted_data = aesgcm.decrypt(iv, encrypted_data, None)

        output_file = io.BytesIO(decrypted_data)
        output_file.seek(0)
        output_filename = file.filename.replace("encrypted-", "decrypted-", 1)

        return send_file(
            output_file,
            as_attachment=True,
            download_name=output_filename,
            mimetype='application/octet-stream'
        )

    except InvalidTag:
        print("Decryption failed: InvalidTag")
        return jsonify({"error": "Decryption failed. Check password or file integrity."}), 400
    except Exception as e:
        print(f"Decryption error: {e}")
        return jsonify({"error": "An error occurred during decryption."}), 500


# -----------------------------
# Run Flask App
# -----------------------------
if __name__ == '__main__':
    print("🚀 Starting Flask server on http://localhost:5001")
    print("✅ CORS enabled for http://localhost:3000")
    app.run(debug=True, port=5001, host='0.0.0.0')