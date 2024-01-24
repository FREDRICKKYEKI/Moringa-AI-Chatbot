#!/usr/bin/python3
"""
Scrapes moringa school links
"""
import time
import json
import requests
from bs4 import BeautifulSoup


with open("scraped_links.json", "r", encoding="utf-8") as f:
    links = json.load(f)

output_file = "moringa_text_corpus.json"
output_dict = {}
ignore_tags = ["script", "style"]
text_tags = ["p"]  #, "span"]

def scrape_text():
    """Scrape all texr from links"""
    for i, link in enumerate(links):
        print(f"[INFO] scraping {link}...")

        time.sleep(1)

        res = requests.get(link)  # Add timeout argument

        res.raise_for_status()

        soup = BeautifulSoup(res.text, "html.parser")

        text: list[str] = [tag.get_text(strip=True) for tag in soup.find_all() if tag.name in text_tags]

        output_dict[link] = list(set(text))
        # if  i == 2:
            # break

    with open(output_file, "w", encoding="utf-8") as output_file_obj:
        json.dump(output_dict, output_file_obj, indent=2)


if __name__ == "__main__":
    scrape_text()
