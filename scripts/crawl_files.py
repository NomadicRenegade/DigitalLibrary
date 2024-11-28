import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.crawlers.file_crawler import FileCrawler
from config import settings

def main():
    """Crawl files in the upload directory"""
    try:
        crawler = FileCrawler(settings.UPLOAD_FOLDER)
        crawler.sync_database()
        print("File crawling completed successfully")
    except Exception as e:
        print(f"Error during file crawling: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()