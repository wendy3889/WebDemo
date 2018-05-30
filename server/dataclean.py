# -*- coding: utf-8 -*-
"""
Created on Thu May 24 15:54:40 2018

@author: wendy
"""



def pre_treat(text):
    input_tels = []
    input_txts = []
    text=text.replace('"','')
    seg = text.split('\n')
    for item in seg:
        item = item.split(';')
        input_tels.append(item[0])
        input_txts.append(item[1])        
    return input_tels,input_txts
    
    
    
    
    
    
    
if __name__ == '__main__':
    text='"1234743;瑜伽垫|囤零食|苏州\r\n2343543;哪里|电力局\r\n2435678;小溪|政府\r\n3465766;国光大厦"'
    input_tels=pre_treat(text)[0]
    input_txts=pre_treat(text)[1]
    print input_tels
    print input_txts

