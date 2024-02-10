from tkinter import *  
import time
import threading
import random

root=Tk()
root.title("Snake Game")
root.geometry("400x400")

moveDir="R"
preMoveDir="R"
N=8
pointsX=[80,70,60,50,40,30,20,10]
pointsY=[20,20,20,20,20,20,20,20]

#Score Labels
Label(root,text="Score",font=("Arial",13),foreground='green').place(x=290,y=0)
pointsLabel=Label(root,text="0",font=("Arial",13),foreground='green')
pointsLabel=Label(root,text="0",font=("Arial",13),foreground='green')
pointsLabel.place(x=350,y=0)

#Get Random Position for Points
def get_random_position():
    x=random.randint(10,390)#23
    y=random.randint(20,390)
    x=x-(x%10)
    y=y-(y%10)
    return (x,y)
    
#Points
newPoint=Canvas(root,width=5, height=5,bg='green')
X,Y=get_random_position()
newPoint.place(x=X,y=Y)

labels=[]
for x in range(N):
    lbl=Canvas(root,width=5, height=5,bg='red')
    labels.append(lbl)
    
flag=True
def move_points():
    global flag
    global X
    global Y
    global N
    global newPoint
    global preMoveDir
    global moveDir
    global pointsLabel
    while flag:
        global pointsX
        global pointsY
        if moveDir=="R" and preMoveDir!="L":
            for i in range(N-1,0,-1):
               pointsX[i]=pointsX[i-1]
               pointsY[i]=pointsY[i-1]
            pointsX[0]+=10
            if(pointsX[0]>400):
                pointsX[0]=10
            preMoveDir=moveDir
        elif moveDir=="L" and preMoveDir!="R":
            for i in range(N-1,0,-1):
               pointsX[i]=pointsX[i-1]
               pointsY[i]=pointsY[i-1]
            pointsX[0]-=10
            if(pointsX[0]<10):
                pointsX[0]=400
            preMoveDir=moveDir
        elif moveDir=="U" and preMoveDir!="D":
            for i in range(N-1,0,-1):
               pointsX[i]=pointsX[i-1]
               pointsY[i]=pointsY[i-1]
            pointsY[0]-=10
            if(pointsY[0]<20):
                pointsY[0]=400
            preMoveDir=moveDir
        elif moveDir=="D" and preMoveDir!="U":
            for i in range(N-1,0,-1):
               pointsX[i]=pointsX[i-1]
               pointsY[i]=pointsY[i-1]
            pointsY[0]+=10
            if(pointsY[0]>400):
                pointsY[0]=10
            preMoveDir=moveDir
        else:
            moveDir=preMoveDir

        if (pointsX[0],pointsY[0]) in zip(pointsX[1:],pointsY[1:]):
            flag=False
            Label(root,text="Out!!!",font=("Arial",20),foreground='red').place(x=180,y=180)
            
        if X==pointsX[0] and Y==pointsY[0]:
            lbl=Canvas(root,width=5, height=5,bg='red')
            labels.append(lbl)
            X,Y=get_random_position()
            newPoint.place(x=X,y=Y)
            pointsX.append(0)
            pointsY.append(0)
            p=str(int(pointsLabel.cget("text"))+5)
            pointsLabel.config(text=p)
            N+=1

        try:        
            for lbl,PX,PY in zip(labels,pointsX,pointsY):
                lbl.place(x=PX,y=PY)
            root.update()
        except Exception as e:
            print(e)
        time.sleep(0.05)
        
thread=threading.Thread(target=move_points)
stop=threading.Event()
thread.setDaemon(True)
thread.start()

def up_fun(event):
    global moveDir
    moveDir="U"
    
def down_fun(event):
    global moveDir
    moveDir="D"
    
def left_fun(event):
    global moveDir
    moveDir="L"

def right_fun(event):
    global moveDir
    moveDir="R"

def on_closing():
    global stop
    global flag
    flag=False
    stop.set()
    root.destroy()
    
root.protocol("WM_DELETE_WINDOW", on_closing)
root.bind('<Up>', up_fun)
root.bind('<Down>', down_fun)
root.bind('<Left>', left_fun)
root.bind('<Right>', right_fun)

root.mainloop()