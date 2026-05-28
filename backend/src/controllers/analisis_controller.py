from src.models.analisis_model import guardar_analisis, obtener_historial # Importa las funciones para guardar análisis y obtener el historial desde el modelo de análisis

# Función para realizar el análisis del texto y guardar los resultados en la base de datos
def analizar_texto(texto):
    conteos = [
        ("Caracteres totales",      len(texto)),
        ("Caracteres sin espacios", len(texto.replace(" ", "").replace("\n", ""))),
        ("Letras",                  sum(1 for c in texto if c.isalpha())),
        ("Numeros",                 sum(1 for c in texto if c.isdigit())),
        ("Palabras",                len(texto.split()) if texto.strip() else 0),
        ("Espacios",                texto.count(" ")),
        ("Lineas",                  texto.count("\n") + 1 if texto else 0),
    ]
    return {etiqueta: valor for etiqueta, valor in conteos} # Devuelve un diccionario con los resultados del análisis


# Controlador para manejar la solicitud de análisis de texto
def controller_analizar(data):
    # Validación básica del input para asegurar que se reciba un texto válido
    if not data or "texto" not in data:
        return {"ok": False, "error": "El body debe tener la clave 'texto'."}, 400

    texto = data["texto"]

    # Validación adicional para asegurar que el texto sea una cadena no vacía
    if not isinstance(texto, str):
        return {"ok": False, "error": "El valor de 'texto' debe ser una cadena."}, 400

    # Validación para asegurar que el texto no esté vacío o solo contenga espacios
    if not texto.strip():
        return {"ok": False, "error": "El texto está vacío."}, 422
    
    # Longitud mínima y máxima
    if len(texto.strip()) < 15:
        return {"ok": False, "error": "El texto debe tener al menos 15 caracteres."}, 422
    if len(texto) > 1000:
        return {"ok": False, "error": "El texto no puede superar los 1000 caracteres."}, 422

    # Caracteres permitidos (letras, números, espacios y puntuación básica)
    if not re.match(r'^[\w\s\.,;:!?áéíóúÁÉÍÓÚüÜñÑ\-\(\)\"\'\n]+$', texto):
        return {"ok": False, "error": "El texto contiene caracteres no permitidos."}, 422
    
    # Validación para detectar patrones maliciosos comunes (HTML, SQL, JavaScript)
    patrones_maliciosos = [
        r'<[^>]*>',                        # HTML tags
        r'(SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE)\s', # SQL
        r'(script|javascript|onerror|onload|eval|alert)\s*[\(:]', # JS
        r'(--|\bOR\b|\bAND\b)\s+\d+=\d+', # SQL injection
    ]
    
    for patron in patrones_maliciosos:
        if re.search(patron, texto, re.IGNORECASE):
            return {"ok": False, "error": "El texto contiene contenido no permitido."}, 422


    resultados = analizar_texto(texto) # Realiza el análisis del texto utilizando la función definida anteriormente
    id_guardado = guardar_analisis(texto, resultados) # Guarda el análisis en la base de datos y obtiene el ID del documento insertado

    return {"ok": True, "id": id_guardado, "resultados": resultados}, 201 # Devuelve una respuesta con el ID del análisis guardado y los resultados del análisis


# Controlador para manejar la solicitud de obtener el historial de análisis
def controller_historial():
    historial = obtener_historial() # Obtiene el historial de análisis desde la base de datos utilizando la función definida en el modelo
    return {"ok": True, "total": len(historial), "historial": historial}, 200 # Devuelve una respuesta con el historial de análisis y el total de registros encontrados
