# Coralytics

Coralytics is a React + Three.js web app with a Python/FastAPI analysis backend. Social export files are extracted, stored as raw data in **DB1**, analyzed by NLP into **DB2**, and visualized as a personalized 3D reef.

**Firebase project:** `coralytics-c8767` (see `.firebaserc`)

## Architecture

```
┌─────────────────┐     /api proxy      ┌──────────────────┐     Admin SDK    ┌──────────────────────────────┐
│  frontend/      │ ──────────────────► │  backend/        │ ─────────────► │  Firestore + Cloud Storage   │
│  React + Vite   │   localhost:8000    │  FastAPI         │                │  DB1: raw_uploads/           │
│  Three.js reef  │                     │  ingest + NLP    │                │  DB2: analyses/              │
└─────────────────┘                     └──────────────────┘                └──────────────────────────────┘
```

| Layer | Stack | Dev command |
|---|---|---|
| Frontend | React 19, Vite, React Router, Three.js | `cd frontend && npm run dev` |
| Backend | Python 3, FastAPI, firebase-admin | `cd backend && uvicorn app.main:app --reload` |
| Data | Firestore + Storage (local emulators) | `npm run firebase:emulators` (repo root) |
| Tooling | Firebase CLI (repo root `package.json`) | `npm install` at repo root |

The backend is **Python** — there is no `npm run dev` in `backend/`. Use a Python virtual environment (`.venv`) and `uvicorn`.

## Structure

| Path | Purpose |
|---|---|
| `frontend/` | Vite React app — landing, upload flow, reef dashboard, insights |
| `frontend/src/pages/` | Routes: Landing, Upload, Dashboard, Insights, Login, Recruiter view |
| `frontend/src/api/` | Typed API client (`fetch` → FastAPI) |
| `frontend/src/three/` | Procedural reef generators (`coralV1`–`v4`), environment, highlights |
| `backend/` | FastAPI service — ingestion, Firestore/Storage persistence, NLP analysis |
| `backend/app/ingestion/` | Export parsers (Instagram, LinkedIn, Reddit, generic) |
| `backend/app/ingestion/sample_data/` | Bundled demo exports used by the seed script |
| `test/` | Postman collection, fixtures, data-model diagram |
| `firebase.json` | Firestore, Storage, Hosting, and emulator configuration |
| `firestore.rules` / `storage.rules` | Security rules (enforced when Firebase Auth is wired up) |
| `.env` | Shared config for frontend (`VITE_*`) and backend (repo root) |

## Data storage

Schema version **2** uses a hybrid model:

| Layer | Location | Purpose |
|---|---|---|
| **DB1 metadata** | `users/{userId}/raw_uploads/{uploadId}` | Upload lifecycle (`pending`/`ready`/`failed`), checksum, ingest report, object pointer |
| **DB1 normalized posts** | `users/{userId}/raw_uploads/{uploadId}/posts/{postId}` | Queryable posts (`platform`, `post_type`, `created_at`) |
| **DB1 object storage** | Cloud Storage `users/{uid}/raw_uploads/{uploadId}/…` | Original export bytes (local fallback when Storage emulator is unset) |
| **DB1 legacy files** | `…/files/{fileId}` (+ optional `chunks`) | Retained for dual-read during migration; removed only by explicit cleanup |
| **DB2 analysis** | `users/{userId}/analyses/{analysisId}` | Sentiment, topics, organism data, chunked `post_insights` |
| **Shares** | `shares/{token}` | Privacy-filtered snapshots; `expire_at` TTL + API expiry/revoke |
| **Usernames** | `usernames/{username}` | Backend-owned unique handles (no public Firestore reads) |

Pipeline: upload → extract → store object + normalized posts (+ legacy files) → NLP → DB2 → dashboard.

Schema diagram: [`test/coralytics_data_model.mmd`](test/coralytics_data_model.mmd)

Migrate existing v1 uploads (dry-run first):

```bash
npm run migrate:dry-run
npm run migrate:apply
```

The FastAPI backend writes via the **Firebase Admin SDK** and bypasses client security rules. Direct client writes to uploads/analyses/shares/usernames are denied.

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

You need **three long-running terminals** (emulators, backend, frontend). Run the seed command once when you need sample data.

### 0. One-time setup

