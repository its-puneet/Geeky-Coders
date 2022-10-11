var random_no = Math.floor(Math.random() * 6) + 1;

var random_dice="dice"+ random_no + ".png";

var img_source="dice_images/"+ random_dice;

document.querySelectorAll("img")[0].setAttribute("src",img_source);

var random_no2 = Math.floor(Math.random() * 6) + 1;

var random_dice2="dice"+ random_no2 + ".png";

var img_source2="dice_images/"+ random_dice2;

document.querySelectorAll("img")[0].setAttribute("src",img_source2);


