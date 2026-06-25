# Coralytics

Coralytics is a React + Three.js web app with a Python/FastAPI analysis backend. Social export files are ingested, normalized, and stored in **Firestore** (no Cloud Storage on the free Spark plan).

**Firebase project:** `coralytics-c8767` (see `.firebaserc`)

## Structure

| Path | Purpose |
|---|---|
| `frontend/` | Vite React app — dashboard and 3D organism visualiser |
| `frontend/src/three/` | Procedural organism generators for the Three.js coral/tree |
| `backend/` | FastAPI service — ingestion, Firestore persistence, analysis stubs |
| `backend/app/ingestion/` | Export parsers (Instagram, LinkedIn, Reddit, generic) |
| `backend/app/ingestion/sample_data/` | Bundled demo exports used by the seed script |
| `test/` | API tests (Postman collection), fixtures, data-model diagram |
| `firebase.json` | Firestore, Hosting, and emulator configuration |
| `firestore.rules` | User-scoped security rules (enforced when Firebase Auth is wired up) |
| `.env` | Shared config for frontend (`VITE_*`) and backend (repo root) |

## Data storage

Raw export files are parsed **in memory** on upload and never stored in the cloud.

| Data | Firestore path | Purpose |
|---|---|---|
| Upload metadata | `users/{userId}/uploads/{uploadId}` | Platform, filename, post/comment counts, ingest report |
| Parsed posts | `users/{userId}/uploads/{uploadId}/posts/{postId}` | `NormalizedPost` fields (content, hashtags, platform, etc.) |
| Analysis results | `users/{userId}/analyses/{analysisId}` | Sentiment, topics, organism data (stub until NLP is integrated) |

Schema diagram: [`test/coralytics_data_model.mmd`](test/coralytics_data_model.mmd)

The FastAPI backend writes via the **Firebase Admin SDK** and bypasses client security rules. Rules apply when the frontend talks to Firestore directly with Auth.

## Quick start (local)

**Terminal 1 — Firestore emulator** (repo root):

```bash
cp .env.example .env
npm install
npm run firebase:emulators
```

**Terminal 2 — backend:**

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Terminal 3 — seed demo data:**

```bash
cd backend && source .venv/bin/activate
npm run seed
```

- API: http://localhost:8000
- Emulator UI: http://localhost:4000 → `users/demo-user/`

`.env` for local dev should include:

```bash
FIREBASE_PROJECT_ID=coralytics-c8767
FIRESTORE_EMULATOR_HOST=localhost:8080
```

A service account key is **not** required for emulator-only work.

## Frontend

Uses the shared `.env` at the repo root. Prefix frontend variables with `VITE_` (e.g. `VITE_API_URL`).

```bash
cd frontend
npm install
npm run dev
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

`POST /analyze` accepts either `posts` in the request body or `upload_ids` to load parsed posts from Firestore.

### Ingestion

Uploads flow through `backend/app/ingestion/` — auto-detects Instagram, LinkedIn, Reddit, and generic JSON/CSV inside a zip or single file. Demo source files live in `backend/app/ingestion/sample_data/` (8 files across platforms).

Sanity-check parsers without the API:

```bash
cd backend && python -m app.ingestion.demo
```

### Seed demo data

Loads every file in `sample_data/` into Firestore (16 normalized posts, mixed platforms) and creates a stub analysis.

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
| `npm run firebase:emulators` | Start Firestore emulator |
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
| `SEED_ENDPOINT_ENABLED` | Optional | Set to `1` to allow `POST /seed/sample-data` against cloud |

**Never commit** `service-account.json` or `.env` — both are gitignored.

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

`test/Coralytics.postman_collection.json` is for **API verification only** (health, uploads, analyze). It is not part of the demo-data workflow — use `npm run seed` / `npm run seed:cloud` instead.

`test/fixtures/` contains copies of sample files for manual `POST /uploads` file-upload tests in Postman.

## Status / roadmap

- **Done:** Firestore persistence, ingestion pipeline, local emulator, cloud seed, security rules
- **Stub:** `POST /analyze` returns empty `topics` and `sentiment_summary` until VADER / TF-IDF are integrated
- **Planned:** Firebase Auth (`user_id` = `auth.uid`), frontend API wiring, real NLP on analysis documents
