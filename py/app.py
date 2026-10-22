from flask import Flask, render_template, redirect 

#these two global vars correspond to application state 
BOARD = [0] * 9 # 1-d representation of board
NEXT = 1 # 1=X , -1=O

app = Flask(__name__, static_folder = 'assets', template_folder = 'templates')

@app.route('/')
def homepage():
    return render_template("tic.html", board = BOARD, next = NEXT)


