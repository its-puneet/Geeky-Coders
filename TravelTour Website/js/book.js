//validation--------------------------------------------->
  
const form=document.getElementById('form');
const uname=document.getElementById('name');
const email=document.getElementById('email');
var from = document.getElementById('from');
var to=document.getElementById('to');
const date = document.getElementById('sdate');
const edate = document.getElementById('edate');
const adult = document.getElementById('adult');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkInputs();
  });
  
  const sendData=(sRate) => {
    if (sRate == 6) {
      swal("Thanks for your booking!", "Please check your mail to get the ticket and pay the amount.", "success");
      document.getElementById('form').reset(); 
     
        }
    
  }

const successMsg = () => {
let formCon = document.getElementsByClassName('col-md-6');

var count = formCon.length - 1;
for (var i = 0; formCon.length; i++) {
    if (formCon[i].className === "col-md-6 success") {
        var sRate = 0 + i;
        console.log(sRate);
        console.log(count);      
        sendData(sRate);
           
    } 
    else
     return false;
}
}



function checkInputs(){
 
   const nameValue = uname.value.trim();
   const emailValue = email.value.trim();
   const dateValue = date.value.trim();
   const edateValue = edate.value.trim();
   const passValue = adult.value.trim();
  // const fromValue = from.value.trim();
   var fromValue = from.value;
   var toValue = to.value;
   
//name 
  if( nameValue === ''){
    setErrorFor(uname, 'Name cannot be blank');
  } 
  
  else if(nameValue.length<=4){
    setErrorFor(uname, 'Name minimum 5 character ');
  }

  else {
   setSuccessFor(uname);
  }
//email  
  if(emailValue === ''){
    setErrorFor(email, 'Email cannot be blank');
 }
 else if (!isEmail(emailValue)) {
   setErrorFor(email, 'Not a valid email');
 } 
 else{
   setSuccessFor(email);
 }
 //date--------------------------------------------------
 if( dateValue == '')
{
  setErrorFor(date, 'Date cannot be blank');
}
else{
  setSuccessFor(date);
}
//end date-----------------------------------------------
if( edateValue == '')
{
  setErrorFor(edate, 'Date cannot be blank');
}
else{
  setSuccessFor(edate);
}
 //compare------------------------------------------------

 if(edateValue < dateValue && date!='' )
{
  setErrorFor(edate, 'Enter valid Date');
}
//---------------------------------------------------------
if( fromValue == ''){
  setErrorFor(from, 'Start destination cannot be blank');
  from.style.borderColor ="#e74c3c";
} 
else{
  setSuccessFor(from);
  from.style.borderColor ="#2ecc71";
}
//-------------------------------------------

if(toValue == ''){
  setErrorFor(to, 'Final destination cannot be blank');
  to.style.borderColor ="#e74c3c";
} 
else if(from.selectedIndex != -1 && to.selectedIndex != -1){
  if(from.options[from.selectedIndex].value == to.options[to.selectedIndex].value){
    setErrorFor(to, 'Same destination not accepted');
    
  }
  else{
    setSuccessFor(to);
    to.style.borderColor ="#2ecc71";
  }

} 
if(passValue == '')
{
  setErrorFor(adult, 'Enter the value')
}
else{
  setSuccessFor(adult);
}

successMsg();

}
  //start date
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10)
{
  dd='0'+ dd
} 
if(mm<10)
{
  mm='0'+mm
}
today=yyyy+'-'+mm+'-'+dd;
document.getElementById("sdate").setAttribute("min" , today);


//end date
  
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10)
{
  dd='0'+ dd
} 
if(mm<10)
{
  mm='0'+mm
}
today=yyyy+'-'+mm+'-'+dd;
document.getElementById("edate").setAttribute("min" , today);


function setErrorFor(input, message){
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
   small.innerText = message;
   formControl.className = 'col-md-6 error';
  }
  
  function setSuccessFor(input){
  const formControl = input.parentElement;
  formControl.className = 'col-md-6 success';
  }

function isEmail(email) {
	return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}