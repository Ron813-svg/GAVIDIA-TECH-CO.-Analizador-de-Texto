from src.models.analisis_model import guardar_analisis, obtener_historial


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
    return {etiqueta: valor for etiqueta, valor in conteos}


def controller_analizar(data):
    if not data or "texto" not in data:
        return {"ok": False, "error": "El body debe tener la clave 'texto'."}, 400

    texto = data["texto"]

    if not isinstance(texto, str):
        return {"ok": False, "error": "El valor de 'texto' debe ser una cadena."}, 400

    if not texto.strip():
        return {"ok": False, "error": "El texto está vacío."}, 422

    resultados = analizar_texto(texto)
    id_guardado = guardar_analisis(texto, resultados)

    return {"ok": True, "id": id_guardado, "resultados": resultados}, 201


def controller_historial():
    historial = obtener_historial()
    return {"ok": True, "total": len(historial), "historial": historial}, 200
