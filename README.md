# Capstone Project
## Moringa-AI-Chatbot
AI Chatbot for Moringa School
![](./images/director_shot.jpeg)

**Authors**: 
* Fredrick 
* Angela 
* Mark
* Peninnah
* Dennis
* Samuel
* Kelvin

### Contents
- [Overview](#overview)
- [Business Understanding](#businessunderstanding)
- [Business Problem](#businessproblem)
- [Objectives of the Chatbot](#objectivesofthechatbot)
- [Data Understanding](#dataunderstanding)
- [Data Preparation](#datapreparation)
- [Exploratory Data Analysis (EDA) ](#exploratorydataanalysis(EDA))
- [Modeling](#modeling)
- [Evaluations](#evaluations)
- [Conclusions and Recommendations](#conclusionsandrecommendations)

  ***
  ## Overview
The primary objective of this project is to develop an **AI chatbot for Moringa School's website**. The chatbot aims to understand user queries, connect users to key information about courses and enrollment, and provide technical support for any issues faced by visitors. The chatbot will leverage **Natural Language Toolkit (NLTK)** for natural language processing, ensuring a comprehensive understanding of user inquiries.

***
## Business Understanding
The adoption of chatbots is on the rise, with the project anticipating that by the end of 2030, over 75% of customer queries will be resolved by chatbots. Companies are increasingly using chatbots to boost efficiency by automating recurring queries, providing quick customer assistance, and enhancing customer experience by reducing wait times and offering 24/7 support. In the education sector, this project falls under the category of "service-oriented chatbots," designed to answer FAQs and provide general information.

***
## Business Problem
Moringa School, a learning accelerator in Nairobi, Kenya, has experienced substantial growth, training over 2000 students globally since its inception in 2014. With a goal to train over 200,000 students by 2030 and new course launches, the demand for Moringa School's services is expected to increase. The current modes of accessing Moringa services, such as visiting the website or making calls, may not efficiently cater to the growing demand. The business problem is to bridge this gap by employing a chatbot to provide fast, 24/7 service, improve customer experience, offer access to information, and provide technical support.

***
## Objectives of the Chatbot

* **Provide Fast, 24/7 Service**: The chatbot will ensure round-the-clock support, especially during peak hours, peak seasons, or for international students in different time zones, reducing wait times when human assistants are unavailable.

* **Improve Customer Experience**: Welcoming users to the website and offering navigation assistance, the chatbot will enhance the overall user experience by providing efficient links to specific resources.

* **Provide Access to Information**: Users can inquire about general information, such as courses offered, admission procedures, tuition fees, and events. The chatbot will provide details, schedules, and registration information for events.

* **Offer Technical Support**: The chatbot will address technical issues users may face on the website, guiding them through troubleshooting steps or redirecting them to relevant resources.

* **Data Collection for Learning**: As the chatbot assists users, it will collect data on user queries, frequently asked questions and areas for improvement. This data will enable the chatbot to learn, providing more accurate and personalized responses over time. The chatbot will improve its ability to discern which queries it can handle autonomously and which may require human assistance.

***
## Data Understanding

* **Source of Data**: The project obtained data by scraping Moringa School's websites, employing two Python scripts: link_scraper.py and web_scraper.py.

** **Link Scraper**: Utilizes BeautifulSoup to extract hyperlinks from Moringa School's website pages, saving the links to a JSON file named scraped_links.json.

** **Web Scraper**: Utilizes links from scraped_links.json to extract text content from corresponding web pages. Text data is then saved in moringa_text_corpus.json.

* Data Files:

* **scraped_links.json**: Contains unique URLs obtained during link scraping.
* **moringa_text_corpus.json**: Stores text content in a structured format, associating each link with a list of unique text snippets.

