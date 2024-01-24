#!/usr/bin/python3

from bs4 import BeautifulSoup
import requests
import json
from urllib.parse import urljoin

# Lists
urls = []

# Function to scrape and save links
def scrape_and_save(site, output_file):
    # Getting the request from the URL
    r = requests.get(site)

    # Converting the text
    s = BeautifulSoup(r.text, "html.parser")

    for i in s.find_all("a"):
        href = i.get('href', '')

        # Use urljoin to handle URL concatenation
        full_url = urljoin(site, href)
        print(full_url)
        if full_url not in urls and full_url.startswith(site):
            urls.append(full_url)

            # Calling itself
            scrape_and_save(full_url, output_file)

    # Save the URLs to a JSON file
    with open(output_file, 'w') as json_file:
        json.dump(urls, json_file, indent=2)

# Main function
if __name__ == "__main__":
    # Website to be scraped
    site = "https://moringaschool.com/"

    # Output JSON file
    output_json_file = "scraped_links.json"

    # Calling function
    scrape_and_save(site, output_json_file)
