# -*- coding: utf-8 -*-
"""
Created on Mon May 21 19:53:38 2018

@author: wendy
"""
from flask import Flask,request,Response,jsonify,render_template
import json

from datetime import datetime

app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('test.html')
    
if __name__ == '__main__':  
       
    #app.config['JSON_AS_ASCII'] = False
    app.debug=True
    app.run()