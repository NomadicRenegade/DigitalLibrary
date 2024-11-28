from typing import Set, Dict, Any
from pathlib import Path
import json
import time

class IncrementalCrawler:
    def __init__(self, base_path: str, state_file: str = 'crawler_state.json'):
        self.base_path = Path(base_path)
        self.state_file = state_file
        self.last_scan = self._load_state()
        
    def _load_state(self) -> Dict[str, Any]:
        try:
            with open(self.state_file, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            return {'last_scan_time': 0, 'processed_files': {}}
            
    def _save_state(self):
        with open(self.state_file, 'w') as f:
            json.dump(self.last_scan, f)
            
    def get_changes(self) -> Dict[str, Set[Path]]:
        current_time = time.time()
        changes = {
            'new': set(),
            'modified': set(),
            'deleted': set()
        }
        
        # Track current files
        current_files = {}
        
        # Scan for new and modified files
        for path in self.base_path.rglob('*'):
            if path.is_file():
                mtime = path.stat().st_mtime
                current_files[str(path)] = mtime
                
                if str(path) not in self.last_scan['processed_files']:
                    changes['new'].add(path)
                elif mtime > self.last_scan['processed_files'][str(path)]:
                    changes['modified'].add(path)
                    
        # Check for deleted files
        for old_path in self.last_scan['processed_files']:
            if old_path not in current_files:
                changes['deleted'].add(Path(old_path))
                
        # Update state
        self.last_scan['last_scan_time'] = current_time
        self.last_scan['processed_files'] = current_files
        self._save_state()
        
        return changes