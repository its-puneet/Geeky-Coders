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
<div align="center">
    <form action="allotmentFormvalidation.php" method="post" style="margin-top: 100px">


        <div style="margin-top: 5px">
            <select name="tobealloted" class="list-group-item">
                <?php
                include 'connection.php';
                $q = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
                    "SELECT * FROM subjects");
                $row_count = mysqli_num_rows($q);
                if ($row_count) {
                    $mystring = '
         <option selected disabled>Select Subject</option>';
                    while ($row = mysqli_fetch_assoc($q)) {
                        if ($row['isAlloted'] == 1 || $row['course_type'] == "LAB")
                            continue;
                        $mystring .= '<option value="' . $row['subject_code'] . '">' . $row['subject_name'] . '</option>';
                    }

                    echo $mystring;
                }
                ?>
            </select>
        </div>
        <div>
            <select name="toalloted" class="list-group-item">
                <?php
                include 'connection.php';

                $q = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
                    "SELECT * FROM teachers ");
                $row_count = mysqli_num_rows($q);
                if ($row_count) {
                    $mystring = '
         <option selected disabled>Select Teacher</option>';
                    while ($row = mysqli_fetch_assoc($q)) {
                        $mystring .= '<option value="' . $row['faculty_number'] . '">' . $row['name'] . '</option>';
                    }

                    echo $mystring;
                }
                ?>
            </select>
        </div>
        <div style="margin-top: 10px">
            <button type="submit" class="btn btn-success btn-lg">Allot</button>
        </div>
    </form>
</div>
<script>
    function deleteHandlers() {
        var table = document.getElementById("allotedsubjectstable");
        var rows = table.getElementsByTagName("tr");
        for (i = 0; i < rows.length; i++) {
            var currentRow = table.rows[i];
            //var b = currentRow.getElementsByTagName("td")[0];
            var createDeleteHandler =
                function (row) {
                    return function () {
                        var cell = row.getElementsByTagName("td")[0];
                        var id = cell.innerHTML;
                        var x;
                        if (confirm("Are You Sure?") == true) {
                            window.location.href = "deleteallotment.php?name=" + id;

                        }

                    };
                };

            currentRow.cells[4].onclick = createDeleteHandler(currentRow);
        }
    }
</script>
<style>
    table {
        margin-top: 80px;
        margin-bottom: 50px;
        font-family: arial, sans-serif;
        border-collapse: collapse;
        margin-left: 80px;
        width: 90%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #dddddd;
    }
</style>

<table id=allotedsubjectstable>
    <caption><strong>THEORY COURSES ALLOTMENT</strong></caption>
    <tr>
        <th width="150">Subject Code</th>
        <th width=420>Subject Title</th>
        <th width="170">Faculty No</th>
        <th width="330">Teacher's Name</th>
        <th width="40">Action</th>
    </tr>
    <tbody>
    <?php
    include 'connection.php';
    $q = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
        "SELECT * FROM subjects ");

    while ($row = mysqli_fetch_assoc($q)) {
        if ($row['isAlloted'] == 0 || $row['course_type'] == 'LAB')
            continue;
        $teacher_id = $row['allotedto'];
        $t = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
            "SELECT name FROM teachers WHERE faculty_number = '$teacher_id'");
        $trow = mysqli_fetch_assoc($t);
        echo "<tr><td>{$row['subject_code']}</td>
                    <td>{$row['subject_name']}</td>
                    <td>{$row['allotedto']}</td>
                    <td>{$trow['name']}</td>
                   <td>
                    <button>Delete</button></td>
                    </tr>\n";
    }
    echo "<script>deleteHandlers();</script>";
    ?>
    </tbody>
</table>


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
