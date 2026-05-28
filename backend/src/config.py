import os # Importa el módulo os para manejar variables de entorno
from dotenv import load_dotenv # Importa la función load_dotenv para cargar las variables de entorno desde un archivo .env

load_dotenv() # Carga las variables de entorno desde el archivo .env ubicado en la raíz del proyecto

# Clase de configuración para la aplicación Flask, que obtiene los valores de las variables de entorno
class Config:
    MONGO_URI = os.environ.get("MONGO_URI")
    PORT      = int(os.environ.get("PORT", 5000))
    DEBUG     = os.environ.get("DEBUG", "false").lower() == "true"