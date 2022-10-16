import cv2 as cv
import mediapipe as mp
import time
import os
import Hand_Tracking_Module as htm
import numpy as np

cap=cv.VideoCapture(0)
cap.set(3,1280)
cap.set(4,720)


detector=htm.handDetector(detectionCon=0.60)

pTime=0
cTime=0

color=(255,0,255)
xp=0
yp=0
brushThickness = 10
eraserThickness = 100
imgCanvas = np.zeros((720, 1280, 3), np.uint8)


folderPath ="E:\Machine Learning\OPEN_CV_ADVANCED\Virtual_AI"
myList = os.listdir(folderPath)
print(myList)
overlayList = []
for imPath in myList:
    image = cv.imread(f'{folderPath}/{imPath}')               
    overlayList.append(image)
print(len(overlayList))
header = overlayList[0]



while True:
    success,img=cap.read()
    img=cv.flip(img,1)
    img=detector.findHands(img,)
    lmList,bbox=detector.findPosition(img,draw=False)
    
    if len(lmList)!=0:
        #print(lmList)
        
        x1,y1=lmList[8][1:]
        x2,y2=lmList[12][1:]

        fingers=detector.fingersUp()
        #print(fingers)
        
        if fingers[1] and fingers[2]:
            xp=0
            yp=0
            print("slection Mode")
            if y1<125:
                if 200<x1<450:
                    header=overlayList[0]
                    color=(255,0,255)
                elif 500<x1<600:
                    header=overlayList[1]
                    color=(0,0,255)
                elif 700<x1<850:
                    header=overlayList[2]
                    color=(255,0,0)
                elif 860<x1<1050:
                    header=overlayList[3]
                    color=(0,0,0)
            cv.rectangle(img,(x1,y1),(x2,y2),color,cv.FILLED)
        
        
        if fingers[1] and fingers[2]==False:
            cv.circle(img,(x1,y1),15,color,cv.FILLED)
            print("Drawing Mode")
            
            if xp==0 and yp==0:
                xp,yp=x1,y1
            
            if color==(0,0,0):
                cv.line(img,(xp,yp),(x1,y1),color,eraserThickness)
                cv.line(imgCanvas,(xp,yp),(x1,y1),color,eraserThickness)
            else:
                cv.line(img,(xp,yp),(x1,y1),color,brushThickness)
                cv.line(imgCanvas,(xp,yp),(x1,y1),color,brushThickness)
            
            xp=x1
            yp=y1
            
    imgGray=cv.cvtColor(imgCanvas,cv.COLOR_BGR2GRAY)
    _,imgInv=cv.threshold(imgGray,50,255,cv.THRESH_BINARY_INV)
    imgInv = cv.cvtColor(imgInv,cv.COLOR_GRAY2BGR)
    img = cv.bitwise_and(img,imgInv)
    img = cv.bitwise_or(img,imgCanvas)
    
            
    
    #SETTING HEADER IMAGE
    img[0:125, 0:1280] = header
    cv.imshow('image',img)
    cv.imshow('canvas',imgCanvas)
    cv.waitKey(1)
