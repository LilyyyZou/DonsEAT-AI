import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.collection import Collection
from dotenv import load_dotenv

from models.user import User, register_user, retrieve_user

load_dotenv()

# 1. Manage the database lifecycle
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize the client connection pool
    app.mongodb_client = MongoClient(os.getenv("MONGO_URI"))
    app.db = app.mongodb_client["usr"]
    print("Connected to MongoDB!")
    
    yield # The FastAPI app runs here
    
    # Shutdown: Cleanly close the connection pool
    app.mongodb_client.close()
    print("Disconnected from MongoDB.")

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str

class LoginRequest(BaseModel):
    username: str # Note: changed from email to match retrieve_user logic
    password: str

# 2. Create a dependency function to grab the collection
def get_user_collection(request: Request) -> Collection:
    return request.app.db["Users"]

# 3. Inject the collection using Depends()
@app.post("/api/register")
def register(req: RegisterRequest, collection: Collection = Depends(get_user_collection)):
    # Pass the injected collection to your business logic
    success, msg = register_user(req.username, req.email, req.password, collection)
    
    if success:
        return {"message": "User registered successfully"}
    else:
        raise HTTPException(status_code=400, detail=msg)

@app.post("/api/login")
def login(req: LoginRequest, collection: Collection = Depends(get_user_collection)):
    # Pass the injected collection to your business logic
    user = retrieve_user(req.username, req.password, collection)
    
    if user:
        return {
            "message": "Login successful", 
            "user": {
                "username": user.username, 
                "email": user.email
            }
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid username or password")