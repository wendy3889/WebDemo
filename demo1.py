# -*- coding: utf-8 -*-
"""
Created on Thu May 24 11:03:26 2018

@author: wendy
"""

from flask import Flask,request,Response,jsonify,render_template
import json
from urlparse import unquote
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

from server import dataclean

app = Flask(__name__)

@app.route('/')
def layout():
    return render_template('demo1.html')
    
    

@app.route('/demo1', methods=['GET']) 
def demo1():
    return render_template('demo1.html')
      
    
@app.route('/demo1/sendfile', methods=['POST'])
def get_data():
    rev_data = json.loads(request.get_data('terms'))  
    sent_data = {} 
    sent_data['input_tels']=dataclean.pre_treat(rev_data)[0]
    sent_data['input_txts']=dataclean.pre_treat(rev_data)[1]
    return json.dumps(sent_data,ensure_ascii=False)
    
    
    
    
    
@app.route('/demo3', methods=['GET'])    
def demo3():
    return render_template('demo3.html') 
    
    
@app.route('/demo3/sendfile', methods=['POST'])
def get_result():
    data2 = request.get_data('terms')
    print unquote(data2).decode('utf8')
    return jsonify({'terms':data2})
    

    
    
if __name__ == '__main__':
    app.debug=True
    app.config['JSON_AS_ASCII'] = False
    app.run()   
  