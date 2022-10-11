<?php
// Start the session
session_start();
if (isset($_GET['success'])) {
    echo "<script type='text/javascript'>alert('Time Table Generated');</script>";
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
    <script type="text/javascript" src="assets/jsPDF/dist/jspdf.min.js"></script>
    <script type="text/javascript" src="assets/js/html2canvas.js"></script>
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
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

        </div>
        <div class="navbar-collapse collapse move-me">
            <ul class="nav navbar-nav navbar-left">
                <li><a href="addteachers.php">ADD TEACHERS</a></li>
                <li><a href="addsubjects.php">ADD SUBJECTS</a></li>
                <li><a href="addclassrooms.php">ADD CLASSROOMS</a></li>
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" aria-expanded="false">ALLOTMENT
                        <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href=allotsubjects.php>THEORY COURSES</a>
                        </li>
                        <li>
                            <a href=allotpracticals.php>PRACTICAL COURSES</a>
                        </li>
                        <li>
                            <a href=allotclasses.php>CLASSROOMS</a>
                        </li>
                    </ul>
                </li>
                <li><a href="generatetimetable.php">GENERATE TIMETABLE</a></li>

            </ul>
            <ul class="nav navbar-nav navbar-right">
                <li><a href="index.php">LOGOUT</a></li>
            </ul>

        </div>
    </div>
</div>
<!--NAVBAR SECTION END-->
<br>


<!--Algorithm Implementation-->
<div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
        <div class="modal-header">
            <span class="close">&times</span>
            <h2 id="popupHead">Assign Substitute</h2>
        </div>
        <div class="modal-body" id="AssignSubstitute">
            <!--Admin Login Form-->

            <div style="display:block" id="assignSubstituteForm">
                <form method="post" action="assignSubstituteFormValidation.php">
                    <div class="form-group">
                        <label for="substitute">Substitute</label>
                        <select class="form-control" id="substitute" name="SB">

                        </select>
                        <input type="hidden" id="cell_number" class="btn btn-default" name="CN">

                    </div>
                    <div align="right" class="form-group">

                        <input type="submit" id="submit" class="btn btn-default" name="ADD" value="CHECK">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<script>
    var assignsubstitueForm = document.getElementById("assignSubstitueForm");
    // Get the <span> element that closes the modal
    var modal = document.getElementById('myModal');
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function () {
        modal.style.display = "none";
        assignsubstitueForm.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            assignsubstitueForm.style.display = "none";
        }
    }
</script>
<form action="algo.php" method="post">
    <div align="center" style="margin-top: 50px">
        <button type="submit"
                id="generatebutton" class="btn btn-success btn-lg">GENERATE
        </button>
    </div>
</form>
<form action="generatetimetable.php" method="post">
    <div align="center" style="margin-top: 30px">
        <select name="select_teacher" class="list-group-item">
            <option selected disabled>Select Teacher</option>
            <?php
            $q = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
                "SELECT * FROM teachers ");
            while ($row = mysqli_fetch_assoc($q)) {
                echo " \"<option value=\"{$row['faculty_number']}\">{$row['name']}</option>\"";
            }
            ?>

        </select>
        <button type="submit" id="viewteacher" class="btn btn-success btn-lg" style="margin-top: 5px">VIEW TIMETABLE
        </button>
    </div>
</form>
<form action="generatetimetable.php" method="post">
    <div align="center" style="margin-top: 20px">
        <select name="select_semester" class="list-group-item">
            <option selected disabled>Select Semester</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
        </select>
        <button type="submit" id="viewsemester" class="btn btn-success btn-lg" style="margin-top: 5px">VIEW TIMETABLE
        </button>
    </div>
