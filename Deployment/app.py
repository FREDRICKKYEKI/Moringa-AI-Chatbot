#!/usr/bin/python3
"""
Returns the status of our application
"""
import datetime
import uuid
from flask import Flask, jsonify, render_template, send_from_directory,\
    request, make_response
from flask_cors import CORS
import nltk
from config import __port__, __public_dir__, __template_dir__
from utils import  vectorizer, clean_text, label_encoder, similarity, similarity_


# download the punkt tokenizer
nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__, template_folder=__template_dir__)
CORS(app)


@app.errorhandler(404)
def page_not_found(_):
    """
    if the route is not found return an error
    """
    return (jsonify({"error": "Not found"}), 404)


@app.route('/<path:resource>')
def get_resource(resource):
    """Serve static resources
    """
    print(__public_dir__+resource)
    return send_from_directory(__public_dir__, resource)


@app.get('/status')
def status():
    """
    Return the status of the application
    """
    return jsonify({"status": "OK"})

@app.get("/")
def index():
    """
    Return index file
    """
    return render_template('index.html', mode="window.mode=1")

@app.post("/vectorize")
def vectorize():
    """
    Return index file
    """
    body = request.get_json()
    if not body.get("user_input"):
        return make_response({"error": "No user input"}), 400

    # clean text
    prep_text = clean_text(body.get("user_input"))

    # vectorize the text
    vectorized_txt = vectorizer.transform(prep_text)
    return make_response({"user_input": body.get("user_input"),
                          "vector": vectorized_txt.todense().tolist(),
                          "time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                          }), 200

@app.post("/response")
def response():
    """
    Return index file
    """
    body = request.get_json()
    if not body.get("user_input"):
        return make_response({"error": "No user input"}), 400
    elif not body.get("vector"):
        return make_response({"error": "No vector input"}), 400

    # find key of highest value in vector
    vector = list(body.get("vector").values())

    if not len(vector) > 0:
        return make_response({"error": "Empty vector"}), 400

    max_value = max(vector)
    max_index = vector.index(max_value)
    class_key = max_index % len(list(label_encoder.classes_))
    category = label_encoder.classes_[class_key]
    bot_response = similarity_(body.get("user_input"), category)

    return make_response({
        "id": uuid.uuid4(),
        "user_input": body.get("user_input"),
        "response": bot_response,
        "time": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        }), 200

if __name__ == '__main__':
    # Start file watching
    app.run(debug=True, port=__port__)