```bash
npm install                    # repo root — Firebase CLI
cd frontend && npm install
cd ../backend
python3 -m venv .venv          # py -3 on Windows
source .venv/bin/activate      # .venv\Scripts\activate on Windows
pip install -r requirements.txt
```

Create a repo-root `.env` (frontend and backend both read it):

```env
FIREBASE_PROJECT_ID=coralytics-c8767
FIRESTORE_EMULATOR_HOST=localhost:8080
FIREBASE_STORAGE_EMULATOR_HOST=localhost:9199
FIREBASE_AUTH_EMULATOR_HOST=localhost:9099
CORS_ORIGINS=http://localhost:5173
VITE_USE_AUTH_EMULATOR=true
```

`FIREBASE_PROJECT_ID` should match `.firebaserc`. Emulator host variables route the backend to local Firestore, Storage, and Auth instead of cloud.

### Terminal 1 — Firebase emulators (repo root)

```bash
npm run firebase:emulators
```

| Service | URL / port |
|---|---|
| Emulator UI | http://localhost:4000 |
| Firestore | `localhost:8080` |
| Auth | `localhost:9099` |
| Storage | `localhost:9199` |

Local data lives in the emulators, not Google Cloud. If you reset them, run `npm run seed` again.

> **Requires JDK 21+.** If you see `firebase-tools no longer supports Java version before 21`, install a newer JDK from [Adoptium](https://adoptium.net/) and verify with `java -version`.

### Terminal 2 — backend API

```bash
cd backend
source .venv/bin/activate      # .venv\Scripts\activate on Windows
uvicorn app.main:app --reload
```

- API: http://localhost:8000
- Health: http://localhost:8000/health → `{"status":"ok","use_emulators":true,...}`

### Terminal 3 — frontend

```bash
cd frontend
npm run dev
```

- App: http://localhost:5173
- API calls go to `/api/*` → Vite proxies to `http://localhost:8000`

### Seed demo data (once per fresh emulator)

```bash
npm run seed
```

Loads all files in `backend/app/ingestion/sample_data/`, saves normalized posts to Firestore, runs the analysis pipeline, and creates persisted reef data for `demo-user`.

View in Emulator UI: http://localhost:4000 → `users` → `demo-user` → `raw_uploads` / `analyses`

A service account key is **not** required for emulator-only work.

## Frontend

The React app reads from the shared `.env` at the repo root (`VITE_*` variables). Vite is configured with `envDir` pointing at the repo root and proxies `/api` to the backend during development.

### Routes

| Route | Page | Auth |
|---|---|---|
| `/` | Landing — product overview and how-it-works | Public (signed-in users see a personalized hero) |
| `/login` | Sign in / sign up (Firebase Auth) | Public |
| `/upload` | Export upload, platform confirmation, run history | Required |
| `/dashboard` | Reef — 3D visualization, run/source filters, topic & post callouts, PNG export, reef theme | Required |
| `/insights` | Topics, sentiment, red flags, branding, platform comparison, evolution | Required |
| `/styles` | Internal design-system reference | Required |
| `/view/:token` | Public recruiter read-only reef preview | Public |

Legacy redirects: `/coral`, `/organism`, `/share` → `/dashboard`; `/about`, `/profile`, `/settings` → `/`.

Protected routes redirect to `/login` when signed out. Dashboard and Insights share a `?run=` query param to keep the selected analysis snapshot in sync.

### API integration

The frontend calls the FastAPI backend with Firebase ID tokens (`Authorization: Bearer`):

| Frontend feature | API endpoint |
|---|---|
| Upload flow + run history | `POST /uploads`, `GET /uploads/{user_id}`, `PATCH /uploads/{user_id}/{upload_id}` |
| Reef + insights data | `GET /analyses/{user_id}`, `GET /analyses/{user_id}/{analysis_id}` |
| Analyze / re-analyze | `POST /analyze` |
| Posts by topic (branch click) | `GET /uploads/{user_id}/posts/by-topic` |
| Reef theme (water/sand/rock) | `GET/PUT /users/{user_id}/reef-settings` |
| Recruiter view | `GET /shares/{token}` (public) |
| Username login | `POST /usernames/resolve-login` |

Share creation and privacy settings APIs exist on the backend but do not yet have dedicated UI pages.

### Authentication (email, username, Google)

| Method | How |
|---|---|
| Email + password | Sign up / login on `/login` |
| Username login | Enter username on login form (resolved to email via API) |
| Google | **Continue with Google** on `/login` (sign-up tab requires a username first) |

**Local Google sign-in:** set `VITE_USE_AUTH_EMULATOR=true` in `.env` and run `npm run firebase:emulators`.

**Cloud Google sign-in:**

1. [Firebase Console](https://console.firebase.google.com/project/coralytics-c8767/authentication/providers) → **Authentication** → **Sign-in method** → enable **Google**
2. **Authentication** → **Settings** → **Authorized domains** → add `localhost` and your production domain (e.g. `coralytics-c8767.web.app`)
3. Ensure frontend env vars match the same Firebase project (`VITE_FIREBASE_PROJECT_ID`)

New Google users who sign in without a username are prompted to **pick a username** before entering the app. Local emulator accounts and cloud accounts are separate — sign up in each environment independently.

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
| `POST` | `/seed/sample-data` | Ingest all bundled sample exports + analysis |
| `POST` | `/uploads` | Ingest a `.zip`/`.json`/`.csv` export (v2 hybrid storage) |
| `POST` | `/uploads/fixture` | Ingest one sample file from disk (**emulator only**) |
| `GET` | `/uploads/{user_id}` | List upload metadata (`limit`, `cursor`) |
| `GET` | `/uploads/{user_id}/{upload_id}` | Get a single upload record |
| `PATCH` | `/uploads/{user_id}/{upload_id}` | Update confirmed platform (`instagram` / `linkedin` / `reddit`) |
| `DELETE` | `/uploads/{user_id}/{upload_id}` | Recursively delete upload + storage |
| `GET` | `/uploads/{user_id}/{upload_id}/posts` | List posts (paginated: `limit`, `cursor`) |
| `POST` | `/analyze` | Run cumulative analysis and optionally persist |
| `GET` | `/analyses/{user_id}` | List analyses (`limit`, `cursor`; summaries only) |
| `GET` | `/analyses/{user_id}/{analysis_id}` | Get a single analysis |
| `DELETE` | `/analyses/{user_id}/{analysis_id}` | Delete analysis + insight chunks |
| `GET` | `/uploads/{user_id}/posts/by-topic` | List posts tagged with a topic |
| `GET` | `/users/{user_id}/privacy-settings` | Get privacy settings |
| `PUT` | `/users/{user_id}/privacy-settings` | Update privacy settings |
| `GET` | `/users/{user_id}/reef-settings` | Get reef theme settings |
| `PUT` | `/users/{user_id}/reef-settings` | Update reef theme settings |
| `POST` | `/shares` | Create recruiter share link (auth required) |
| `GET` | `/shares/{token}` | Public read-only share payload |
| `POST` | `/shares/{token}/revoke` | Owner revoke share |
| `DELETE` | `/shares/{token}` | Owner delete share |
| `GET` | `/usernames/available` | Check username availability |
| `GET` | `/usernames/me` | Get authenticated user's claimed username |
| `POST` | `/usernames/resolve-login` | Resolve username → email for Auth login |
| `POST` | `/usernames/claim` | Claim username (auth required) |
| `POST` | `/usernames/change` | Rename username atomically (auth required) |

`POST /analyze` always analyzes the user's full post history. Public endpoints: `/health`, `GET /shares/{token}`, `GET /usernames/available`, `POST /usernames/resolve-login`. All other endpoints require a Firebase ID token.

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
| `npm run firebase:emulators` | Start Firestore + Auth + Storage emulators |
| `npm run firebase:emulators:all` | Start Firestore + Hosting + Auth + Storage emulators |
| `npm run firebase:deploy:rules` | Deploy Firestore rules and indexes to cloud |
| `npm run firebase:deploy:hosting` | Deploy frontend build to Firebase Hosting |
| `npm run seed` | Seed local emulator with sample data |
| `npm run seed:cloud` | Seed cloud Firestore with sample data |
| `npm run migrate:dry-run` | Preview v1 → v2 upload migration |
| `npm run migrate:apply` | Apply v1 → v2 upload migration |
| `npm run test:backend` | Run backend unit tests |

## Environment variables

Create `.env` at the **repo root**.

| Variable | Required | Description |
|---|---|---|
| `FIREBASE_PROJECT_ID` | Yes | Firebase project ID (`coralytics-c8767`) |
| `EXPECTED_FIREBASE_PROJECT_ID` | Optional | Defaults to `coralytics-c8767`; startup fails on mismatch |
| `ALLOW_FIREBASE_PROJECT_MISMATCH` | Optional | Set `1` to bypass project alignment check |
| `FIREBASE_STORAGE_BUCKET` | Optional | Defaults to `{projectId}.appspot.com` |
| `FIRESTORE_EMULATOR_HOST` | Local only | e.g. `localhost:8080` — routes writes to the emulator |
| `FIREBASE_STORAGE_EMULATOR_HOST` | Local only | e.g. `localhost:9199` for Storage emulator |
| `GOOGLE_APPLICATION_CREDENTIALS` | Cloud only | Path to service account JSON; **relative paths resolve from repo root** |
| `CORS_ORIGINS` | Optional | Comma-separated allowed origins (default: `http://localhost:5173`) |
| `VITE_API_URL` | Frontend | API base URL; use `/api` with Vite dev proxy (default) |
| `VITE_FIREBASE_API_KEY` | Frontend | Firebase web API key (`demo-api-key` works with Auth emulator) |
| `VITE_FIREBASE_AUTH_DOMAIN` | Frontend | Auth domain (`localhost` for emulator) |
| `VITE_FIREBASE_PROJECT_ID` | Frontend | Must match `FIREBASE_PROJECT_ID` |
| `VITE_USE_AUTH_EMULATOR` | Frontend | `true` to connect Auth SDK to `localhost:9099` |
| `VITE_USE_FIRESTORE_EMULATOR` | Frontend | `true` to connect Firestore SDK to `localhost:8080` |
| `FIREBASE_AUTH_EMULATOR_HOST` | Backend | e.g. `localhost:9099` for token verification against emulator |
| `AUTH_DISABLED` | Backend | Set to `1` to skip token checks (local scripting only) |
| `SEED_ENDPOINT_ENABLED` | Optional | Set to `1` to allow `POST /seed/sample-data` against cloud |
| `MAX_UPLOAD_SIZE_BYTES` | Optional | Max upload size in bytes (default: 100 MB) |

**Never commit** `service-account.json` or `.env` — both are gitignored.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `ECONNREFUSED` on `/api/...` in Vite logs | Backend not running | Start uvicorn in `backend/` |
| `Internal Server Error` on uploads | Emulator down or backend can't reach Firestore | Start `npm run firebase:emulators`; restart uvicorn |
| `firebase-tools no longer supports Java version before 21` | Old Java installed | Install JDK 21+; verify `java -version` |
| `uvicorn` not recognized | No venv or deps not installed | Create `.venv`, activate, `pip install -r requirements.txt` |
| `npm run dev` fails in `backend/` | Backend is Python, not Node | Use `uvicorn app.main:app --reload` instead |
| Empty reef after sign-in | No data or emulator was reset | Run `npm run seed`; upload exports on `/upload` |
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

Ensure `.env` includes `FIRESTORE_EMULATOR_HOST=localhost:8080` and `FIREBASE_STORAGE_EMULATOR_HOST=localhost:9199`. No service account needed.

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

6. **Verify** — Console → `users` → `demo-user` → `raw_uploads` / `analyses`
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

Backend unit tests:

```bash
npm run test:backend
```

## Status

### Shipped

- Firestore + Storage persistence, ingestion pipeline, local emulators, cloud seed, security rules
- Full Firebase Auth (email/password, username login, Google) with Auth emulator support
- NLP pipeline: VADER sentiment, TF-IDF topics, persona summary, sentiment timeline
- Red flag detection, branding recommendations, platform comparison, persona evolution
- Upload page with platform confirmation, run history, and snapshot management
- Reef dashboard: data-driven 3D visualization, run/source filters, topic/stem/post callouts, PNG export, customizable reef theme
- Insights page with full NLP breakdown and run snapshot picker
- Public recruiter preview at `/view/:token`
- Internal style guide at `/styles`

### Deferred

- Reddit OAuth live API (file upload ingestion remains)
- Share-link creation UI and privacy settings dashboard (APIs ready)
- AI persona insights (KIV)
