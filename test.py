"""from flask import Flask, request, render_template,jsonify

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def home():
    return render_template('hometest.html')

@app.route('/signin', methods=['GET'])
def signin_form():
    return render_template('form.html')

@app.route('/signin', methods=['POST'])
def signin():
    username = request.form['username']
    password = request.form['password']
    if username=='admin' and password=='password':
        return render_template('login.html', username=username)
    return render_template('form.html', message='Bad username or password', username=username)



@app.route('/', methods=['GET'])
def home():
    return render_template('home.html')
    
@app.route('/', methods=['POST'])
def copy():
    
    print request.get_json()
    text=request.get_json()
    return render_template('test.html',input=text)
    
    #text1 = request.form['text']
    #return render_template('test.html',text=text1)




if __name__ == '__main__':
    
    app.run(port='9999')
    
"""
    
 # -*- coding: utf-8 -*-
"""
Created on Mon May 21 19:53:38 2018

@author: wendy
"""

from flask import Flask,request,Response,jsonify,render_template
import json

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('hometest.html')
    
    
    
terms = [
    {
        'id': 100,
        'terms': '吸毒 溜冰 很嗨'
    },
    {
        'id': 2,
        'terms': '炸弹 爆破 制作炸弹'
    }
]


@app.route('/gta/api/terms', methods=['GET','post'])
def get_terms():
    #return json.dumps({'terms':terms},ensure_ascii=False)
    return jsonify({'terms':terms})

if __name__ == '__main__':
    
    app.config['JSON_AS_ASCII'] = False

    
    app.run(port='9999')   
    
