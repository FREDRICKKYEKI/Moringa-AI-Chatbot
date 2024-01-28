#!/usr/bin/env python3
"""
config file for the chatbot
"""
import os


__port__ = os.getenv("PORT") or 3333
__cwd__ = os.getcwd()
__public_dir__ = os.path.abspath("./chatbot/dist/")
__template_dir__ = os.path.abspath('./chatbot/dist')
__model_path__ = os.path.abspath('./pickles/chatbot.model')
__vect_path__ = os.path.abspath('./pickles/tfidf_vectorizer.joblib')
__label_enc_path__ = os.path.abspath('./pickles/label_encoder.joblib')
__ERR_THRESH__ = 0.25
on_fail_response = "I'm sorry, I wasn't able to understand. Kindly elaborate..."
