from dataclasses import dataclass
from datetime import datetime
import prometheus_client as prom
import threading

@dataclass
class FileMetrics:
    files_processed = prom.Counter('files_processed_total', 'Total files processed')
    processing_errors = prom.Counter('processing_errors_total', 'Total processing errors')
    processing_duration = prom.Histogram('processing_duration_seconds', 'Time spent processing files')
    queue_size = prom.Gauge('processing_queue_size', 'Current size of processing queue')
    storage_usage = prom.Gauge('storage_usage_bytes', 'Current storage usage in bytes')

class MetricsCollector:
    _instance = None
    _lock = threading.Lock()
    
    def __new__(cls):
        if cls._instance is None:
            with cls._lock:
                if cls._instance is None:
                    cls._instance = super().__new__(cls)
                    cls._instance.metrics = FileMetrics()
        return cls._instance
    
    def record_processed_file(self, duration: float):
        self.metrics.files_processed.inc()
        self.metrics.processing_duration.observe(duration)
    
    def record_error(self):
        self.metrics.processing_errors.inc()
    
    def update_queue_size(self, size: int):
        self.metrics.queue_size.set(size)
    
    def update_storage_usage(self, bytes_used: int):
        self.metrics.storage_usage.set(bytes_used)