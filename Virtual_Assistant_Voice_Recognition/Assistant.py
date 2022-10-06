import os
import pyttsx3
import webbrowser
import speech_recognition as sr

def get():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("How can I help you? ")
        audio = r.listen(source)
        print("done!")
    try:
        ch = r.recognize_google(audio).lower()
        print("You said : "+ ch)
        return ch
    except Exception as e:
        print(e)

print("Hello Keerthana Pravallika ! , This is your Personal Assistant  \'Pandu\'")
pyttsx3.speak("Hello Keerthana pravallika , This is your Personal Assistant Pandu")
print("If you want to stop this program just enter \'stop\'")

pyttsx3.speak("How can I help you ")
ch = get()

while(True):   
    
    if(("notepad" in ch or "editor" in ch or "text editor" in ch or "write" in ch ) and ("not" not in ch)):
        pyttsx3.speak("Opening Notepad")
        os.system("notepad")
    elif(("browse" in ch or "google" in ch or "search" in ch or "chrome" in ch or "net" in ch or "internet" in ch) and ("not" not in ch)):
        pyttsx3.speak("Opening Chrome")
        os.system("chrome")
    elif(("message" in ch or "whatsapp" in ch or "text" in ch or "ping" in ch or "call" in ch) and ("not" not in ch)):
        pyttsx3.speak("Opening Whatsapp")
        webbrowser.open("whatsapp.com")
    elif(("youtube" in ch or "you tube" in ch)  and ("not" not in ch) ):
        pyttsx3.speak("Opening you tube")
        webbrowser.open("youtube.com")
    elif("twitter" in ch  and ("not" not in ch)):
        pyttsx3.speak("Opening Twitter")
        webbrowser.open("twitter.com")
    elif("facebook" in ch  and ("not" not in ch)):
        pyttsx3.speak("Opening Facebook")
        webbrowser.open("facebook.com")
    elif("linkedin" in ch  and ("not" not in ch)):
        pyttsx3.speak("Opening Linkedin")
        webbrowser.open("linkedin.com")
    elif("mail" in ch  and ("not" not in ch)):
        pyttsx3.speak("Opening Gmail")
        webbrowser.open("gmail.com")
    elif(("media" in ch or "player" in ch or "wmplayer" in ch ) and ("not" not in ch)):
        pyttsx3.speak("Opening Windows media player")
        os.system("wmplayer")
    elif(("calculate" in ch or "calculator" in ch or "calculations" in ch) and ("not" not in ch)):
        pyttsx3.speak("Opening Calculator")
        os.system("calc.exe")
    elif(("paint" in ch or "draw" in ch or "sketch" in ch) and ("not" not in ch)):
        pyttsx3.speak("Opening Paint")
        os.system("mspaint.exe")
    elif("thank" in ch ):
         pyttsx3.speak("You are welcome")
         print("You are welcome :)")
    elif("help" in ch):
        pyttsx3.speak("I can open Notepad , Google , Windows Media player , You tube , Gmail , Linkedin , Facebook , Twitter ,  Calculator , Paint and Whatsapp")
        print("Notepad")
        print("Google")
        print("Windows Media Player")
        print("You Tube")
        print("Gmail")
        print("Linkedin")
        print("Facebook")
        print("Twitter")
        print("Calculator")
        print("Paint")
        print("Whatsapp")
    
    elif("do not" in ch):
        print("Okay!")
        pyttsx3.speak("Fine")
    else:
        pyttsx3.speak("Sorry, I could not understand. Once say help to see whether the command is there or not ")
        print("Sorry, I could not understand. Once say help to see whether the command is there or not")
    
    pyttsx3.speak("How else can I help you")
    ch = get()
    if("stop" in ch):
        pyttsx3.speak("Thank you , Have a nice day")
        print("Thank you , Have a Nice day !")
        break