</form>
<script>
    var index = -1;
    function Substitute() {
        var table = document.getElementById("timetable");
        var cells = table.getElementsByTagName("td");
        // window.alert(cells[3].innerHTML.toString());
        for (i = 0; i < cells.length; i++) {
            if (i % 8 == 6 || i % 8 == 7 || parseInt(i / 8) == 0 || i % 8 == 0) {
                continue;
            }
            var currentCell = cells[i];
            //var b = currentRow.getElementsByTagName("td")[0];
            var createSubstituteHandler =
                function (cell, i) {
                    return function () {

                        document.getElementById('cell_number').value = i;
                        index = i;
                        var xmlhttp = new XMLHttpRequest();
                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                                var modal = document.getElementById('myModal');
                                modal.style.display = "block";
                                document.getElementById("substitute").innerHTML = this.responseText;

                            }
                        };
                        xmlhttp.open("GET", "getcellindex.php?i=" + i, false);
                        xmlhttp.send();
                    };
                };
            currentCell.onclick = createSubstituteHandler(currentCell, i);
        }
    }
</script>

<div>
    <br>
    <style>
        table {
            margin-top: 20px;
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
        }

        td, th {
            border: 2px solid #dddddd;
            text-align: left;
            padding: 8px;
        }

        tr:nth-child(even) {
            background-color: #ffffff;
        }

        tr:nth-child(odd) {
            background-color: #ffffff;
        }
    </style>
    <div id="TT" style="background-color: #FFFFFF">
        <table border="2" cellspacing="3" align="center" id="timetable">
            <caption><strong><br><br>
                    <?php
                    if (isset($_POST['select_semester'])) {
                        echo "COMPUTER ENGINEERING DEPARTMENT SEMESTER " . $_POST['select_semester'] . " ";
                        $year = (int)($_POST['select_semester'] / 2) + $_POST['select_semester'] % 2;
                        $r = mysqli_fetch_assoc(mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT * from classrooms
                        WHERE status = '$year'"));
                        echo " ( " . $r['name'], " ) ";
                    } else if (isset($_POST['select_teacher'])) {
                        $id = $_POST['select_teacher'];
                        $r = mysqli_fetch_assoc(mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT * from teachers
                        WHERE faculty_number = '$id'"));
                        echo $r['name'];
                    } else if (isset($_GET['display'])) {
                        $id = $_GET['display'];
                        $r = mysqli_fetch_assoc(mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT * from teachers
                        WHERE faculty_number = '$id'"));
                        echo $r['name'];

                    }
                    ?>
                </strong></caption>
            <tr>
                <td style="text-align:center">WEEKDAYS</td>
                <td style="text-align:center">8:00-8:50</td>
                <td style="text-align:center">8:55-9:45</td>
                <td style="text-align:center">9:50-10:40</td>
                <td style="text-align:center">10:45-11:35</td>
                <td style="text-align:center">11:40-12:30</td>
                <td style="text-align:center">12:30-1:30</td>
                <td style="text-align:center">1:30-4:00</td>
            </tr>
            <tr>
                <?php
                $table = null;
                if (isset($_POST['select_semester'])) {
                    $table = " semester" . $_POST['select_semester'] . " ";
                } else if (isset($_POST['select_teacher'])) {
                    $table = " " . $_POST['select_teacher'] . " ";
                } else if (isset($_GET['display'])) {
                    $table = " " . $_GET['display'] . " ";
                } else
                    echo '</table>';
                if (isset($_POST['select_semester']) || isset($_POST['select_teacher']) || isset($_GET['display'])) {
                    $q = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
                        "SELECT * FROM" . $table);
                    $qq = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
                        "SELECT * FROM subjects");
                    $days = array('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY');
                    $i = -1;
                    $str = "<br>";
                    $tid = "";
                    if (isset($_POST['select_semester'])) {
                        while ($r = mysqli_fetch_assoc($qq)) {
                            if ($r['isAlloted'] == 1 && $r['semester'] == $_POST['select_semester']) {
                                $str .= $r['subject_code'] . ": " . $r['subject_name'] . ", ";
                                if (isset($r['allotedto'])) {
                                    $id = $r['allotedto'];
                                    $qqq = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
                                        "SELECT * FROM teachers WHERE faculty_number = '$id'");
                                    $rr = mysqli_fetch_assoc($qqq);
                                    $str .= " " . $rr['alias'] . ": " . $rr['name'] . " ";
                                }
                                if ($r['course_type'] !== "LAB") {
                                    $str .= "<br>";
                                    continue;
                                } else {
                                    $str .= ", ";
                                }
                                if (isset($r['allotedto2'])) {
                                    $id = $r['allotedto2'];
                                    $qqq = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
                                        "SELECT * FROM teachers WHERE faculty_number = '$id'");
                                    $rr = mysqli_fetch_assoc($qqq);
                                    $str .= " " . $rr['alias'] . ": " . $rr['name'] . ", ";
                                }
                                if (isset($r['allotedto3'])) {
                                    $id = $r['allotedto3'];
                                    $qqq = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
                                        "SELECT * FROM teachers WHERE faculty_number = '$id'");
                                    $rr = mysqli_fetch_assoc($qqq);
                                    $str .= " " . $rr['alias'] . ": " . $rr['name'] . "<br>";
                                }
                            }
                        }
                    } else if (isset($_POST['select_teacher']) || isset($_GET['display'])) {
                        if (isset($_POST['select_teacher'])) {
                            $tid = $_POST['select_teacher'];
                        } else if (isset($_GET['display'])) {
                            $tid = $_GET['display'];
                            $tid = strtoupper($tid);
                        }
                        while ($r = mysqli_fetch_assoc($qq)) {
                            if ($r['isAlloted'] == 1 && $r['allotedto'] == $tid) {
                                $str .= $r['subject_code'] . ": " . $r['subject_name'] . " <br>";
                            } else if ($r['isAlloted'] == 1 && isset($r['allotedto2']) && $r['allotedto2'] == $tid) {
                                $str .= $r['subject_code'] . ": " . $r['subject_name'] . " <br>";
                            } else if ($r['isAlloted'] == 1 && isset($r['allotedto3']) && $r['allotedto3'] == $tid) {
                                $str .= $r['subject_code'] . ": " . $r['subject_name'] . " <br>";
                            }
                        }
                    }
                    while ($row = mysqli_fetch_assoc($q)) {
                        $i++;

                        echo "
                 <tr><td style=\"text-align:center\">$days[$i]</td>
                 <td style=\"text-align:center\">{$row['period1']}</td>
                <td style=\"text-align:center\">{$row['period2']}</td>
                <td style=\"text-align:center\">{$row['period3']}</td>
                 <td style=\"text-align:center\">{$row['period4']}</td>
                  <td style=\"text-align:center\">{$row['period5']}</td>
                  <td style=\"text-align:center\">LUNCH</td>
                  <td style=\"text-align:center\">{$row['period6']}</td>
                </tr>\n";
                    }

                    echo '</table>';
                    $sign = "GENERATED VIA TIMETABLE MANAGEMENT SYSTEM, COMPUTER ENGINEERING DEPARTMENT, AMU.";
                    echo "<div style='margin-left: 10px' align='center'>" . "<br>" . $str . "<br></div>" .
                        "<div style='margin-left: 10px' align='center'>" . "<strong>" . $sign . "<br></strong></div>";
                }
                if (isset($_POST['select_teacher'])) {
                    echo "<script>Substitute();</script>";
                    $_SESSION['shown_id'] = $_POST['select_teacher'];
                }
                if (isset($_GET['display'])) {
                    echo "<script>Substitute();</script>";
                    $_SESSION['shown_id'] = $_GET['display'];
                }
                ?>
    </div>
</div>
<script type="text/javascript">
    function gendf() {
        var doc = new jsPDF();

        doc.addHTML(document.getElementById('TT'), function () {
            doc.save('<?php
                    if (isset($_POST["select_semester"])) {
                        echo "ttms semester " . $_POST["select_semester"];
                    } else if (isset($_POST["select_teacher"])) {
                        echo "ttms " . $_POST["select_teacher"];
                    } else if (isset($_GET["display"])) {
                        echo "ttms " . $_GET["display"];
                    }
                    ?>' + '.pdf');
            alert("Downloaded!");

        });
    }

</script>
<div align="center" style="margin-top: 10px">
    <button id="saveaspdf" class="btn btn-info btn-lg" onclick="gendf()">SAVE AS PDF</button>
</div>

<!--HOME SECTION END-->

<!--<div id="footer">
    <!--  &copy 2014 yourdomain.com | All Rights Reserved |  <a href="http://binarytheme.com" style="color: #fff" target="_blank">Design by : binarytheme.com</a>
-->
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
</body>
</html>
