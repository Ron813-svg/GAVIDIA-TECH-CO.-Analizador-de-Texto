from flask import Blueprint, request, jsonify
from src.controllers.analisis_controller import controller_analizar, controller_historial

analisis_bp = Blueprint("analisis", __name__)

@analisis_bp.route("/analisis", methods=["POST", "OPTIONS"])
def analizar():
    if request.method == "OPTIONS":  
        return jsonify({}), 200
    
    data = request.get_json(silent=True)
    respuesta, status = controller_analizar(data)
    return jsonify(respuesta), status

@analisis_bp.route("/analisis/historial", methods=["GET"])
def historial():
    respuesta, status = controller_historial()
    return jsonify(respuesta), status