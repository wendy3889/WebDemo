# -*- coding: utf-8 -*-
"""
Created on Mon May 21 19:53:38 2018
@author: wendy
"""

from flask import Flask,request,Response,jsonify,render_template
import json
from urlparse import unquote

app = Flask(__name__)


@app.route('/')
def hello_world():
    return render_template('test.html')

@app.route('/flask/test', methods=['POST'])
def get_data():

    data2 = request.get_data('items')
    print unquote(data2).decode('utf8')
    #print request.form.get('items')
    return jsonify({'terms':data2})
    
    
    #return jsonify({'terms':terms})

if __name__ == '__main__':
    
    #app.config['JSON_AS_ASCII'] = False
    
    app.run(port='9999')