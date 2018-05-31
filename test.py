# -*- coding: utf-8 -*-
"""
Created on Mon May 21 19:53:38 2018
@author: wendy
"""

from flask import Flask,request,Response,jsonify,render_template
import json
from urlparse import unquote
from datetime import datetime

app = Flask(__name__)


BookInfo = [{  
        "ID": 1,  
        "tel" : 13777723888,  
        "keyWords" : "清华大学出版社",  
        "date" :" 2017-8-15",  
          
    },
    {  
        "ID" : 2,  
        "tel" : 13777723887,  
          
        "keyWords" : "清华大学出版社",  
        "date" : "2015-9-28",  
         
    },
    {  
        "ID" : 3,  
        "tel" : 13777723886,  
        "keyWords" : "机械工业出版社",  
        "date" :" 2014-10-8",  
        
    },
    {  
        "ID" : 4,  
        "tel" : 13777723883,  
          
        "keyWords" : "清华大学出版社",  
        "date" : "2015-9-28",  
         
    },
    {  
        "ID" : 5,  
        "tel" : 13777723882,  
          
        "keyWords" : "机械工业出版社",  
        "date" :" 2014-10-8",  
         
    },
    {  
        "ID" : 6,  
        "tel" : 12347589762,  
         
        "keyWords" : "清华大学出版社",  
        "date" : "2015-9-28",  
        
    },
    {  
        "ID" : 7,  
        "tel" : 16257547828,  
        "Author" : "秦靖",  
        "keyWords" : "机械工业出版社",  
        "date" :" 2014-10-8",  
        "Price" : 38.55  
    },
    {  
        "ID" : 8,  
        "tel" : 16257547829,    
        "keyWords" : "清华大学出版社",  
        "date" : "2015-9-28",  
       
    },
    {  
        "ID" : 9,  
        "tel" : 16257547834,   
        "keyWords" : "机械工业出版社",  
        "date" :" 2014-10-8",  
          
    }]

@app.route('/')
def hello_world():
    return render_template('person_idiom.html')
    
@app.route('/flask/test',methods=['POST'])
def test():
    data=request.get_data()
    print data 
    return jsonify({"words":data})  
    

@app.route('/gias/pic/result', methods=['POST'])
def sent_data():    
    pageSize=request.get_json()["pageSize"]
      
    pageIndex=request.get_json()["pageIndex"] 

    
    start=(pageIndex-1)*pageSize
    end=pageIndex*pageSize
    return json.dumps({"total":len(BookInfo),"rows":BookInfo[start:end]}) 
    
    
    #return jsonify({'terms':terms})
 
if __name__ == '__main__':  
       
    #app.config['JSON_AS_ASCII'] = False
    app.debug=True
    app.run()