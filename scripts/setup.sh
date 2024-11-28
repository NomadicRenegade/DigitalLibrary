#!/bin/bash

# Create necessary directories
mkdir -p uploads
mkdir -p app/ml/models

# Initialize database
python scripts/init_db.py

# Start services
docker-compose up -d

# Wait for services to be ready
echo "Waiting for services to be ready..."
sleep 10

# Run database migrations
alembic upgrade head

# Initial file crawl
python scripts/crawl_files.py

echo "Setup complete!"