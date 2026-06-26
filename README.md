# Coralytics

Coralytics is a React + Three.js web app with a Python/FastAPI analysis backend.

## Structure

- `frontend/` - Vite React app for the dashboard and 3D organism visualiser.
- `frontend/src/three/generateOrganism.ts` - empty procedural organism hook for the Three.js coral/tree.
- `backend/` - FastAPI service scaffold for VADER sentiment, scikit-learn topic clustering, and Firestore persistence.
- `firebase.json` - Firebase Hosting target for the built frontend.

## Frontend

```bash
cd frontend
npm install
npm run dev
```

## Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```
