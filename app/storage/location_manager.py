from abc import ABC, abstractmethod
from pathlib import Path
import boto3
import paramiko
from typing import BinaryIO, Generator

class StorageLocation(ABC):
    @abstractmethod
    def list_files(self) -> Generator[str, None, None]:
        pass
        
    @abstractmethod
    def read_file(self, path: str) -> BinaryIO:
        pass
        
    @abstractmethod
    def write_file(self, path: str, data: BinaryIO) -> bool:
        pass

class LocalStorage(StorageLocation):
    def __init__(self, base_path: str):
        self.base_path = Path(base_path)
        
    def list_files(self) -> Generator[str, None, None]:
        for path in self.base_path.rglob('*'):
            if path.is_file():
                yield str(path.relative_to(self.base_path))
                
    def read_file(self, path: str) -> BinaryIO:
        return open(self.base_path / path, 'rb')
        
    def write_file(self, path: str, data: BinaryIO) -> bool:
        try:
            with open(self.base_path / path, 'wb') as f:
                f.write(data.read())
            return True
        except Exception:
            return False

class S3Storage(StorageLocation):
    def __init__(self, bucket: str, prefix: str = ''):
        self.s3 = boto3.client('s3')
        self.bucket = bucket
        self.prefix = prefix
        
    def list_files(self) -> Generator[str, None, None]:
        paginator = self.s3.get_paginator('list_objects_v2')
        for page in paginator.paginate(Bucket=self.bucket, Prefix=self.prefix):
            for obj in page.get('Contents', []):
                yield obj['Key']
                
    def read_file(self, path: str) -> BinaryIO:
        response = self.s3.get_object(Bucket=self.bucket, Key=path)
        return response['Body']
        
    def write_file(self, path: str, data: BinaryIO) -> bool:
        try:
            self.s3.upload_fileobj(data, self.bucket, path)
            return True
        except Exception:
            return False

class SFTPStorage(StorageLocation):
    def __init__(self, hostname: str, username: str, password: str = None, 
                 key_filename: str = None):
        self.ssh = paramiko.SSHClient()
        self.ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
        self.ssh.connect(
            hostname=hostname,
            username=username,
            password=password,
            key_filename=key_filename
        )
        self.sftp = self.ssh.open_sftp()
        
    def list_files(self) -> Generator[str, None, None]:
        def walk(remotepath):
            for entry in self.sftp.listdir_attr(remotepath):
                entrypath = str(Path(remotepath) / entry.filename)
                if S_ISDIR(entry.st_mode):
                    yield from walk(entrypath)
                else:
                    yield entrypath
                    
        yield from walk('.')
        
    def read_file(self, path: str) -> BinaryIO:
        return self.sftp.open(path, 'rb')
        
    def write_file(self, path: str, data: BinaryIO) -> bool:
        try:
            with self.sftp.open(path, 'wb') as f:
                f.write(data.read())
            return True
        except Exception:
            return False