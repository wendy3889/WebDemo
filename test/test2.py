# -*- coding: utf-8 -*-
"""
Created on Mon May 21 19:55:09 2018

@author: wendy
"""

import requests,json

user_info={'name':'letian'}
headers={'content-type':'application/json'}
r = requests.post("http://127.0.0.1:5000/json",data = json.dumps(user_info),headers=headers)
print r.headers
print r.json()