from dataclasses import dataclass
from pymongo import MongoClient
from dotenv import load_dotenv
import uuid
import os 

@dataclass 
class Review: 
    reviewId: str
    username: str
    stars: int
    comment: str

def register_review(review: Review) -> bool: 
    True

def retrieve_review(reviewId: str) -> bool: 
    True