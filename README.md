## Innova Digital Systems – Plataforma web + Panel de gestión

Landing page tipo SaaS construida con **React + Vite + TailwindCSS**, animaciones con **Framer Motion** y un **panel interno** para monitorear solicitudes de clientes. Lista para desplegar en **Cloudflare Pages** con **Functions** que se conectan a **Azure Cosmos DB**.

### Características

- Landing minimalista y responsiva con secciones: Hero, ¿qué hacemos?, Beneficios, Servicios, Testimonios y CTA.
- Navbar fijo, botones pill, gradientes y componentes animados con `framer-motion`.
- Panel `/admin` con tabla, métricas en tiempo real, filtros, vista detallada y acciones rápidas.
- Data layer desacoplada con `requestApi` (usa mocks en local y Cosmos DB en producción).
- Functions (Cloudflare Workers) para exponer una API REST `/api/requests` conectada a Cosmos DB (SQL API).

### Stack

- React 18 + Vite 5
- TailwindCSS 3 + PostCSS
- Framer Motion 11
- Lucide React Icons
- React Router DOM 6
- Azure Cosmos DB SDK v4 (en Functions)

### Scripts

- `npm install` – instala dependencias.
- `npm run dev` – levanta Vite (usa mock data por defecto).
- `npm run build` – genera la build de producción en `dist/`.
- `npm run preview` – sirve la build resultante.
- `npm run build:worker` – compila el Worker TypeScript a `/functions`.
- `npm run build:all` – genera Worker + frontend en una sola corrida.

Node 18+ recomendado. Si `npm install` marca **ENOSPC**, libera espacio y vuelve a ejecutar el comando.

---

## Variables de entorno separadas

### Frontend (`.env.frontend.local`)

```bash
VITE_API_BASE=/api
VITE_TENANT_ID=default
VITE_USE_MOCK=false
```

### Backend (`.env.backend.local`)

```bash
COSMOS_DB_ENDPOINT=https://<account>.documents.azure.com:443/
COSMOS_DB_KEY=<primary-key>
COSMOS_DB_DATABASE=innova-digital
COSMOS_DB_CONTAINER=requests
DEFAULT_TENANT=default
```

> Duplica los archivos `.env.frontend.example` y `.env.backend.example` para crear tus versiones locales.

Durante el desarrollo local no hay backend, así que `requestApi` intentará llamar a `/api/requests` y, si falla, hará fallback automático a `src/data/mockRequests.js`.

---

## API serverless en Cloudflare Pages

El archivo `functions/api/requests.js` expone:

| Método | Ruta            | Descripción                                     |
| ------ | --------------- | ----------------------------------------------- |
| GET    | `/api/requests` | Lista solicitudes por `tenantId`.               |
| POST   | `/api/requests` | Registra una nueva solicitud.                   |
| PATCH  | `/api/requests` | Actualiza campos (ej. `status`, `notes`, etc.). |

### Arquitectura MVC en Cloudflare Workers

- **Modelos** (`workers/src/types`) describen el shape de la data y `database/seed/requests.json` sirve como base inicial para Cosmos DB.
- **Repositorio** (`workers/src/repositories/RequestRepository.ts`) centraliza el acceso a Cosmos DB usando el SDK oficial.
- **Servicio** (`workers/src/services/RequestService.ts`) aplica negocio (validaciones, IDs, defaults por tenant).
- **Controlador** (`workers/src/controllers/RequestController.ts`) interpreta la petición HTTP y entrega respuestas JSON/CORS.
- **Entrada** (`workers/src/api/requests.ts`) construye todo y expone `onRequest`, que Cloudflare Pages compila hacia `functions/api/requests.js`.

Compila el backend TypeScript antes de desplegar:

```bash
npm run build:worker
# o
npm run build:all   # Worker + frontend
```

### Configuración de Cosmos DB

