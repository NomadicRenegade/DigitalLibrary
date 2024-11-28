from typing import List, Dict, Any
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import math
from ..utils.rate_limiter import RateLimiter

class BatchProcessor:
    def __init__(self, max_workers: int = 4, batch_size: int = 1000, 
                 max_files_per_minute: int = 100):
        self.max_workers = max_workers
        self.batch_size = batch_size
        self.rate_limiter = RateLimiter(
            max_files_per_minute=max_files_per_minute,
            batch_size=batch_size
        )
        
    def process_files(self, files: List[Path], processor_func) -> List[Dict[str, Any]]:
        """Process files in batches using multiple threads with rate limiting"""
        results = []
        batches = self._create_batches(files)
        
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            futures = []
            for batch in batches:
                self.rate_limiter.wait_if_needed()
                futures.append(
                    executor.submit(self._process_batch, batch, processor_func)
                )
                
            for future in futures:
                results.extend(future.result())
                
        return results
        
    def _process_batch(self, batch: List[Path], processor_func) -> List[Dict[str, Any]]:
        """Process a single batch of files with rate limiting"""
        results = []
        for file in batch:
            try:
                self.rate_limiter.wait_if_needed()
                result = processor_func(file)
                if result:
                    results.append(result)
                    self.rate_limiter.record_processed()
            except Exception as e:
                print(f"Error processing {file}: {str(e)}")
        return results