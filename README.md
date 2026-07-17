# Coralytics

Coralytics is a React + Three.js web app with a Python/FastAPI analysis backend. Social export files are extracted, stored as raw data in **DB1**, analyzed by NLP into **DB2**, and visualized as a personalized 3D coral.

**Firebase project:** `coralytics-c8767` (see `.firebaserc`)

## Architecture

```
┌─────────────────┐     /api proxy      ┌──────────────────┐     Admin SDK    ┌──────────────────────────────┐
│  frontend/      │ ──────────────────► │  backend/        │ ─────────────► │  Firestore                   │
│  React + Vite   │   localhost:8000    │  FastAPI         │                │  DB1: raw_uploads/           │
│  Three.js coral │                     │  ingest + NLP    │                │  DB2: analyses/              │
└─────────────────┘                     └──────────────────┘                └──────────────────────────────┘
```

| Layer | Stack | Dev command |
|---|---|---|
| Frontend | React 19, Vite, React Router, Three.js | `cd frontend && npm run dev` |
| Backend | Python 3, FastAPI, firebase-admin | `cd backend && uvicorn app.main:app --reload` |
| Data | Firestore (+ local emulator) | `npm run firebase:emulators` (repo root) |
| Tooling | Firebase CLI (repo root `package.json`) | `npm install` at repo root |

The backend is **Python** — there is no `npm run dev` in `backend/`. Use a Python virtual environment (`.venv`) and `uvicorn`.

## Structure

| Path | Purpose |
|---|---|
| `frontend/` | Vite React app — dashboard, upload flow, 3D coral visualiser |
| `frontend/src/pages/` | Routes: Landing, Coral, Insights, Share, Settings |
| `frontend/src/api/` | Typed API client (`fetch` → FastAPI) |
| `frontend/src/three/` | Procedural organism generators (`coralV1`–`v3`) |
| `backend/` | FastAPI service — ingestion, Firestore persistence, analysis stubs |
| `backend/app/ingestion/` | Export parsers (Instagram, LinkedIn, Reddit, generic) |
| `backend/app/ingestion/sample_data/` | Bundled demo exports used by the seed script |
| `test/` | Postman collection, fixtures, data-model diagram |
| `firebase.json` | Firestore, Hosting, and emulator configuration |
| `firestore.rules` | User-scoped security rules (enforced when Firebase Auth is wired up) |
| `.env` | Shared config for frontend (`VITE_*`) and backend (repo root) |

## Data storage

Uploads follow a two-layer storage model inside one Firestore database:

| Layer | Firestore path | Purpose |
|---|---|---|
| **DB1 — raw exports** | `users/{userId}/raw_uploads/{uploadId}/files/{fileId}` | Extracted `.json`/`.csv` export files stored as-is after zip ingestion |
| **DB1 metadata** | `users/{userId}/raw_uploads/{uploadId}` | Upload filename, platform, ingest report, raw file count |
| **DB2 — analysis** | `users/{userId}/analyses/{analysisId}` | Sentiment, topics, organism data, and per-post `post_insights` |

Pipeline: upload → extract zip → save raw files to **DB1** → NLP reads DB1 → results saved to **DB2** → dashboard coral reads **DB2**.

The original zip is not stored; only extracted parseable export files are persisted in DB1.

Schema diagram: [`test/coralytics_data_model.mmd`](test/coralytics_data_model.mmd)

The FastAPI backend writes via the **Firebase Admin SDK** and bypasses client security rules. Rules apply when the frontend talks to Firestore directly with Auth.

## Prerequisites

| Tool | Version | Used for |
|---|---|---|
| **Node.js** | 18+ | Frontend, Firebase CLI, repo scripts |
| **Python** | 3.10+ | Backend API (`py -3` on Windows) |
| **JDK** | **21+** | Firebase emulators (Java 8 will not work) |

Check versions:

```bash
node -v
py -3 --version      # Windows
python3 --version    # macOS / Linux
java -version        # must be 21+
```

## Quick start (local)

You need **three long-running terminals**: Firestore emulator, backend API, and frontend dev server. Run the seed command once in a fourth terminal only when you need sample data.

### 0. One-time setup

```bash
cp .env.example .env
npm install                    # repo root — Firebase CLI
cd frontend && npm install     # frontend deps
cd ../backend
py -3 -m venv .venv            # Windows (use python3 on macOS/Linux)
.venv\Scripts\activate         # Windows: .venv\Scripts\activate
# source .venv/bin/activate    # macOS / Linux
pip install -r requirements.txt
```

