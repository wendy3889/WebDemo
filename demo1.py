# -*- coding: utf-8 -*-
"""
Created on Thu May 24 11:03:26 2018

@author: wendy
"""

from flask import Flask,request,Response,jsonify,render_template

from urlparse import unquote

app = Flask(__name__)

@app.route('/')
def layout():
    return render_template('layout.html')
    
    

@app.route('/demo1', methods=['GET']) 
def demo1():
    return render_template('demo1.html')
    
    
    
@app.route('/demo1/sendfile', methods=['POST'])
def get_data():

    data2 = request.get_data('terms')
    print unquote(data2).decode('utf8')

    
    return jsonify({'terms':data2})
    
    
if __name__ == '__main__':
    app.debug=True
    app.config['JSON_AS_ASCII'] = False
    app.run()   
  