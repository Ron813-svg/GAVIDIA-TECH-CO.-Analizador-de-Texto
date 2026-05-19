import os
from dotenv import load_dotenv

load_dotenv()


class Config:
    MONGO_URI = os.environ.get("MONGO_URI")
    PORT      = int(os.environ.get("PORT", 5000))
    DEBUG     = os.environ.get("DEBUG", "false").lower() == "true"