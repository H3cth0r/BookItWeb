from flask import Flask
from flask import render_template

print("Server started")

app = Flask(__name__)

@app.route("/")
def hello_world(name=None):
    return render_template('main.html', name=name)


