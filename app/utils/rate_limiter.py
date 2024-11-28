from datetime import datetime, timedelta
import time

class RateLimiter:
    def __init__(self, max_files_per_minute: int = 100, batch_size: int = 10):
        self.max_files_per_minute = max_files_per_minute
        self.batch_size = batch_size
        self.processed_files = []
        
    def can_process(self) -> bool:
        """Check if we can process more files"""
        now = datetime.now()
        cutoff = now - timedelta(minutes=1)
        
        # Remove old entries
        self.processed_files = [ts for ts in self.processed_files if ts > cutoff]
        
        return len(self.processed_files) < self.max_files_per_minute
        
    def wait_if_needed(self):
        """Wait if we're processing too fast"""
        while not self.can_process():
            time.sleep(0.1)
            
    def record_processed(self):
        """Record a processed file"""
        self.processed_files.append(datetime.now())