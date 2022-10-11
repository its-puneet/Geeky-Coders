<?php
if (isset($_GET['generated']) && $_GET['generated'] == "false") {
    unset($_GET['generated']);
    echo '<script>alert("Timetable not generated yet!!");</script>';
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
    <meta name="description" content=""/>
    <meta name="author" content=""/>
    <title>TimeTable Management System</title>
    <!-- BOOTSTRAP CORE STYLE CSS -->
    <link href="assets/css/bootstrap.css" rel="stylesheet"/>
    <!-- FONT AWESOME CSS -->
    <link href="assets/css/font-awesome.min.css" rel="stylesheet"/>
    <!-- FLEXSLIDER CSS -->
    <link href="assets/css/flexslider.css" rel="stylesheet"/>
    <!-- CUSTOM STYLE CSS -->
    <link href="assets/css/style.css" rel="stylesheet"/>
    <!-- Google	Fonts -->
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,300' rel='stylesheet' type='text/css'/>

</head>
<body>
<div class="navbar navbar-inverse navbar-fixed-top " id="menu">
    <div class="container">
        <div align="center">
            <h3 align="center">TIME TABLE MANAGEMENT SYSTEM, COMPUTER ENGINEERING DEPARTMENT</h3>
        </div>
    </div>
</div>

<div id="myCarousel" class="carousel slide" data-ride="carousel">
    <!-- Indicators -->
    <ol class="carousel-indicators" style="margin-bottom: 160px">
        <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
        <li data-target="#myCarousel" data-slide-to="1"></li>
        <li data-target="#myCarousel" data-slide-to="2"></li>
        <li data-target="#myCarousel" data-slide-to="3"></li>
    </ol>

    <!-- Wrapper for slides -->
    <div class="carousel-inner" role="listbox">
        <div class="item active">
            <img src="assets/img/lab1.jpg" alt="Chania">
        </div>

        <div class="item">
            <img src="assets/img/lab2.jpg" alt="Chania">
        </div>

        <div class="item">
            <img src="assets/img/lab1.jpg" alt="Flower">
        </div>

        <div class="item">
            <img src="assets/img/lab2.jpg" alt="Flower">
        </div>
    </div>
</div>
<script type="text/javascript">
    function genpdf() {
        var doc = new jsPDF();

        doc.addHTML(document.getElementById('TT'), function () {
            doc.save('demo timetable.pdf');
        });
        window.alert("Downloaded!");
    }
</script>
<div align="center" STYLE="margin-top: 30px">
    <button data-scroll-reveal="enter from the bottom after 0.2s"
            id="teacherLoginBtn" class="btn btn-info btn-lg">TEACHER LOGIN
    </button>
    <button data-scroll-reveal="enter from the bottom after 0.2s"
            id="adminLoginBtn" class="btn btn-success btn-lg">ADMIN LOGIN
    </button>
</div>
<br>
<div align="center">
    <form data-scroll-reveal="enter from the bottom after 0.2s" action="studentvalidation.php" method="post">
        <select id="select_semester" name="select_semester" class="list-group-item">
            <option selected disabled>Select Semester</option>
            <option value="3"> B.Tech II Year ( Semester III )</option>
            <option value="4"> B.Tech II Year ( Semester IV )</option>
            <option value="5"> B.Tech III Year ( Semester V )</option>
            <option value="6"> B.Tech III Year ( Semester VI )</option>
            <option value="7"> B.Tech IV Year ( Semester VII )</option>
            <option value="8"> B.Tech IV Year ( Semester VIII )</option>
        </select>
        <button type="submit" class="btn btn-info btn-lg" style="margin-top: 10px">Download</button>
    </form>
</div>
<!-- The Modal -->
<div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
        <div class="modal-header">
            <span class="close">&times</span>
            <h2 id="popupHead">Modal Header</h2>
        </div>
        <div class="modal-body" id="LoginType">
            <!--Admin Login Form-->
            <div style="display:none" id="adminForm">
                <form action="adminFormvalidation.php" method="POST">
                    <div class="form-group">
                        <label for="adminname">Username</label>
                        <input type="text" class="form-control" id="adminname" name="UN" placeholder="Username ...">
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" class="form-control" id="password" name="PASS"
                               placeholder="Password ...">
                    </div>
                    <div align="right">
                        <input type="submit" class="btn btn-default" name="LOGIN" value="LOGIN">
                    </div>
                </form>
            </div>
        </div>
        <!--Faculty Login Form-->
        <div style="display:none" id="facultyForm">
            <form action="facultyformvalidation.php" method="POST" style="overflow: hidden">
                <div class="form-group">
                    <label for="facultyno">Faculty No.</label>
                    <input type="text" class="form-control" id="facultyno" name="FN" placeholder="Faculty No. ...">
                </div>
                <div align="right">
                    <button type="submit" class="btn btn-default" name="LOGIN">LOGIN</button>
                </div>
            </form>
        </div>
    </div>
</div>


<script>
    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the button that opens the modal
    var teacherLoginBtn = document.getElementById("teacherLoginBtn");
    var adminLoginBtn = document.getElementById("adminLoginBtn");
    var heading = document.getElementById("popupHead");
    var facultyForm = document.getElementById("facultyForm");
    var adminForm = document.getElementById("adminForm");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    adminLoginBtn.onclick = function () {
        modal.style.display = "block";
        heading.innerHTML = "Admin Login";
        adminForm.style.display = "block";
        facultyForm.style.display = "none";

    }
    teacherLoginBtn.onclick = function () {
        modal.style.display = "block";
        heading.innerHTML = "Faculty Login";
        facultyForm.style.display = "block";
        adminForm.style.display = "none";


    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
        adminForm.style.display = "none";
        facultyForm.style.display = "none";

    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
</script>
<!--HOME SECTION END-->
<!--HOME SECTION TAG LINE END-->

<div id="faculty-sec">
    <div class="container set-pad">
        <div class="row text-center">
            <div class="col-lg-8 col-lg-offset-2 col-md-8 col-sm-8 col-md-offset-2 col-sm-offset-2">
                <h1 data-scroll-reveal="enter from the bottom after 0.1s" class="header-line">OUR FACULTY </h1>

            </div>

        </div>
        <!--/.HEADER LINE END-->

        <div class="row">


            <div class="col-lg-4  col-md-4 col-sm-4" data-scroll-reveal="enter from the bottom after 0.4s">
                <div class="faculty-div">
                    <img src="assets\img\faculty\Dhruv Galgotia.jfif" class="img-rounded"/>
                    <h3 align="center">Dhruv Galgotia</h3>
                    <hr/>
                    <h4 align="center">CEO<br/> SCSE Engineering & Technology</h4>

                </div>
            </div>
            <div class="col-lg-4  col-md-4 col-sm-4" data-scroll-reveal="enter from the bottom after 0.5s">
                <div class="faculty-div">
                    <img src="assets\img\faculty\WhatsApp Image 2021-12-06 at 12.33.39 PM.jpeg" class="img-rounded"/>
                    <h3 align="center">Nakirekanti Suvarna</h3>
                    <hr/>
                    <h4 align="center"> <br/> Guide </h4>

                </div>
            </div>
            <div class="col-lg-4  col-md-4 col-sm-4" data-scroll-reveal="enter from the bottom after 0.6s">
                <div class="faculty-div">
                    <img src="assets\img\faculty\PREETIBAJAJ.jfif" class="img-rounded"/>
                    <h3 align="center">PREETI BAJAJ</h3>
                    <hr/>
                    <h4 align="center">VICE CHANCELER<br/>Computer Engineering Department</h4>
                    

                </div>
            </div>

            

        </div>
    </div>
</div>

<div class="container">
    <div class="row set-row-pad">
        <div class="col-lg-4 col-md-4 col-sm-4   col-lg-offset-1 col-md-offset-1 col-sm-offset-1 "
             data-scroll-reveal="enter from the bottom after 0.4s">

            <h2><strong>Our Location </strong></h2>
            <hr/>
            <div>
                <h4>GAUTAM-BUDHA NAGAR
                </h4>
                <h4> BUDHA INTERNATIONAL CIRCUIT</h4>
                <h4><strong>Call:</strong> 983777XXXX </h4>
                <h4><strong>Email: </strong>LKOOw.com</h4>
            </div>


        </div>
        <div class="col-lg-4 col-md-4 col-sm-4   col-lg-offset-1 col-md-offset-1 col-sm-offset-1"
             data-scroll-reveal="enter from the bottom after 0.4s">

            <h2><strong>Social Conectivity </strong></h2>
            <hr/>
            <div>
                <a href="#"> <img src="assets/img/Social/facebook.png" alt=""/> </a>
                <a href="#"> <img src="assets/img/Social/google-plus.png" alt=""/></a>
                <a href="#"> <img src="assets/img/Social/twitter.png" alt=""/></a>
            </div>
        </div>


    </div>
</div>
<!-- CONTACT SECTION END-->
<div id="footer">
    <!--  &copy 2014 yourdomain.com | All Rights Reserved |  <a href="http://binarytheme.com" style="color: #fff" target="_blank">Design by : binarytheme.com</a>
--></div>
<!-- FOOTER SECTION END-->

<!--  Jquery Core Script -->
<script src="assets/js/jquery-1.10.2.js"></script>
<!--  Core Bootstrap Script -->
<script src="assets/js/bootstrap.js"></script>
<!--  Flexslider Scripts -->
<script src="assets/js/jquery.flexslider.js"></script>
<!--  Scrolling Reveal Script -->
<script src="assets/js/scrollReveal.js"></script>
<!--  Scroll Scripts -->
<script src="assets/js/jquery.easing.min.js"></script>
<!--  Custom Scripts -->
<script src="assets/js/custom.js"></script>
</div>
</body>
</html>
