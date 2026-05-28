# Gavidia Tech CO — Analizador de Texto

Aplicación web fullstack que permite analizar texto de forma rápida y sencilla, devolviendo estadísticas básicas como cantidad de palabras, letras, números, espacios y líneas. Cada análisis queda registrado en una base de datos y puede consultarse desde el historial integrado en la misma interfaz.

---

## Descripción del proyecto

El **Analizador de Texto de Gavidia Tech CO** resuelve la necesidad de obtener métricas inmediatas sobre cualquier fragmento de texto sin instalar software adicional. El usuario pega o escribe su texto en el navegador, presiona un botón y obtiene al instante:

| Métrica | Descripción |
|---|---|
| Palabras | Total de palabras separadas por espacios |
| Letras | Caracteres alfabéticos (sin dígitos ni símbolos) |
| Números | Dígitos numéricos presentes en el texto |
| Espacios | Cantidad de espacios en blanco |
| Líneas | Número de líneas del texto |

El historial de todos los análisis realizados se persiste en **MongoDB** y puede consultarse en cualquier momento desde la misma página.

### Stack tecnológico

**Frontend**
- React 19 + Vite 8
- React Hook Form — manejo del formulario
- React Hot Toast — notificaciones

**Backend**
- Python 3.11 + Flask
- Flask-PyMongo — integración con MongoDB
- Flask-CORS — control de orígenes cruzados

**Base de datos**
- MongoDB (Atlas o instancia local)

---

## Guía de instalación

### Requisitos previos

- Node.js ≥ 20 y pnpm (o npm)
- Python 3.11
- Una instancia de MongoDB (local o en MongoDB Atlas)

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd <nombre-del-repositorio>
```

### 2. Configurar el backend

```bash
cd backend

# Crear y activar el entorno virtual
python -m venv venv
source venv/bin/activate        # Linux / macOS
venv\Scripts\activate           # Windows

# Instalar dependencias
pip install -r requirements.txt
```

Crear el archivo de variables de entorno:

```bash
# backend/.env
MONGO_URI=mongodb://localhost:27017/analizador   # o tu URI de Atlas
PORT=5000
DEBUG=true
```

### 3. Configurar el frontend

```bash
cd ../frontend

# Instalar dependencias
pnpm install       # o: npm install
```

Crear el archivo de variables de entorno (opcional, solo si el backend corre en un puerto distinto):

```bash
# frontend/.env
VITE_API_URL=http://localhost:5000
```

> Si no se define `VITE_API_URL`, el frontend apunta automáticamente a `http://localhost:5000` en desarrollo y a la URL de producción en Render en producción.

---

## Instrucciones de uso

### Ejecutar en desarrollo

**Terminal 1 — Backend**

```bash
cd backend
source venv/bin/activate        # Linux / macOS
python app.py
```

El servidor quedará escuchando en `http://localhost:5000`.

**Terminal 2 — Frontend**

```bash
cd frontend
pnpm dev       # o: npm run dev
```

La aplicación abrirá en `http://localhost:5173`.

---

### Flujo básico de uso

1. Abre el navegador en `http://localhost:5173`.
2. Escribe o pega el texto que deseas analizar en el área de texto.
3. Presiona **"Analizar texto"**.
4. Los resultados aparecen debajo del formulario con las métricas calculadas.
5. Para ver análisis anteriores, consulta la sección **Historial de análisis** o presiona **↻ Actualizar**.
6. Haz clic en cualquier item del historial para ver el detalle completo en un modal.

---

### Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| `POST` | `/analisis` | Analiza el texto enviado en el body |
| `GET` | `/analisis/historial` | Devuelve todos los análisis guardados |

**Ejemplo — analizar texto:**

```bash
curl -X POST http://localhost:5000/analisis \
  -H "Content-Type: application/json" \
  -d '{"texto": "Hola mundo, este es un texto de prueba."}'
```

Respuesta:

```json
{
  "ok": true,
  "id": "664f3a...",
  "resultados": {
    "Caracteres totales": 40,
    "Caracteres sin espacios": 34,
    "Letras": 31,
    "Numeros": 0,
    "Palabras": 8,
    "Espacios": 6,
    "Lineas": 1
  }
}
```

**Ejemplo — obtener historial:**

```bash
curl http://localhost:5000/analisis/historial
```

---

### Construir para producción

```bash
cd frontend
pnpm build      # genera la carpeta dist/
```

El backend puede desplegarse en cualquier plataforma compatible con Python (Render, Railway, Fly.io, etc.) asegurándose de definir las variables de entorno `MONGO_URI` y `PORT` en el panel del servicio.

---

## Validaciones del texto

El backend rechaza textos que no cumplan las siguientes reglas:

- Longitud mínima de **15 caracteres**.
- Longitud máxima de **1 000 caracteres**.
- Solo se permiten letras, números, espacios y puntuación básica (`. , ; : ! ? - ( ) " '`).
- No se permiten etiquetas HTML, sentencias SQL ni código JavaScript.

---

## Estructura del proyecto

```
├── backend/
│   ├── app.py                        # Punto de entrada Flask
│   ├── requirements.txt
│   └── src/
│       ├── config.py                 # Variables de entorno
│       ├── controllers/
│       │   └── analisis_controller.py
│       ├── models/
│       │   ├── db.py                 # Conexión MongoDB
│       │   └── analisis_model.py
│       └── routes/
│           └── analisis_routes.py
└── frontend/
    ├── index.html
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── config.js                 # URL de la API
        ├── pages/
        │   └── mainPage.jsx          # Página principal
        ├── hooks/
        │   ├── useFetchAnalisis.jsx
        │   └── useFetchHistorial.jsx
        └── components/
            ├── modal.jsx             # Modal de detalle
            └── LoadingScreen/
```
