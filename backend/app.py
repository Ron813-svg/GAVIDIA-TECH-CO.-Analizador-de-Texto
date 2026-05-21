from flask import Flask
from flask_cors import CORS
from src.config import Config
from src.models.db import init_db
from src.routes.analisis_routes import analisis_bp

app = Flask(__name__)
app.url_map.strict_slashes = False

CORS(app, resources={
    r"/*": {
        "origins": "https://gavidia-tech-co-analizador-de-texto.vercel.app",
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": False
    }
})

app.config.from_object(Config)
init_db(app)
app.register_blueprint(analisis_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)