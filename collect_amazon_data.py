import requests
from bs4 import BeautifulSoup
import pandas as pd

# Function to scrape data from a single Myntra page
def scrape_myntra_page(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}
    
    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')

    products = []

    for item in soup.find_all('div', class_='product-base'):
        name = item.find('h3', class_='product-brand').text.strip()
        description = item.find('h4', class_='product-product').text.strip()
        price = item.find('div', class_='product-price').text.strip()

        product = {
            'Name': name,
            'Description': description,
            'Price': price
        }

        products.append(product)

    return products

# URL of the Myntra page to scrape
url = 'https://www.myntra.com/men-tshirts'

# Scrape the data
products = scrape_myntra_page(url)

# Create a DataFrame
df = pd.DataFrame(products)

# Save the DataFrame to a CSV file
df.to_csv('/mnt/data/myntra_products.csv', index=False)

print(f"Scraped {len(products)} products from Myntra.")
