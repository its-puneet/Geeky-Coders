# PING PONG!
import pygame


BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
# Coordinates p1, p2 and ball
x1 = 490
y1 = 250
x2 = 0
y2 = 250
xb = 300
yb = 300

dbo = 'left'
dbv = 'down'

scorep1 = 0
scorep2 = 0

clock = pygame.time.Clock()
screen = pygame.display.set_mode((500, 500))
pygame.display.set_caption("PING PONG     " + "player 1 score :- " + str(scorep1) + "  -  player 2 score :- " + str(scorep2))
pygame.init()

def ball():
	"Draw the ball"
	global xb, yb
	pygame.draw.ellipse(screen, GREEN, (xb, yb, 10, 10))

def sprite1(x,y):
	"Draw Player 1"
	pygame.draw.rect(screen, RED, (x, y, 10, 100))

def sprite2(x,y):
	"Draw Player 2"
	pygame.draw.rect(screen, GREEN, (x, y, 10, 100))

def move_ball(x,y):
	"The ball moves"
	global xb, yb, dbo, dbv
	if dbo == "left":
		xb -= 10
	if dbv == 'down':
		yb += 10
		if yb > 490:
			dbv = 'up'
	if dbv == 'up':
		yb -= 10
		if yb < 10:
			dbv = 'down'
	if dbo == "right":
		xb += 10
	
def collision():
	global x1, y1 # the player 1 x and y (on the right)
	global x2, y2 # the player 2 x and y (on the left)
	global xb, yb # the ball x and y
	global dbo
	global scorep1, scorep2
	if dbo == "left":
		if xb < 10:
			if yb >= y2 and  yb < y2 + 50:
				dbo = "right"
			else:
				pygame.draw.ellipse(screen, BLACK, (xb, yb, 10, 10))
				pygame.display.update()
				xb, yb = 300, 300
				scorep2 += 10
				pygame.display.set_caption("PING PONG     " + "player 1 score :- " + str(scorep1) + "  -  player 2 score :- " + str(scorep2))
	else:
		if xb > 480:
			if yb >= y1 and  yb < y1 + 50:
				dbo = "left"		
			else:
				pygame.draw.ellipse(screen, BLACK, (xb, yb, 10, 10))
				pygame.display.update()
				xb, yb = 300, 300
				scorep1 += 10
				pygame.display.set_caption("PING PONG     " + "player 1 score :- " + str(scorep1) + "  -  player 2 score :- " + str(scorep2))



def move1():
	global y2
	if y2 <= 450:
		if keys[pygame.K_z]:
			y2 += 20
	if y2 > 0:
		if keys[pygame.K_a]:
			y2 -= 20

def move2():
	global y1
	if y1 <= 450:
		if keys[pygame.K_m]:
			y1 += 20
	if y1 > 0:
		if keys[pygame.K_k]:
			y1 -= 20

loop = 1
while loop:
	keys = pygame.key.get_pressed()
	for event in pygame.event.get():
		if event.type == pygame.QUIT:
			loop = 0
	move1()
	move2()
	move_ball(xb, yb)
	ball()
	sprite1(x1,y1)
	sprite2(x2,y2)
	collision()
	pygame.display.update()
	screen.fill((0, 0, 0))
	clock.tick(30)



pygame.quit()