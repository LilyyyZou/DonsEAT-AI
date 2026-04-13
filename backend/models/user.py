from dataclasses import dataclass, asdict
from pymongo import MongoClient
from pymongo.collection import Collection
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

def register_user(username: str, email: str, password: str, collection: Collection) -> tuple[bool, str]:
    try: 
        userId = str(uuid.uuid4())
        
        # Use the injected collection
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

def retrieve_user(username: str, password: str, collection: Collection) -> Optional[User]: 
    try:
        user_data = collection.find_one({"username": username})
        
        if user_data:
            hashed_password = user_data["password"]
            if bcrypt.checkpw(password.encode('utf-8'), hashed_password):
                user_data.pop('_id', None)
                return User(**user_data)
        
        return None
    except Exception as e: 
        print(f"An error occurred during retrieval: {e}")
        return None
    
    except Exception as e: 
        print(f"An error occured during registration: {e}")
        return None
