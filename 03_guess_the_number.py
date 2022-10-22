# GUESS THE NUMBER

from random import random


import random

def guess_the_number(x):

    random_number = random.randint(1,x)
    guess = 0

    while guess != random_number:
        guess = int(input(f"Guess the number between 1 and {x}:\n"))

        if guess < random_number:
            print("Sorry, guess again. Too low.")
        elif guess > random_number:
            print("Sorry, guess agian. Too high.")
    
    print(f"Yay, congrats. You have guessed the {random_number} correctly!!")

guess_the_number(100)
