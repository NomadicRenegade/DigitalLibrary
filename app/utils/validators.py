ALLOWED_EXTENSIONS = {
    'image': {'png', 'jpg', 'jpeg', 'gif'},
    'audio': {'mp3', 'wav', 'ogg'},
    'video': {'mp4', 'avi', 'mov'}
}

def allowed_file(filename: str) -> bool:
    extension = filename.rsplit('.', 1)[1].lower()
    return any(extension in extensions for extensions in ALLOWED_EXTENSIONS.values())