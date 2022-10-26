import cv2
import pickle
import cvzone
import numpy as np
from distutils.command.sdist import sdist
import tkinter
import tkinter.messagebox
from PIL import ImageTk, Image
print("This is SS MP")


import time

# Video feed
cap = cv2.VideoCapture('carPark.mp4')

with open('CarParkPos', 'rb') as f:
    posList = pickle.load(f)

width, height = 107, 48

# Creating window object
window = tkinter.Tk()
window.title("Parking lot")
label = tkinter.Label(window, text="This is the parking lot")
l1 = tkinter.Label(window, text="Parking Lot")
window.geometry('1000x900')
window.configure(bg='gray')
l1.grid(column=0, row=0)

# Importing Images
slot_empty = Image.open('green.png')
slot_empty = slot_empty.resize((80, 90), Image.ANTIALIAS)
my_img = ImageTk.PhotoImage(slot_empty)
slot_filled = Image.open('red.png')
slot_filled = slot_filled.resize((80, 90), Image.ANTIALIAS)
my_img2 = ImageTk.PhotoImage(slot_filled)
colour = "yellow"
#



def checkParkingSpace(imgPro):
    spaceCounter = 0
    idx=0
    global spacesOcupied
    spacesOcupied=set()
    for pos in posList:
        x, y = pos


        imgCrop = imgPro[y:y + height, x:x + width]
        # cv2.imshow(str(x * y), imgCrop)
        count = cv2.countNonZero(imgCrop)

        if count < 900:
            color = (0, 255, 0)
            thickness = 5
            spaceCounter += 1
            spacesOcupied.add(idx)
        else:
            color = (0, 0, 255)
            thickness = 2
            spacesOcupied.discard(idx)
        idx += 1
        cv2.rectangle(img, pos, (pos[0] + width, pos[1] + height), color, thickness)
        cvzone.putTextRect(img, str(count), (x, y + height - 3), scale=1,
                           thickness=2, offset=0, colorR=color)
    print(spacesOcupied)
    cvzone.putTextRect(img, f'Free: {spaceCounter}/{len(posList)}', (100, 50), scale=3,      ##### space count
                       thickness=5, offset=20, colorR=(0, 200, 0))


while True:
    if cap.get(cv2.CAP_PROP_POS_FRAMES) == cap.get(cv2.CAP_PROP_FRAME_COUNT): # when avideo end again it start
        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
    success, img = cap.read()
    imgGray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY) #fast convert image to binary image or gray
    imgBlur = cv2.GaussianBlur(imgGray, (3, 3), 1)
    imgThreshold = cv2.adaptiveThreshold(imgBlur, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, #binary image
                                         cv2.THRESH_BINARY_INV, 25, 16)
    imgMedian = cv2.medianBlur(imgThreshold, 5)
    kernel = np.ones((3, 3), np.uint8)
    imgDilate = cv2.dilate(imgMedian, kernel, iterations=1)

    checkParkingSpace(imgDilate)
    cv2.imshow("Image", img)
    # cv2.imshow("ImageBlur", imgBlur)
    # cv2.imshow("ImageThres", imgMedian)
    
    if cv2.waitKey(1) == 13:
        break



    
    count = 0
    bt = []

    for i in range(2, 10):
        if i == 4:
            l3 = tkinter.Label(window, bg="gray", text="Road")
            l3.grid(row=4)
            continue;
        if i == 7:
            l3 = tkinter.Label(window, bg="gray", text="Road")
            l3.grid(row=7)
            continue;

        for j in range(1, 13):
            temp = count + 1
            if temp in spacesOcupied:
                bt.append(tkinter.Button(window, text="Slot " + str(count + 1), image=my_img, compound='top',borderwidth=3,relief="solid"))
                bt[count].grid(column=j, row=i)
                count = count + 1
            else:
                bt.append(tkinter.Button(window, text="Slot " + str(count + 1), image=my_img2, compound='top',borderwidth=3,relief="solid"))
                bt[count].grid(column=j, row=i)
                count = count + 1
    # time.sleep(10)
window.mainloop()
cap.release()
cv2.destroyAllWindows()
