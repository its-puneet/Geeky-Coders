import random
def hangman():
    print("hello world")

    list_of_words = ["balenciaga","prada","jimmychoo","gucci","tommy","armanni","louisvuitton","zara","calvinklein","vanheusen"]
    
    word=random.choice(list_of_words)
      


    turns=10
    guessmade=''
    a=set('abcdefghijklmnopqrstuvwxyz')

    while len(word)>0:
        main_word=" "

        for letter in word:
            if letter in guessmade:
                main_word = main_word + letter
            else:
                main_word = main_word + "_ "

        if main_word == word:
            print(main_word)
            print("You guessed the word correctly!!!!!!YOU WON")
            break


        
        print("guess word,",main_word)
        guess=input()
        

        if guess in a:
            guessmade=guessmade+guess
        else:
            print("Enter Valid Character")
            guess=input()

        if guess not in word:
            turns=turns-1

            if turns==9:
                print("9 turns left!!!!")
                print("------------------")
            if turns==8:
                print("8 turns left!!!!")
                print("------------------")
                print("        O          ")
            if turns==7:
                print("7 turns left!!!!")
                print("------------------")
                print("        O         ")
                print("        |         ")
            if turns==6:
                print("6 turns left!!!!")
                print("------------------")
                print("        O         ")
                print("        |         ")
                print("       /          ")
            if turns==5:
                print("5 turns left!!!!")
                print("------------------")
                print("        O         ")
                print("        |         ")
                print("       / \         ")
            if turns==4:
                print("4 turns left!!!!")
                print("------------------")
                print("       \O         ")
                print("        |         ")
                print("       / \         ")
            if turns==3:
                print("3 turns left!!!!")
                print("------------------")
                print("       \O/         ")
                print("        |         ")
                print("       / \         ")
            if turns==2:
                print("2 turns left!!!!")
                print("------------------")
                print("       \O/  |        ")
                print("        |         ")
                print("       / \         ")
            if turns==1:
                print("1 turn left!!!!")
                print("Hangman on last breaths")
                print("------------------")
                print("       \O/|         ")
                print("        |         ")
                print("       / \         ")
            if turns==0:
                print("0 turn left!!!!")
                print("Your Hangman is dead now")
                print("------------------")
                print("        O_|         ")
                print("       /|\         ")
                print("       / \         ")
                break
            
                
name=input("Enter Your Name")
print("Welcome",name,"to this game of Hangman")
print("-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-")
print("Try Guessing the word in less than 10 Attempts!")
print("  *   *  ")
print("    ^    ")
print("  ------ ")
hangman()
