const colors=document.getElementsByClassName('theme-button');

let i;
for(i=0;i<colors.length ;i++){
    colors[i].addEventListener('click',changecolor );
}

function changecolor(){

  let color = this.getAttribute('data-color');
  document.documentElement.style.setProperty('--dark', color);

  let chng = this.getAttribute('data-color-light');
  document.documentElement.style.setProperty('--light', chng);

  let fill= this.getAttribute('data-fill');
  document.documentElement.style.setProperty('--fill1',fill)
}

let btn1 = document.querySelector('#btn-1');
let btn2 = document.querySelector('#btn-2');

btn1.addEventListener('click', () => {
  var div = document.getElementById('change');
  var news = document.getElementById("news");
  var review = document.getElementById("review");
  div.style.backgroundImage =" url(images/bgpic1.jpg)";
 
  news.style.backgroundImage =" url(images/bgpic1.jpg)";
 
  review.style.backgroundImage =" url(images/bgpic1.jpg)";
  const contain =document.getElementById('color-swit');
  contain.classList.remove('active');

});

btn2.addEventListener('click', () => {
  var div = document.getElementById('change');
  var news = document.getElementById("news");
  var review = document.getElementById("review");
  div.style.backgroundImage =" url(images/bglight1.jpg)";
 
  news.style.backgroundImage =" url(images/bglight1.jpg)";
 
  review.style.backgroundImage =" url(images/bglight1.jpg)";
 
  const contain =document.getElementById('color-swit');
  contain.classList.remove('active');
});

const faqheader = document.querySelectorAll('.faq-header');
faqheader.forEach((header , i) =>{
  header.addEventListener('click', () => {
    header.nextElementSibling.classList.toggle('active');

    const open= header.querySelector('.open');
    const close= header.querySelector('.close');

    if(header.nextElementSibling.classList.contains("active")){
      open.classList.remove('active');
      close.classList.add('active');
    }
    else{
      open.classList.add('active');
      close.classList.remove('active');
    }
  });

});

