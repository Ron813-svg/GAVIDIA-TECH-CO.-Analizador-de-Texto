from datetime import datetime, timezone # Importa las clases necesarias para manejar fechas y zonas horarias
from src.models.db import mongo # Importa la instancia de MongoDB desde el módulo de base de datos

# Función para guardar un análisis en la base de datos
def guardar_analisis(texto, resultados):   # Recibe el texto analizado y los resultados del análisis
    # Crea un documento con el texto, los resultados y la fecha actual en formato UTC
    documento = {
        "texto":      texto,
        "resultados": resultados,
        "fecha":      datetime.now(timezone.utc),
    }
    resultado = mongo.db.analisis.insert_one(documento) # Inserta el documento en la colección "analisis" de MongoDB
    return str(resultado.inserted_id) # Devuelve el ID del documento insertado como una cadena

# Función para obtener el historial de análisis desde la base de datos
def obtener_historial():
    # Consulta los documentos de la colección "analisis", excluyendo el campo "_id" y ordenándolos por fecha en orden descendente
    documentos = mongo.db.analisis.find(
        {}, {"_id": 0, "texto": 1, "resultados": 1, "fecha": 1}
    ).sort("fecha", -1)

    # Convierte los documentos a una lista y formatea la fecha a ISO 8601 para que sea fácilmente manejable en el frontend
    historial = [] # Lista para almacenar los análisis formateados
    for doc in documentos:
        if isinstance(doc.get("fecha"), datetime):
            doc["fecha"] = doc["fecha"].isoformat()
        historial.append(doc)
        
    # Devuelve la lista de análisis formateados
    return historial