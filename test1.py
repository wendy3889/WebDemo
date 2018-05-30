# -*- coding: utf-8 -*-
"""
Created on Mon May 21 19:53:38 2018

@author: wendy
"""

from server import dataclean

text='"1234743;瑜伽垫|囤零食|苏州\r\n2343543;哪里|电力局\r\n2435678;小溪|政府\r\n3465766;国光大厦"'

print dataclean.pre_treat("1234743;瑜伽垫|囤零食|苏州\r\n2343543;哪里|电力局\r\n2435678;小溪|政府\r\n3465766;国光大厦")[1]