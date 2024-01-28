import sys
import os

# Add the path to app to the sys.path
sys.path.insert(0, os.path.dirname(__file__))

# Import app
from app import app

# Define the app to be used by the WSGI server
application = app
