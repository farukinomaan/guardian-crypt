import os

# Get port from environment variable, default to 5001
port = int(os.environ.get("PORT", 5001))

bind = f"0.0.0.0:{port}"
workers = int(os.environ.get("WEB_CONCURRENCY", 1))
worker_class = "sync"
loglevel = "info"
accesslog = "-"
errorlog = "-"
