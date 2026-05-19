from flask import Flask
from flask_cors import CORS
from src.config import Config
from src.models.db import init_db
from src.routes.analisis_routes import analisis_bp

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173/"}})

app.config.from_object(Config)

init_db(app)
app.register_blueprint(analisis_bp)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=Config.PORT, debug=Config.DEBUG)