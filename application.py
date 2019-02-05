import os
import sys
import datetime

from flask import Flask, render_template, request, jsonify, redirect
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

garfields = ["oh", "hello", "john"]

@app.route("/")
def index():
    return render_template("index.html", garfields=garfields)

@app.route("/clear", methods=["POST"])
def clear():
    garfields = []


@socketio.on('new garfield')
def garfield(data):
    newText = data["newText"]

    garfields.append(newText)

    emit('add garfield', {'newText': newText}, broadcast=True)


if __name__ == "__main__":
    socketio.run(app)

