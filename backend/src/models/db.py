from flask_pymongo import PyMongo # Importa la clase PyMongo para manejar la conexión con MongoDB

# Crea una instancia de PyMongo que se utilizará para interactuar con la base de datos MongoDB
mongo = PyMongo()

# Función para inicializar la conexión a la base de datos con la aplicación Flask
def init_db(app):
    mongo.init_app(app)