The backend and frontend both read the repo-root `.env` file:

```env
FIREBASE_PROJECT_ID=coralytics-c8767
FIRESTORE_EMULATOR_HOST=localhost:8080
CORS_ORIGINS=http://localhost:5173
```

`FIREBASE_PROJECT_ID` should match `.firebaserc`. `FIRESTORE_EMULATOR_HOST` tells the backend to write to your local Firestore emulator instead of cloud Firestore.

### Terminal 1 — Firebase emulators (repo root)

```bash
npm run firebase:emulators
```

- Emulator UI: http://localhost:4000
- Firestore listens on `localhost:8080`
- Auth listens on `localhost:9099` (required for sign up / sign in)
- Local data is stored in the emulator, not Google Cloud. If the emulator is reset, run the seed command again.

> **Requires JDK 21+.** If you see `firebase-tools no longer supports Java version before 21`, install a newer JDK from [Adoptium](https://adoptium.net/) and verify with `java -version`.

### Terminal 2 — backend API

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

- API: http://localhost:8000
- Health check: http://localhost:8000/health → `{"status":"ok","use_emulators":true,...}`

### Terminal 3 — seed demo data (once per fresh emulator)

```bash
npm run seed
```

Loads all files in `backend/app/ingestion/sample_data/`, saves normalized posts to Firestore, runs the analysis pipeline, and creates persisted coral data for `demo-user`.

View in Emulator UI: http://localhost:4000 → `users` → `demo-user`

### Terminal 4 — frontend

```bash
cd frontend
npm run dev
```

- App: http://localhost:5173
- API calls go to `/api/*` → Vite proxies to `http://localhost:8000`

A service account key is **not** required for emulator-only work.

### Local run order

1. Start Firestore emulator: `npm run firebase:emulators`
2. Start backend: `cd backend && uvicorn app.main:app --reload`
3. Start frontend: `cd frontend && npm run dev`
4. Seed once if needed: `npm run seed`
5. Open http://localhost:5173

## Frontend

The React app reads from the shared `.env` at the repo root (`VITE_*` variables). Vite is configured with `envDir` pointing at the repo root and proxies `/api` to the backend during development.

### Routes

| Route | Page |
|---|---|
| `/` | Redirects to `/coral` (signed in) or `/about` (signed out) |
| `/about` | Product overview for guests; how-it-works guide for signed-in users (via profile menu) |
| `/login` | Sign in / sign up (Firebase Auth) |
| `/coral` | My Coral — 3D coral, metrics, import modal, branch click, PNG export |
| `/insights` | Topics, sentiment, red flags, branding, platform comparison, evolution |
| `/share` | Recruiter share link, JSON export, compare analyses |
| `/settings` | Privacy controls (also via profile menu) |
| `/view/:token` | Public recruiter read-only coral preview |

Legacy redirects: `/upload` → `/coral?import=1`, `/dashboard` → `/coral`.

### API integration

The frontend calls the FastAPI backend with Firebase ID tokens (`Authorization: Bearer`):

| Frontend feature | API endpoint |
|---|---|
| Export history sidebar | `GET /uploads/{user_id}` |
| Coral metrics + 3D view | `GET /analyses/{user_id}` |
| File upload | `POST /uploads` (multipart) |
| Analyze / re-analyze | `POST /analyze` |
| Posts by topic (branch click) | `GET /uploads/{user_id}/posts/by-topic` |
| Privacy settings | `GET/PUT /users/{user_id}/privacy-settings` |
| Share link | `POST /shares` |
| Recruiter view | `GET /shares/{token}` (public) |

Sign up via `/login` (Auth emulator on `localhost:9099` in local dev). All protected routes use your Firebase `uid`.

### Scripts

```bash
cd frontend
npm run dev       # dev server on :5173
npm run build     # production build → frontend/dist
npm run preview   # preview production build
```

## Backend API

### Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check; reports `use_emulators` and project ID |
| `POST` | `/seed/sample-data` | Ingest all bundled sample exports + stub analysis |
| `POST` | `/uploads` | Ingest a `.zip`/`.json`/`.csv` export and save normalized posts |
| `POST` | `/uploads/fixture` | Ingest one sample file from disk (**emulator only**) |
| `GET` | `/uploads/{user_id}` | List upload metadata for a user |
| `GET` | `/uploads/{user_id}/{upload_id}` | Get a single upload record |
| `GET` | `/uploads/{user_id}/{upload_id}/posts` | List parsed posts (paginated: `limit`, `cursor`) |
| `POST` | `/analyze` | Run analysis and optionally persist to Firestore |
| `GET` | `/analyses/{user_id}` | List analyses for a user |
| `GET` | `/analyses/{user_id}/{analysis_id}` | Get a single analysis |
| `GET` | `/uploads/{user_id}/posts/by-topic` | List posts tagged with a topic |
| `GET` | `/users/{user_id}/privacy-settings` | Get privacy settings |
| `PUT` | `/users/{user_id}/privacy-settings` | Update privacy settings |
| `POST` | `/shares` | Create recruiter share link (auth required) |
| `GET` | `/shares/{token}` | Public read-only share payload |

`POST /analyze` accepts either `posts` in the request body or `upload_ids` to load parsed posts from Firestore. All endpoints except `/health` and `GET /shares/{token}` require a Firebase ID token.

### Ingestion

Uploads flow through `backend/app/ingestion/` — auto-detects Instagram, LinkedIn, Reddit, and generic JSON/CSV inside a zip or single file. Demo source files live in `backend/app/ingestion/sample_data/` (8 files across platforms).

Sanity-check parsers without the API:

```bash
cd backend && python -m app.ingestion.demo
```

### Seed demo data

| Target | Command | View data |
|---|---|---|
| Local emulator | `npm run seed` | http://localhost:4000 |
| Cloud Firestore | `npm run seed:cloud` | [Firebase Console](https://console.firebase.google.com/project/coralytics-c8767/firestore) |

Both accept an optional user id:

```bash
cd backend && python -m app.seed --user-id demo-user
cd backend && python -m app.seed --cloud --user-id demo-user
```

`seed:cloud` ignores `FIRESTORE_EMULATOR_HOST` for that run, so you can keep the emulator line in `.env` for day-to-day local work.

### npm scripts (repo root)

| Script | Description |
|---|---|
| `npm run firebase:emulators` | Start Firestore + Auth emulators |
| `npm run firebase:emulators:all` | Start Firestore + Hosting + Auth emulators |
| `npm run firebase:deploy:rules` | Deploy `firestore.rules` to cloud |
| `npm run firebase:deploy:hosting` | Deploy frontend build to Firebase Hosting |
| `npm run seed` | Seed local emulator with sample data |
| `npm run seed:cloud` | Seed cloud Firestore with sample data |

## Environment variables

Copy `.env.example` → `.env` at the **repo root**.

| Variable | Required | Description |
|---|---|---|
| `FIREBASE_PROJECT_ID` | Yes | Firebase project ID (`coralytics-c8767`) |
| `FIRESTORE_EMULATOR_HOST` | Local only | e.g. `localhost:8080` — routes writes to the emulator |
| `GOOGLE_APPLICATION_CREDENTIALS` | Cloud only | Path to service account JSON; **relative paths resolve from repo root** |
| `CORS_ORIGINS` | Optional | Comma-separated allowed origins (default: `http://localhost:5173`) |
| `VITE_API_URL` | Frontend | API base URL; use `/api` with Vite dev proxy (default) |
| `VITE_FIREBASE_API_KEY` | Frontend | Firebase web API key (`demo-api-key` works with Auth emulator) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Frontend | Auth domain (`localhost` for emulator) |
| `VITE_FIREBASE_PROJECT_ID` | Frontend | Must match `FIREBASE_PROJECT_ID` |
| `VITE_USE_AUTH_EMULATOR` | Frontend | `true` to connect Auth SDK to `localhost:9099` |
| `FIREBASE_AUTH_EMULATOR_HOST` | Backend | e.g. `localhost:9099` for token verification against emulator |
| `AUTH_DISABLED` | Backend | Set to `1` to skip token checks (local scripting only) |
| `SEED_ENDPOINT_ENABLED` | Optional | Set to `1` to allow `POST /seed/sample-data` against cloud |
| `MAX_UPLOAD_SIZE_BYTES` | Optional | Max upload size in bytes (default: 25 MB) |

**Never commit** `service-account.json` or `.env` — both are gitignored.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `ECONNREFUSED` on `/api/...` in Vite logs | Backend not running | Start uvicorn in `backend/` (see Terminal 2) |
| `Internal Server Error` on uploads sidebar | Emulator down or backend can't reach Firestore | Start `npm run firebase:emulators`; restart uvicorn |
| `firebase-tools no longer supports Java version before 21` | Old Java installed | Install JDK 21+; verify `java -version` |
| `uvicorn` not recognized | No venv or deps not installed | Create `.venv`, activate, `pip install -r requirements.txt` |
| `npm run dev` fails in `backend/` | Backend is Python, not Node | Use `uvicorn app.main:app --reload` instead |
| Empty coral / sample preview | Backend stub returns empty `organism_data.topics` | Expected until NLP is integrated; upload + analyze still works |
| Sidebar shows no uploads | Emulator was reset | Re-run `npm run seed` |

**Verify the stack:**

1. http://localhost:8000/health → `status: ok`
2. http://localhost:8000/uploads/demo-user → `uploads: [...]` (after seed)
3. http://localhost:5173/api/health → same as step 1 (proxy working)

Import `test/Coralytics.postman_collection.json` and run folder **03 - Frontend flow** to test the same endpoints the React app uses.

## Firebase setup

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
npx firebase login
```

If deploy fails with **401**, re-authenticate:

```bash
npx firebase login --reauth
```

### 2. Create / configure a Firebase project

1. [Firebase Console](https://console.firebase.google.com/) → create or open the project.
2. Enable **Firestore** (Create database).
3. Set project ID in `.firebaserc` and `FIREBASE_PROJECT_ID` in `.env`.

### 3. Local development (emulators)

Requires **JDK 21+** (see Prerequisites).

```bash
npm run firebase:emulators
```

Ensure `.env` includes `FIRESTORE_EMULATOR_HOST=localhost:8080`. No service account needed.

### 4. Cloud Firestore

One-time setup to share demo data with teammates via the Firebase Console:

1. **Enable Firestore** — [coralytics-c8767 Firestore](https://console.firebase.google.com/project/coralytics-c8767/firestore)
2. **Service account key** — Project settings → Service accounts → **Generate new private key** → save as `service-account.json` in the repo root
3. **Update `.env`:**

```bash
FIREBASE_PROJECT_ID=coralytics-c8767
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json
FIRESTORE_EMULATOR_HOST=localhost:8080   # keep for local dev; seed:cloud ignores it
```

4. **Deploy security rules:**

```bash
npm run firebase:deploy:rules
```

5. **Seed cloud data:**

```bash
npm run seed:cloud
```

6. **Verify** — Console → `users` → `demo-user` → `uploads` / `analyses`
7. **Invite teammate** — Project settings → Users and permissions → Add member

To point the **running backend** at cloud (not just the seed script), comment out `FIRESTORE_EMULATOR_HOST` in `.env` and restart uvicorn.

### 5. Deploy hosting

```bash
cd frontend && npm run build
cd .. && npm run firebase:deploy:hosting
```

### 6. Production backend (Cloud Run)

1. Deploy the backend to Cloud Run — Application Default Credentials are used automatically.
2. Set `FIREBASE_PROJECT_ID` as a Cloud Run environment variable.
3. Do not set emulator env vars in production.

## Testing

`test/Coralytics.postman_collection.json` covers all API endpoints. Recommended folders:

| Folder | Purpose |
|---|---|
| **00 - Seed demo data** | One-shot seed into Firestore |
| **01 - Full pipeline** | End-to-end: ingest → list → analyze |
| **03 - Frontend flow** | Same calls the React app makes (sidebar, dashboard, upload) |

`test/fixtures/` contains sample files for manual `POST /uploads` file-upload tests in Postman.

## Status / roadmap

### Done

- Firestore persistence, ingestion pipeline, local emulator, cloud seed, security rules
- Full Firebase Auth (email/password) with Auth emulator support
- NLP pipeline: VADER sentiment, TF-IDF topics, persona summary, sentiment timeline
- Red flag detection, branding recommendations, platform comparison, persona evolution
- Frontend dashboard with data-driven 3D coral, branch click-to-view-posts, PNG export
- Upload flow with auto-analyze; Insights page with full NLP breakdown
- Share page: JSON/PNG export, compare analyses, recruiter share links (`/view/:token`)
- Privacy settings dashboard (`/settings`)

### Deferred

- Reddit OAuth live API (file upload ingestion remains)
- AI persona insights (KIV)
