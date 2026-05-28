from flask import Blueprint, request, jsonify # Importa las funciones necesarias de Flask para crear rutas, manejar solicitudes y enviar respuestas JSON
from src.controllers.analisis_controller import controller_analizar, controller_historial # Importa los controladores para manejar las solicitudes de análisis de texto y obtener el historial de análisis desde el controlador de análisis

# Crea un Blueprint para las rutas relacionadas con el análisis de texto, lo que permite organizar mejor el código y facilitar la modularidad
analisis_bp = Blueprint("analisis", __name__) 

# Define la ruta para analizar el texto, que acepta solicitudes POST para realizar el análisis y OPTIONS para manejar las preflight requests de CORS
@analisis_bp.route("/analisis", methods=["POST", "OPTIONS"])
# Controlador para manejar la solicitud de análisis de texto, que valida el input, realiza el análisis utilizando la función definida en el controlador y guarda los resultados en la base de datos
def analizar():
    if request.method == "OPTIONS":  
        return jsonify({}), 200
    
    data = request.get_json(silent=True)
    respuesta, status = controller_analizar(data)
    return jsonify(respuesta), status

# Define la ruta para obtener el historial de análisis, que acepta solicitudes GET para recuperar el historial de análisis almacenado en la base de datos
@analisis_bp.route("/analisis/historial", methods=["GET"])
def historial():
    respuesta, status = controller_historial()
    return jsonify(respuesta), status