#!/usr/bin/python3
"""
Returns the status of our application
"""
from flask import Flask, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
import subprocess

port = os.getenv("PORT") or 3333
__cwd__ = os.getcwd()
__public_dir__ = os.path.join(__cwd__, "Deployment/chatbot/dist/")
__BUILD_SCRIPT__ = f"cd {os.path.join(__cwd__, 'Deployment', 'chatbot')} && npm run build"
__template_dir__ = os.path.abspath('./Deployment/chatbot/dist')

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
    print(__public_dir__ + resource)
    return send_from_directory(__public_dir__, resource)


@app.get('/status')
def status():
    """
    Return the status of the application
    """
    return jsonify({"status": "OK"})


print("mode: ", os.getenv("mode"))

@app.get("/")
def index():
    """
    Return index file
    """
    return render_template('index.html', title="", movies=[], home=True)

if __name__ == '__main__':
    # Start file watching
    app.run(debug=True, port=port)
