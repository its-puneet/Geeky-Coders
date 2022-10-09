import random
import os
clear = lambda: os.system('cls')

def card_select():
    """Returns a random card from the deck."""
    cards = [11,2,3,4,5,6,7,8,9,10,10,10,10]
    return(random.choice(cards))

computer_card = []
user_card = []

for _ in range(2):
    computer_card.append(card_select())
    user_card.append(card_select())

def score_of(n):
    if sum(n) == 21 and len(n) == 2:
        return 0
    elif sum(n)>21 and (11 in n):
        return(sum(n) - 10)
    else:
        return(sum(n))

def compare(user_score, computer_score):
    if user_score == computer_score:
        return("It's a draw!")
    elif computer_score == 0:
        return("You lost! Opponent has a blackjack!")
    elif user_score == 0:
        return("You win with a blackjack!")
    elif user_score > 21:
        return("You went over, you lose!")
    elif computer_score > 21:
        return("Opponenet went over, you win!")
    elif user_score > computer_score:
        return("You win!")
    else:
        return("You lose!")
    
def game():
    start_game = True
    while start_game:
        c_score = score_of(computer_card)
        u_score = score_of(user_card)
        print(f"Your cards: {user_card}, current score: {u_score}")
        print(f"Computer's first card: {computer_card[0]}")

        if (c_score == u_score == 0) or c_score == 0 or u_score>21:
            print("You lose.")
            start_game = False
        else:
            another_card = input("Do you want to draw another card? Type Yes or No:  ")
            if another_card == "Yes":
                user_card.append(card_select())
                u_score = score_of(user_card)
            else:
                start_game = False
                break

    while c_score != 0 and c_score < 17:
        computer_card.append(card_select())
        c_score = score_of(computer_card)

    print(f"Your final hand: {user_card}, final score: {u_score}")
    print(f"Computer's final hand: {computer_card}, final score: {c_score}")
    print(compare(u_score, c_score))

game()

while input("Do you want to restart the game? Yes or No? ") == "Yes":
    clear()
    game()
