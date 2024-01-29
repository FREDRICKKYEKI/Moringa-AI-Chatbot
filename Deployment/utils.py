#!/usr/bin/env python3
"""
This file contains the functions used for text classification and similarity
"""
import json
from difflib import SequenceMatcher
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from joblib import load
import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from config import __model_path__, __vect_path__, __label_enc_path__,\
    __ERR_THRESH__, on_fail_response


try:
    import tensorflow as tf

    final_model = tf.keras.models.load_model(__model_path__)
except Exception as e:
    final_model = None

vectorizer = load(__vect_path__)
label_encoder = load(__label_enc_path__)

lemmer = nltk.stem.WordNetLemmatizer()

with open("../Final_Intents.json") as f:
    intents = json.load(f)

responses = []
questions =[]
for intent in intents:
    responses += intent["responses"]
    questions += intent["questions"]

# Initialize the TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer()


def clean_text(sentence):
    lower = sentence.lower()
    ignoreLetters = ['?', '!', '.', ',', '/']
    toks = word_tokenize(lower)
    stop_words = set(stopwords.words('english'))
    toks = [word for word in toks if word not in ignoreLetters]
    sentence = [word for word in sentence if word not in stop_words]
    return toks


def get_response_list(class_: str = None) -> list[str]:
    """Returns a list of responses
    """
    print(class_)
    responses = []
    for intent in intents:
        # **
        if intent["tag"] == class_:
            responses += intent["responses"]
    return responses

def classify_text(text: str) -> dict:
    """ returns model text classification
    """
    if not final_model:
        return {}
    # clean text
    prep_text = clean_text(text)
    # vectorize the text
    vectorized_txt = vectorizer.transform(prep_text)
    # get predicted classes
    pred = final_model.predict([vectorized_txt])

    results = {np.argmax(r): r[np.argmax(r)]
               for i, r in enumerate(pred) if any(r > __ERR_THRESH__)}
    # sort classes
    results = dict(sorted(results.items(), key=lambda k: k[1], reverse=True))

    return results

def similarity(input_str: str, category: str) -> str:
    """Gets the most similar string
    """
    max_ratio = 0
    most_similar_str = None
    input_str = input_str.lower()

    for str_item in get_response_list(category):
        similarity_ratio = SequenceMatcher(None, input_str, str_item).ratio()
        if similarity_ratio > max_ratio:
            max_ratio = similarity_ratio
            most_similar_str = str_item

    return most_similar_str

def similarity_(question, class_):
    # Combine the question and answer lists
    corpus = get_response_list(class_)

    # Initialize the TF-IDF vectorizer
    tfidf_vectorizer = TfidfVectorizer()

    # Fit and transform the corpus
    tfidf_matrix = tfidf_vectorizer.fit_transform(corpus)

    # Transform the question into TF-IDF representation
    question_tfidf = tfidf_vectorizer.transform([question])

    # Calculate cosine similarity between the question and each answer
    similarity_scores = cosine_similarity(question_tfidf, tfidf_matrix)

    # Find the index of the answer with the highest similarity score
    max_similarity_index = similarity_scores.argmax()

    # Return the answer corresponding to the highest similarity score
    return corpus[max_similarity_index]



# entity classification
def get_response(user_input: str) -> str:
    """Gets user query and returns bot response
    """
    pred_classes = classify_text(user_input)

    if not len(pred_classes.keys()):
        return on_fail_response

    return similarity(user_input, pred_classes)
