# ADD NEW ALIEN SCRIPT:
# RUN THIS SCRIPT IN ANY PYTHON COMPILER FOR ADD NEW ALIEN DATA INTO THE WEBPAGE:

alien_name: str = input("Enter Alien Name With Serial: ")
img_link: str = input("Enter Link To The Image: ")
power: str = input("Enter Power: ")
rating: str = input("Enter Rating: ")
print("Copy The String And Paste: ")
print("<h3 align='center' style='background-color: darkgreen;color: yellow'>"+alien_name+"</h3>")
print("<img src='"+img_link+"' style='height: 300px;width: 300px'>")
print("<p style=' background-color: yellow;color: black'>POWER: "+power+"| RATING: "+rating+"</p><br>")
