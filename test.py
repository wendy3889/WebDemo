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
        
done=[{"taskID" : "124234346",
        "taskDesc":"关键词输入",
        "taskStatus":"failed"},
        {"taskID" : "133565465",
        "taskDesc":"关键词输入",
        "taskStatus":"done"},
        {"taskID" : "133565466",
        "taskDesc":"号码输入",
        "taskStatus":"done"}]
        
        
wordresultarr=[{
                   "ID":1,
                   "tel":"1342",
                   "words":"不知道"
                   },{
                   "ID":2,
                   "tel":"1342",
                   "words":"不知道"
                   },{
                   "ID":3,
                   "tel":"1342",
                   "words":"不知道"
                   },{
                   "ID":4,
                   "tel":"1342",
                   "words":"不知道"
                   }]
                   
                   
telresultarr=[{
                   "ID":1,
                   "words":"不知道"
                   },
                   {
                   "ID":2,
                   "words":"不知道"
                   },
                   {
                   "ID":3,
                   "words":"不知道"
                   }]
                   
                   
tel1=[{
                   "ID":1,
                   "tel":12345436555
                   },
                   {
                   "ID":2,
                   "tel":12345433464
                   },
                   {
                   "ID":3,
                   "tel":12345435637
                   },
                   ]


@app.route('/')
def home(): 
    return render_template('layout.html')

@app.route('/layout/donetask')
def get_done_num(): 
    
    return json.dumps({"gic_done_num":"+1","gcc_done_num":"+2","ric_done_num":"+2"})


@app.route('/pic')
def picweb():
    return render_template('person_idiom.html')  
    
@app.route('/gic')
def gicweb():
    return render_template('group_idiom.html') 
    
@app.route('/gcc')
def gccweb():
    return render_template('group_cluster.html')    
    
@app.route('/gic/doingtask',methods=['POST'])
def gic_doingtask():
    return json.dumps(doing)  
    

@app.route('/gic/donetask',methods=['POST']) 
def gic_donetask():
    return json.dumps(done) 
    
@app.route('/gcc/doingtask',methods=['POST'])
def gcc_doingtask():
    return json.dumps(doing)      

@app.route('/gcc/donetask',methods=['POST']) 
def gcc_donetask():
    return json.dumps(done) 
    
    
@app.route('/gic/word/task',methods=['POST']) 
def get_gic_word_task():
    
    return json.dumps({"flag": "success"}) 
    
@app.route('/gic/tel/task',methods=['POST']) 
def get_gic_tel_task():
    
    return json.dumps({"flag": "success"})
    
    
@app.route('/gcc/word/task',methods=['POST']) 
def get_gcc_word_task():
    
    return json.dumps({"flag": "success"}) 
    
@app.route('/gcc/tel/task',methods=['POST']) 
def get_gcc_tel_task():
    
    return json.dumps({"flag": "success"})
    



@app.route('/gias/pic/result', methods=['POST'])
def sent_data(): 
    #tels=request.get_json()["tel"]
    # print tels 
    pageSize=request.get_json()["pageSize"]
      
    pageIndex=request.get_json()["pageIndex"] 
  
    
    start=(pageIndex-1)*pageSize
    end=pageIndex*pageSize
    return json.dumps({"total":len(BookInfo),"rows":BookInfo[start:end]}) 
    
#群体惯用语页面表格    
@app.route('/gic/teltask/result/133565466', methods=['POST'])
def wordresult(): 
    #tels=request.get_json()["tel"]
    # print tels 
    pageSize=request.get_json()["pageSize"]
      
    pageIndex=request.get_json()["pageIndex"] 
  
    
    start=(pageIndex-1)*pageSize
    end=pageIndex*pageSize
    return json.dumps({"total":len(telresultarr),"rows":telresultarr[start:end]})

@app.route('/gic/wordtask/result/133565465', methods=['POST'])
def telresult(): 
    #tels=request.get_json()["tel"]
    # print tels 
    pageSize=request.get_json()["pageSize"]
      
    pageIndex=request.get_json()["pageIndex"] 
  
    
    start=(pageIndex-1)*pageSize
    end=pageIndex*pageSize
    return json.dumps({"total":len(wordresultarr),"rows":wordresultarr[start:end]})    
    
    #return jsonify({'terms':terms})

#群体聚类    
@app.route('/gcc/wordtask/result/word/133565465', methods=['POST'])
def gccwordresult1(): 
    #tels=request.get_json()["tel"]
    # print tels 
    pageSize=request.get_json()["pageSize"]
      
    pageIndex=request.get_json()["pageIndex"] 
  
    
    start=(pageIndex-1)*pageSize
    end=pageIndex*pageSize
    return json.dumps({"total":len(telresultarr),"rows":telresultarr[start:end]})

@app.route('/gcc/wordtask/result/tel/133565465', methods=['POST'])
def gccwordresult2(): 
    #tels=request.get_json()["tel"]
    # print tels 
    pageSize=request.get_json()["pageSize"]
      
    pageIndex=request.get_json()["pageIndex"] 
  
    
    start=(pageIndex-1)*pageSize
    end=pageIndex*pageSize
    return json.dumps({"total":len(tel1),"rows":tel1[start:end]}) 
    
    
@app.route('/gcc/teltask/result/tel/133565466', methods=['POST'])
def gcctelresult1(): 
    #tels=request.get_json()["tel"]
    # print tels 
    pageSize=request.get_json()["pageSize"]
      
    pageIndex=request.get_json()["pageIndex"] 
  
    
    start=(pageIndex-1)*pageSize
    end=pageIndex*pageSize
    return json.dumps({"total":len(tel1),"rows":tel1[start:end]})

@app.route('/gcc/teltask/result/word/133565466', methods=['POST'])
def gcctelresult2(): 
    #tels=request.get_json()["tel"]
    # print tels 
    pageSize=request.get_json()["pageSize"]
      
    pageIndex=request.get_json()["pageIndex"] 
  
    
    start=(pageIndex-1)*pageSize
    end=pageIndex*pageSize
    return json.dumps({"total":len(wordresultarr),"rows":wordresultarr[start:end]})
    
 
if __name__ == '__main__':  
       
    #app.config['JSON_AS_ASCII'] = False
    app.debug=True
    app.run()