# Coralytics

Coralytics is a React + Three.js web app with a Python/FastAPI analysis backend.

## Structure

- `frontend/` - Vite React app for the dashboard and 3D organism visualiser.
- `frontend/src/three/` - procedural organism generators for the Three.js coral/tree.
- `backend/` - FastAPI service for VADER sentiment, scikit-learn topic clustering, and Firestore persistence.
- `firebase.json` - Firebase Hosting, Firestore, and emulator configuration.
- `firestore.rules` - security rules for user-scoped data.

## Data storage

Coralytics uses **Firestore only** on the free Spark plan. Raw export files are parsed in memory on upload and never stored in the cloud.

| Data | Firestore path | Purpose |
|---|---|---|
| Upload metadata | `users/{userId}/uploads/{uploadId}` | Platform, filename, post count, timestamps |
| Parsed posts | `users/{userId}/uploads/{uploadId}/posts/{postId}` | Normalized post content for analysis |
| Analysis results | `users/{userId}/analyses/{analysisId}` | Sentiment, topics, organism data |

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

On Windows, activate the virtual environment with:

```bash
.venv\Scripts\activate
```

### API endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/health` | Health check and Firebase config status |
| `POST` | `/uploads` | Parse an export in memory and save posts to Firestore |
| `GET` | `/uploads/{user_id}` | List upload metadata for a user |
| `GET` | `/uploads/{user_id}/{upload_id}` | Get a single upload record |
| `GET` | `/uploads/{user_id}/{upload_id}/posts` | List parsed posts for an upload |
| `POST` | `/analyze` | Run analysis and persist results to Firestore |
| `GET` | `/analyses/{user_id}` | List analyses for a user |
| `GET` | `/analyses/{user_id}/{analysis_id}` | Get a single analysis |

`POST /analyze` accepts either:
- `posts` in the request body, or
- `upload_ids` to load parsed posts from Firestore

## Firebase setup

### 1. Install Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

### 2. Create a Firebase project

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a project (e.g. `coralytics-dev`).
2. Enable **Firestore** in the project.
3. Update `.firebaserc` with your project ID:

```json
{
  "projects": {
    "default": "your-project-id"
  }
}
```

4. Update `backend/.env`:

```bash
FIREBASE_PROJECT_ID=your-project-id
```

### 3. Local development with emulators (recommended)

No service account key required. From the repo root:

```bash
npm install
npm run firebase:emulators
```

Make sure `backend/.env` includes:

```bash
FIRESTORE_EMULATOR_HOST=localhost:8080
```

Emulator UI: http://localhost:4000

### 4. Deploy rules and hosting

```bash
npm run firebase:deploy:rules
npm run firebase:deploy:hosting   # after `cd frontend && npm run build`
```

### 5. Production backend (Cloud Run)

1. Create a Firebase service account with Firestore access.
2. Deploy the backend to Cloud Run — Application Default Credentials are used automatically.
3. Set `FIREBASE_PROJECT_ID` as a Cloud Run environment variable.
4. Remove emulator env vars from production config.

**Never commit** service account JSON files. They are listed in `.gitignore`.
