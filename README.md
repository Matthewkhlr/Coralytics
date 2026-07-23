# Coralytics

React + Three.js frontend with a Python/FastAPI backend. Social exports are ingested into **DB1**, analyzed by NLP into **DB2**, and visualized as a personalized 3D reef.

**Firebase project:** `coralytics-c8767` (see `.firebaserc`)

## Architecture

```
frontend/ (React + Vite + Three.js)  →  /api  →  backend/ (FastAPI)  →  Firestore + Cloud Storage
                                                      DB1: raw_uploads/
                                                      DB2: analyses/
```

| Layer | Dev command |
|---|---|
| Emulators | `npm run firebase:emulators` (repo root) |
| Backend | `cd backend && uvicorn app.main:app --reload` |
| Frontend | `cd frontend && npm run dev` |

## Quick start (local)

```bash
cp .env.example .env
npm install && cd frontend && npm install && cd ../backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
```

**Terminal 1** — emulators (repo root):

```bash
npm run firebase:emulators
```

**Terminal 2** — backend:

```bash
cd backend && source .venv/bin/activate
uvicorn app.main:app --reload
```

**Terminal 3** — frontend:

```bash
cd frontend && npm run dev
```

| Service | URL |
|---|---|
| App | http://localhost:5173 |
| API | http://localhost:8000 |
| Emulator UI | http://localhost:4000 |

Requires **JDK 21+** for Firebase emulators. No service account needed for local emulator use.

## Environment variables

```bash
cp .env.example .env
```

See `.env.example` for local emulator defaults. **Never commit** `.env` or `service-account.json`.

## Deployment

Prerequisites: [Firebase CLI](https://firebase.google.com/docs/cli), [gcloud CLI](https://cloud.google.com/sdk/docs/install), and access to project `coralytics-c8767`.

```bash
npm install -g firebase-tools
npx firebase login
gcloud auth login
gcloud config set project coralytics-c8767
```

### 1. Enable Firestore

Create a Firestore database in the [Firebase Console](https://console.firebase.google.com/project/coralytics-c8767/firestore).

### 2. Deploy rules

```bash
firebase deploy --only firestore:rules,firestore:indexes,storage
```

### 3. Cloud configuration

For production, use cloud Firestore (no emulator env vars on the backend). Grant the Cloud Run service account access to Firestore and Storage.

Set production CORS on the backend to your hosting origin, e.g. `https://coralytics-c8767.web.app`.

### 4. Build frontend for production

Set `VITE_API_URL` in `.env` to your Cloud Run API URL before building.

```bash
cd frontend && npm run build
```

### 5. Deploy hosting

```bash
cd frontend && npm run build && cd .. && firebase deploy --only hosting
```

### 6. Deploy backend (Google Cloud Run)

Deploy the FastAPI backend to Cloud Run. Application Default Credentials (ADC) are used automatically:

```bash
cd backend
gcloud run deploy coralytics-api \
  --source . \
  --region asia-southeast1 \
  --allow-unauthenticated \
  --set-env-vars FIREBASE_PROJECT_ID=coralytics-c8767
```

Do not set `FIRESTORE_EMULATOR_HOST`, `FIREBASE_AUTH_EMULATOR_HOST`, or `FIREBASE_STORAGE_EMULATOR_HOST` on Cloud Run.

After deploy, point the frontend `VITE_API_URL` at the Cloud Run URL and rebuild/redeploy hosting if needed.
