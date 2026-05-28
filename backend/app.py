# app.py - Archivo principal de la aplicación Flask que configura y ejecuta el servidor backend para el analizador de texto
from flask import Flask
from flask_cors import CORS
from src.config import Config
from src.models.db import init_db
from src.routes.analisis_routes import analisis_bp

# Configura la aplicación Flask, habilita CORS para permitir solicitudes desde el frontend, inicializa la base de datos y registra las rutas del análisis de texto
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configura CORS para permitir solicitudes desde el dominio del frontend, especificando los métodos permitidos, 
# los encabezados permitidos y deshabilitando el soporte para credenciales
CORS(app, resources={
    r"/*": {
        "origins": "https://gavidia-tech-co-analizador-de-texto.vercel.app",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": False
    }
})

# Carga la configuración de la aplicación desde el objeto Config, que incluye parámetros como el puerto y el modo de depuración, e 
# inicializa la base de datos y registra las rutas del análisis de texto
app.config.from_object(Config)
init_db(app)
app.register_blueprint(analisis_bp)

# Ejecuta la aplicación si el script es ejecutado directamente
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)