1. Crea una cuenta **Azure Cosmos DB (SQL API)** con un contenedor: `database = innova-digital`, `container = requests`, **partition key** `/tenantId` (alto cardinalidad recomendado: `tenantId`, `businessId`, etc.).
2. Provisiona RUs según carga (400 RU mínimos, escala automático si esperas picos).
3. Inserta documentos siguiendo el schema del mock (`id`, `tenantId`, `customerName`, ...).

### Variables para Cloudflare

El archivo `wrangler.toml` ya declara:

```toml
name = "innova-digital-systems"
pages_build_output_dir = "dist"
compatibility_flags = ["nodejs_compat"]

[vars]
COSMOS_DB_DATABASE = "innova-digital"
COSMOS_DB_CONTAINER = "requests"
```

Secretos requeridos:

```bash
wrangler secret put COSMOS_DB_ENDPOINT   # https://<account>.documents.azure.com:443/
wrangler secret put COSMOS_DB_KEY        # Primary key de la cuenta
wrangler secret put DEFAULT_TENANT       # Opcional, default = "default"
```

> **Tip**: Usa `nodejs_compat` para habilitar el SDK de Cosmos en Cloudflare Workers.

---

## Deploy en Cloudflare Pages

1. **Build local**
   ```bash
   npm run build:worker
   npm run build
   ```
2. **Conecta el repo** en Cloudflare Pages → “Create Project” → selecciona GitHub `mylanding`.
3. **Configuración de build**
   - Framework preset: _Vite_
   - Build command: `npm run build`
   - Output directory: `dist`
4. **Functions**: habilita “Pages Functions” para que `functions/api/requests.js` se despliegue como Worker.
5. **Variables**: añade `VITE_API_BASE=/api`, `VITE_TENANT_ID=default`, `VITE_USE_MOCK=false` y asigna los secretos definidos en `.env.backend.local`.
6. **Previews**: Cloudflare generará entornos previos en cada PR; puedes apuntar a un contenedor Cosmos distinto usando otro `VITE_TENANT_ID` para aislar datos.

---

## Pruebas rápidas del panel

```bash
npm run dev            # abre http://localhost:5173
# Navega a /admin para ver la tabla con datos mock
```

Para hacer pruebas de la API sin UI:

```bash
curl -X GET  http://localhost:8788/api/requests?tenantId=default
curl -X PATCH http://localhost:8788/api/requests \
	  -H "Content-Type: application/json" \
	  -d '{"id":"REQ-001","tenantId":"default","status":"completado"}'
```

_(En local puedes usar `wrangler pages dev` para probar Functions + front en el mismo puerto.)_

---

## Próximos pasos sugeridos

- Conectar el formulario “Solicitar demo” a la API `POST /api/requests` para generar registros reales.
- Añadir autenticación ligera para `/admin` (Cloudflare Access o Clerk) si compartirás el enlace públicamente.
- Usar Azure Monitor + Cosmos diagnostics para medir latencia y RUs usados.
- Programar backups/exportaciones desde Cosmos DB a Blob Storage si requieres historiales.
- Importar el dataset `database/seed/requests.json` para contar con registros iniciales en el contenedor `requests`.

---

## Referencias directas a la documentación de Cloudflare

- **Pages + Functions**: https://developers.cloudflare.com/pages/functions/ — describe cómo estructurar `/functions` y cómo se enrutan automáticamente (nuestro endpoint vive en `functions/api/requests.js`).
- **Variables de entorno y secretos**: https://developers.cloudflare.com/workers/configuration/environment-variables/ — explica la diferencia entre `[vars]` y `wrangler secret put`, exactamente lo que usamos para `COSMOS_DB_*`.
- **Comandos de Wrangler para Pages**: https://developers.cloudflare.com/workers/wrangler/commands/#pages — referencia para `wrangler pages dev` y `wrangler pages deploy`.
- **Workers + Bases de datos externas**: https://developers.cloudflare.com/workers/runtime-apis/nodejs/ — habilita `nodejs_compat`, requisito para usar el SDK oficial de Azure Cosmos DB dentro de un Worker.

Con estas guías oficiales puedes validar que la configuración del backend (Functions + Cosmos DB) cumple las mejores prácticas documentadas por Cloudflare.
