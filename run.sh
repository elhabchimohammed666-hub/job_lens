# Backend
cd backend
        # then edit DATABASE_URL, SECRET_KEY, JWT_SECRET_KEY
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db migrate -m "initial tables"   # migrations/ was already `flask db init`-ed but versions/ is empty
flask db upgrade
flask run                      # or: python run.py  → http://localhost:5000

# Frontend (separate terminal, from repo root)
# VITE_API_URL=http://localhost:5000/api (already correct)
npm install
npm run dev                    # → http://localhost:5173

