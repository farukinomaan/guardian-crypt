# 🔒 GuardianCrypt: Military-Grade File Encryption

GuardianCrypt is a fast, secure, and user-friendly web application for encrypting and decrypting files using military-grade **AES-256 GCM** cryptography. It operates on a **zero-knowledge** principle, meaning your password and file data are processed securely without being stored or logged on the server.

The application is built with a modern **Next.js** (App Router) frontend and a lightweight, high-performance **Python Flask** backend.

---

## ✨ Features

* **AES-256 GCM Encryption:** Utilizes the industry-standard Advanced Encryption Standard with a 256-bit key in Galois/Counter Mode for maximum security.
* **Zero-Knowledge Architecture:** Files and passwords are never permanently stored. The backend processes the data in memory and immediately returns the encrypted/decrypted file.
* **Strong Key Derivation:** Employs **PBKDF2 with 100,000 iterations** and a unique **16-byte salt** to securely derive the AES key from your password, protecting against brute-force attacks.
* **Cross-Platform:** Python backend and Next.js frontend can be run easily on any major operating system.
* **File Handling:** Supports drag-and-drop or file browsing for both encryption and decryption operations.

---

## 🏗️ Architecture

GuardianCrypt is a mono-repo structure split into two main services:

1.  **`frontend/` (Next.js):** The user interface, built with Next.js (TypeScript) and Tailwind CSS, providing a seamless file upload, password entry, and download experience. It acts as a proxy for the backend API calls.
2.  **`backend/` (Python/Flask):** A minimalist Flask API that handles the core cryptographic operations using the `cryptography` library.

### Key Backend Components (`backend/app.py`)

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/encrypt` | `POST` | Takes a file and password, generates a unique **salt** and **IV**, derives a key using PBKDF2, performs AES-256 GCM encryption, and returns the combined file (`salt + IV + encrypted_data`). |
| `/decrypt` | `POST` | Takes an encrypted file and password, extracts the salt and IV, derives the key, attempts decryption, and returns the original file. Includes explicit **InvalidTag** handling for incorrect passwords/tampered files. |
| `/health` | `GET` | Simple health check for server status. |

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

* Node.js (v18+) and npm/yarn/pnpm
* Python (v3.8+) and pip

### 1. Setup the Backend (Python/Flask)

Navigate to the `backend` directory, create a virtual environment, and install dependencies.

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate
pip install -r requirements.txt
````

Run the Flask server. It will run on `http://localhost:5001`.

```bash
python app.py
# or using gunicorn for production-like environment:
# gunicorn -c gunicorn.config.py app:app
```

### 2\. Setup the Frontend (Next.js)

Open a **new terminal session**, navigate to the `frontend` directory, and install Next.js dependencies.

```bash
cd ../frontend
npm install
```

Start the Next.js development server. It will run on `http://localhost:3000`.

```bash
npm run dev
```

The frontend is configured to call the Python backend running on `http://localhost:5001` via the Next.js API Routes (`/api/encrypt`, `/api/decrypt`).

-----

## ⚙️ Configuration & Deployment

### Environment Variables

The frontend uses the following environment variable, primarily for deployment:

| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `BACKEND_URL` | `http://localhost:5001` | The full URL of the running Python backend service. |

You can set this in a `.env.local` file in the `frontend` directory, or configure it during deployment (e.g., on Vercel or a custom host).

### Deployment Notes

  * **Backend:** The `gunicorn.config.py` is set up for running the Flask app with Gunicorn, suitable for deployment on platforms like Heroku, Render, or a VPS.
  * **Frontend:** The Next.js frontend is optimally designed for deployment on [Vercel](https://vercel.com).
  * **CORS:** Note that the Python backend (`backend/app.py`) has CORS explicitly enabled for `http://localhost:3000` for local development. Adjust these settings for a production environment.

-----

## 🛠️ Other Tools

### Security Details

The Python backend enforces strong cryptographic primitives:

  * **Algorithm:** AES-256 in GCM (Galois/Counter Mode).
  * **Key Derivation:** PBKDF2 with SHA-256.
  * **Iterations:** **100,000** (defined by `PBKDF2_ITERATIONS`).
  * **Salt Size:** 16 bytes.
  * **IV (Nonce) Size:** 12 bytes.

The encrypted file format is a concatenation of these components: `[16-byte SALT] + [12-byte IV] + [Encrypted Data + GCM Tag]`. This allows the decryption endpoint to securely retrieve the necessary components.

-----

## 🤝 Contributing

Contributions are welcome\! Feel free to open issues or submit pull requests for bug fixes, new features, or improvements.

**License:** *MIT*
