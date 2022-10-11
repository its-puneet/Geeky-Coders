# -*- coding: utf-8 -*-
"""
Created on Sun Apr 26 14:27:17 2020

@author: Dharani

"""
from flask import Flask, render_template, request
from keras.models import load_model
import numpy as np
global model,graph
import tensorflow as tf
# load the pre-trained Keras model

model = load_model('kidney_disease.h5')
graph = tf.get_default_graph()

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('final.html')


@app.route('/age')
@app.route('/', methods=['GET','POST'])
def form_post():
    a = request.form['age']
    b= request.form['bp']
    c = request.form['sg']
    d = request.form['al']
    e = request.form['bgr']
    f= request.form['bu']
    g = request.form['sc']
    h = request.form['sod']
    i = request.form['su']
    j= request.form['pot']
    k = request.form['hemo']
    l = request.form['pcv']
    m = request.form['wc']
    n= request.form['rc']
    o = request.form['rbc']
    if (o == "abnormal"):
        o1 = 0
    else:
        o1 = 1
    p = request.form['pc']
    if (p == "abnormal"):
        p1 = 0
    else:
        p1 = 1
    q = request.form['pcc']
    if (q == "notpresent"):
        q1 = 0
    else:
        q1 = 1
    r= request.form['ba']
    if (r == "notpresent"):
        r1 = 0
    else:
        r1 = 1
    s = request.form['htn']
    if (s == "no"):
        s1 = 0
    else:
        s1 = 1
    t = request.form['dm']
    if (t == "no"):
        t1 = 0
    else:
        t1 = 1
    u = request.form['cad']
    if (u == "no"):
        u1 = 0
    else:
        u1 = 1
    v= request.form['appet']
    if (v == "good"):
        v1 = 0
    else:
        v1 = 1
    w = request.form['pe']
    if (w == "no"):
        w1 = 0
    else:
        w1 = 1
    x = request.form['ane']
    if (x == "no"):
        x1 = 0
    else:
        x1 = 1

        
    total = [[a,b,c,d,i,o1,p1,q1,r1,e,f,g,h,j,k,l,m,n,s1,t1,u1,v1,w1,x1]]
    print(total)
    with graph.as_default():
        y_pred = model.predict(np.array(total))
    return render_template('final.html',ypred = str(y_pred[0][0]))
    
if __name__ == '__main__':
    app.run(host='localhost', debug=True, threaded=False)
    
