from flask import Flask
from flask import render_template
import sqlite3

print("Server started")

app = Flask(__name__)

@app.route("/")
def hello_world(name=None):
    return render_template('main.html', name=name)

#api

@app.route("/api")
def login():

    return "{'a' = 1}"

if __name__ == '__main__':
    app.run(debug=True)