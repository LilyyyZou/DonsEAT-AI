import requests
from bs4 import BeautifulSoup
from datetime import date 
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))
db = client["DonsEat"]
collection = db["menu_items"]
collection.create_index("name", unique=True)

# to be used after Jan 23rd (?) or whenever the school caf opens again to get new menu items
jintian = date.today()
url = "https://usf.cafebonappetit.com/cafe/the-market-cafe/" + f"{jintian}/"

headers = {
    "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Mobile Safari/537.36 Edg/144.0.0.0",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Language": "en-US,en;q=0.9,ja;q=0.8",
    "Cache-Control": "no-cache",
    "Pragma": "no-cache",
    "Sec-Ch-Ua": '"Not(A:Brand";v="8", "Chromium";v="144", "Microsoft Edge";v="144"',
    "Sec-Ch-Ua-Mobile": "?1",
    "Sec-Ch-Ua-Platform": '"Android"',
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Upgrade-Insecure-Requests": "1"
}

response = requests.get(url, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
    
    food_items = soup.find_all(class_="site-panel__daypart-item-title")
    
    print(f"Found {len(food_items)} items for {url}:\n")
    
    unique_foods = set()
    for item in food_items:
        food_name = item.get_text(strip=True)
        if food_name: 
            collection.update_one({"name": food_name}, {"$setOnInsert": {"name": food_name, "first_seen": str(jintian)}}, upsert=True)

else: 
    print(f"Failed. Status code: {response.status_code}")
