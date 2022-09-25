from urllib import request
from flask import Flask
from flask import render_template
from flask_sqlalchemy import SQLAlchemy

print("Server started")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///DB/BookMeDB.db'
db = SQLAlchemy(app)

@app.route('/')
def hello_world(name=None):
    
    return render_template('main.html', name=name)


@app.route("/register" ,) #methods=['POST'])
def register():
    request.form['name']
    request.form['surname']
    request.form['username']
    request.form['birth']
    request.form['organization']
    request.form['email']
    request.form['age']
    request.form['password']

    return render_template('register.html')



@app.route("/admin/add_user" ,) #methods=['POST'])
def create_user():
    return render_template('create_user.html')




if __name__ == "__main__":
    app.run(port=3000, debug=True)
