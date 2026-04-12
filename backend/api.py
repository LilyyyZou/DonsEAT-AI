# api.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from user import User, register_user, retrieve_user

app = FastAPI()

# Allow your React app to communicate with this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], # Add your React frontend URL here
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models to validate incoming React JSON requests
class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/register")
def register(req: RegisterRequest):
    new_user = User(
        userId="",
        username=req.username,
        email=req.email,
        password=req.password,
        reviews=[]
    )
    success, msg = register_user(new_user)
    if success:
        return {"message": "User registered successfully"}
    else:
        raise HTTPException(status_code=400, detail=msg)

@app.post("/api/login")
def login(req: LoginRequest):
    user = retrieve_user(req.email, req.password)
    if user:
        return {
            "message": "Login successful", 
            "user": {
                "username": user.username, 
                "email": user.email
            }
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid email or password")