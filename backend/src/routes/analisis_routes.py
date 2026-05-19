from flask import Blueprint, request, jsonify
from src.controllers.analisis_controller import controller_analizar, controller_historial

analisis_bp = Blueprint("analisis", __name__, url_prefix="/analisis")


@analisis_bp.route("/", methods=["POST"])
def analizar():
    data = request.get_json(silent=True)
    respuesta, status = controller_analizar(data)
    return jsonify(respuesta), status


@analisis_bp.route("/historial", methods=["GET"])
def historial():
    respuesta, status = controller_historial()
    return jsonify(respuesta), status
