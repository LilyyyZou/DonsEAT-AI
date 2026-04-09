from dataclasses import dataclass, asdict
from pymongo import MongoClient
from dotenv import load_dotenv
from typing import Optional
import bcrypt
import uuid
import os 

@dataclass
class User: 
    userId: str
    username: str
    email: str
    password: str
    reviews: list[str]

def connect(): 
    load_dotenv()
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client["usr"]
    collection = db["Users"]
    collection

def register_user(username: str, email: str, password: str) -> tuple[bool, str]:
    try: 
        collection = connect() 
        userId = str(uuid.uudid4())
        
        if collection.find_one({"username": username}):
            return False, "Username already exists"
        if collection.find_one({"email": email}): 
            return False, "Email already registered"
        
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
        
        user_dict = {
            "userId": userId,
            "username": username,
            "email": email,
            "password": hashed_password,
            "reviews": []
        }
        collection.insert_one(user_dict)
        return True, "ok"
    
    except Exception as e:
        return False, str(e) 

def retrieve_user(username: str, password: str) -> Optional[User]: 
    try:
        collection = connect()
        user_data = collection.find_one({"username": username})
        
        if user_data:
            # Verify the provided password against the hashed password
            hashed_password = user_data["password"].encode('utf-8')
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
                user_data.pop('_id', None)
                return User(**user_data)
        
        return None
    
    except Exception as e: 
        print(f"An error occured during registration: {e}")
        return None
