from flask import Flask

print("Server started")

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello</p>"


