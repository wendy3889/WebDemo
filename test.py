# -*- coding: utf-8 -*-
"""
Created on Mon May 21 19:53:38 2018
@author: wendy
"""

from flask import Flask,request,Response,jsonify,render_template
import json

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

doing=[{"taskID" : 01,
        "taskDesc":"关键词输入",
        "taskTime":"2018-6-12"},
        {"taskID" : 02,
        "taskDesc":"号码输入",
        "taskTime":"2018-6-12"}]
        
done=[{"taskID" : 01,
        "taskDesc":"关键词输入",
        "taskStatus":"查看结果"},
        {"taskID" : 02,
        "taskDesc":"号码输入",
        "taskStatus":"任务出错"}]


@app.route('/')
def home(): 
    return render_template('layout.html')


@app.route('/pic')
def picweb():
    return render_template('person_idiom.html')  
    
@app.route('/gic')
def gicweb():
    return render_template('group_idiom.html') 
    
@app.route('/gcc')
def gccweb():
    return render_template('group_cluster.html')    
    
@app.route('/gic/api/doingtask',methods=['POST'])
def test():
    return json.dumps(doing)  
    

@app.route('/gic/api/donetask',methods=['POST']) 
def test2():
    return json.dumps(done) 


@app.route('/gias/pic/result', methods=['POST'])
def sent_data(): 
    #tels=request.get_json()["tel"]
    # print tels 
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