import tkinter as tk
from tkinter import *
from PIL import Image,ImageTk
from tkinter.filedialog import asksaveasfile 
from tkinter import font as tkFont
import cv2
import numpy as np
import face_recognition 
import os
from datetime import datetime
import time

#Window design----------------------------------------------------------------------------
root = Tk()
root.title('FaceSafe') #before name change------------------------------------------------
root.geometry('1500x860')
root.configure(bg="White")
Label(root, text="FaceSafe", font=("times new roman",30,"bold"), fg="MediumPurple", bg="White").place(x=650, y=0)
Label(root, text="Request permission from residents", font=("times new roman",18,"bold"), fg="MediumPurple", bg="White").place(x=950, y=88)
f1 = LabelFrame(root, bg= "MediumPurple") #frame for camera input
f1.place(x=14,y=113)
L1= Label(f1,bg="MediumPurple")
L1.pack() #displaying camera input---------------------------------------------------------

#variables--------------------------------------------------------------------------------
video_capture = cv2.VideoCapture(0)
Status = False
imgplay = True #toggle to safely quit camera-----------------------------------------------
Status_Label = StringVar()
Status_Label.set("Locked")


#Access Status----------------------------------------------------------
def Togglestatus():
    global Status
    global Status_Label
    Status = not Status
    if Status:
       Status_Label.set("Unlocked")
       root.update()
       countdown = 8
       while countdown > 0:
           countdown= countdown-1
           Label(root, text="Time Remaining: "+str(countdown), font=("times new roman",18,"bold"), fg="MediumPurple", bg="White").place(x=840,y=752)
           time.sleep(1)
           root.update()
       Togglestatus()
    else:
        Status_Label.set("Locked")
        





#exit button logic------------------------------------------------------
def exitbutton():
    global imgplay 
    imgplay = False
    video_capture.release()
    root.destroy()


#function to find encodings----------------------------------------------
def findEncodings(images):
    encodeList = []
    for img in images:
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        encode = face_recognition.face_encodings(img)[0]
        encodeList.append(encode)
    return encodeList
#--------------------------------------------------------------------------

#recog func-----------------------------------------------------------------
def facereg():
    
    global video_capture

    #Saving scanned image----------------------------------------------------
    savelog = Image.fromarray(img1)
    os.chdir("Access_attemps")
    time = str(datetime.now().today()).replace(":"," ")+".jpg"
    savelog.save(time)
    os.chdir("..")
    
    #carry on with face_recog------------------------------------------------
    path = 'faceimages'
    images = []
    classNames = []
    myList = os.listdir(path)
    print(myList)
    for cl in myList:
        curImg = cv2.imread(f'{path}/{cl}')
        images.append(curImg)
        imagename = os.path.splitext(cl)[0]
        imageextension = os.path.splitext(cl)[1].lower()
        classNames.append(imagename+imageextension)
    print(classNames)
    

    encodeListKnown = findEncodings(images)
    print('Encoding Complete')  

    face_locations = []
    face_encodings = []
    face_names = []
    process_this_frame = True



    
        # Grab a single frame of video
    ret, frame = video_capture.read()
    frame = cv2.flip(frame,1)

        # Resize frame of video to 1/4 size for faster face recognition processing
    small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

        # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
    rgb_small_frame = small_frame[:, :, ::-1]

        # Only process every other frame of video to save time
    if process_this_frame:
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            face_names = []
    for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(encodeListKnown, face_encoding)
                name = "Locked Unknown"

                # # If a match was found in known_face_encodings, just use the first one.
                # if True in matches:
                # Or instead, use the known face with the smallest distance to the new face
                face_distances = face_recognition.face_distance(encodeListKnown, face_encoding)
                best_match_index = np.argmin(face_distances)
                if matches[best_match_index]:
                    name = "Unlocked "+classNames[best_match_index]
                    Togglestatus()
                face_names.append(name)

    if not face_names:
        Label(root, text="No Face Found. Please Try again", font=("times new roman",18,"bold"), fg="Red", bg="White").place(x= 840,y=690)
    else:
        Label(root, text="                                                                             ", font=("times new roman",18,"bold"), fg="Red", bg="White").place(x= 840,y=690)





        # Display the results
    for (top, right, bottom, left), name in zip(face_locations, face_names):
            # Scale back up face locations since the frame we detected in was scaled to 1/4 size
            top *= 4
            right *= 4
            bottom *= 4
            left *= 4

            # Draw a box around the face
            cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

            # Draw a label with a name below the face
            cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
            font = cv2.FONT_HERSHEY_DUPLEX
            cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)

        # Display the resulting image
    cv2.imshow('Video', frame)


#recog func end-----------------------------------------------------------------------------------------------------  
            


 

#buttons-------------------------------------------------------------------------------------------------------------
Button(root, text="Scan",font=("times new roman",20,"bold"), fg="MediumPurple", bg="White", command= facereg).place(x=30,y=650)

Button(root, text="Exit",font=("times new roman",20,"bold"), fg="MediumPurple", bg="White", command= exitbutton).place(x=350,y=650)

Button(root, text="Request",font=("times new roman",20,"bold"), fg="MediumPurple", bg="White").place(x=1100,y=400)
#---------------------------------------------------------------------------------------------------------------------

#Request Form-----------------------------------------------------------------------------------------------------

Label_name= Label(root, text="Name:", font=("times new roman",18,"bold"), fg="MediumPurple", bg="White")
Label_name.place(x=884,y=168)
name_box = tk.Entry(root)
name_box.place(x=1005,y=168)
Label_house= Label(root, text="House #:", font=("times new roman",18,"bold"), fg="MediumPurple", bg="White")
Label_house.place(x=884,y=225)
house_box = tk.Entry(root)
house_box.place(x=1005,y=225)
Label_purpose=Label(root, text="Purpose:", font=("times new roman",18,"bold"), fg="MediumPurple", bg="White")
Label_purpose.place(x= 884,y=282)
purpose_box = tk.Entry(root)
purpose_box.place(x=1005,y=282)
Label_stat=Label(root, textvariable=Status_Label, font=("times new roman",18,"bold"), fg="MediumPurple", bg="White")
Label_stat.place(x= 840,y=660)

#image display logic------------------------------------------------------------------------------------------------
while imgplay:
    img = video_capture.read()[1]
    img = cv2.flip(img,1)
    img1 = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
    img = ImageTk.PhotoImage(Image.fromarray(img1))
    L1['image'] = img

    root.update()



root.mainloop()

