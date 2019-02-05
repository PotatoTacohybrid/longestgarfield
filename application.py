import os
import sys
import datetime

from flask import Flask, render_template, request, jsonify, redirect
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():

    with open('main.txt') as f:
        main = f.readlines()

    return render_template("index.html", main=main)



@socketio.on('new garfield')
def garfield(data):
    newText = data["newText"]

    with open("main.txt", 'a') as f:
        f.write(f'{newText}\n')

    emit('add garfield', {'newText': newText}, broadcast=True)


if __name__ == "__main__":
    socketio.run(app)

