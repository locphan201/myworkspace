from flask import Flask, render_template
from app import App

# Settings
FILE_NAME = 'data.csv'
app = App(FILE_NAME)
capp = Flask(__name__)

@capp.route('/')
def index():
    return render_template('index.html')

capp.run(debug=True)