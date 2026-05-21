from datetime import datetime, timezone
from src.models.db import mongo


def guardar_analisis(texto, resultados):
    documento = {
        "texto":      texto,
        "resultados": resultados,
        "fecha":      datetime.now(timezone.utc),
    }
    resultado = mongo.db.analisis.insert_one(documento)
    return str(resultado.inserted_id)


def obtener_historial():
    documentos = mongo.db.analisis.find(
        {}, {"_id": 0, "texto": 1, "resultados": 1, "fecha": 1}
    ).sort("fecha", -1)

    historial = []
    for doc in documentos:
        if isinstance(doc.get("fecha"), datetime):
            doc["fecha"] = doc["fecha"].isoformat()
        historial.append(doc)

    return historial