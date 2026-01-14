import requests
from bs4 import BeautifulSoup
from datetime import date 

# to be used after Jan 23rd (?) or whenever the school caf opens again to get new menu items
#   jintian = date.today()
#   url = "https://usf.cafebonappetit.com/cafe/the-market-cafe/" + f"{jintian}/"

url = "https://usf.cafebonappetit.com/cafe/the-market-cafe/2026-01-23/"
headers = {
    
}
response = requests.get(url, headers=headers)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')
