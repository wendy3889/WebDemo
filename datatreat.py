# -*- coding: utf-8 -*-
"""
Created on Thu Jun 21 19:01:45 2018

@author: wendy
"""

from collections import Counter
import json

def graph(): 
    links=[]
    nodes=[]
    nodecp=[]
    with open(r'D:\wendy\web\myfirstweb\shebo.txt') as f:
        lines = f.readlines()
        for line in lines:
            items=line.split(' ')
            dic1={"source":items[0],"target":items[1],"value":items[2]}
            links.append(dic1)
            
            if items[0] not in nodecp:
                nodecp.append(items[0])
                dic2={"name":items[0],"category":"1"}
                nodes.append(dic2)
            if items[1] not in nodecp:
                nodecp.append(items[1])
                dic3={"name":items[1],"symbolSize":35,"category":"2"}
                nodes.append(dic3)
    print(nodes)
#    return json.dumps({"nodes":nodes,"links":links})
    
    
def colorTreat(weigt):
    #以关键词节点颜色为基准渐变
    rgb=[121,130,101]
    r=97
    g=160
    b=180
    #a表示不透明度
    a=weigt
    str='rgba(%d,%d,%d,%f)'%(rgb[0],rgb[1],rgb[2],a)
    return str
    
    
            
if __name__ == '__main__':
   print colorTreat(0.5)
