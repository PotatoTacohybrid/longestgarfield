import os
import sys
import datetime

from flask import Flask, render_template, request, jsonify, redirect
from flask_socketio import SocketIO, emit
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

engine = create_engine(os.environ.get('DATABASE_URL'))
db = scoped_session(sessionmaker(bind=engine))

@app.route("/")
def index():

    main = db.execute("SELECT * FROM texts").fetchall()

    return render_template("index.html", main=main)



@socketio.on('new garfield')
def garfield(data):
    newText = data["newText"]

    db.execute("INSERT INTO texts (text) VALUES (:text)", {"text": newText})
    db.commit()

    emit('add garfield', {'newText': newText}, broadcast=True)


if __name__ == "__main__":
    socketio.run(app)

