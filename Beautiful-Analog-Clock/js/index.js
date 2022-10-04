/*
##For Hours
12 Hours = 360deg
1 hours = 360/12 deg = 30 deg
H hours = H*30 deg

&& addition of minute
1 hours = 60 minute = 30 deg
1 minute = 1/2 deg
m minute = m/2 deg

&& addition of second
1 minute = 60 second = 1/2 deg
1 second = 1/120 deg
s second = s/120 deg

totalHour = 30*H + m/2 + s/120



##For Minutes
60 minute = 360 deg
1 minute = 6deg
M minute = M*6 deg

&&addition of second
1 minute = 60 seconds = 6deg
1 seconds = 1/10 deg
s second =s/10 deg

totalMinute = M*6 + s/10




##For Second
60 second = 360 deg
1 second = 6 deg
s second =s*6 deg

totalSecond = s*6 deg


*/

onload=()=>{
setInterval(()=>{
var d= new Date();
tHour =d.getHours();
tMin = d.getMinutes();
tSec = d.getSeconds();


hRotate = 30*tHour + tMin/2 + tSec/120;
mRotate = tMin*6 + tSec/10;
sRotate = tSec*6;
rotate=(elm,deg)=>{elm.style.transform=`rotateZ(${deg}deg)`};

rotate(hour,hRotate);
rotate(minute,mRotate);
rotate(second,sRotate);
if(tHour<10){
  tHour="0"+tHour
}
if(tMin<10){
  tMin="0"+tMin
}
if(tSec<10){
  tSec="0"+tSec
}

document.querySelector(".hour").innerHTML = tHour +" :"
document.querySelector(".minute").innerHTML = tMin+" :"
document.querySelector(".second").innerHTML = tSec
},1000);
};