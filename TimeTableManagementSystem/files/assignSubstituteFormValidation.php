<?php
/**
 * Created by PhpStorm.
 * User: MSaqib
 * Date: 17-11-2016
 * Time: 01:59
 */

//$days = array("monday","tuesday","wednesday","thursday","friday","saturday");
//echo $_POST['CN'];
//echo $_POST['SB'];
include('sms.php');
session_start();
$whose = $_SESSION['shown_id'];
$sub = $_POST['SB'];
$class = $_POST['CN'];
$days = array("monday", "tuesday", "wednesday", "thursday", "friday", "saturday");
$day = $days[($class - 8) / 8];

$periods = array("period1", "period2", "period3", "period4", "period5", "period6");
$period = $periods[($class - 1) % 8];
$query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT * FROM teachers WHERE faculty_number = '$whose'");
$row = mysqli_fetch_assoc($query);
$whose_name = $row['name'];
$query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT * FROM teachers WHERE faculty_number = '$sub'");
$row = mysqli_fetch_assoc($query);
$sub_name = $row['name'];
$whose = strtolower($whose);
$sub = strtolower($sub);
$query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT * FROM $sub WHERE day = '$day'");
$row = mysqli_fetch_assoc($query);

$available = false;
if ($row[$period] == "-<br>-" || $row[$period] == "-<br>" || $row[$period] == "-") {
    $message = 'Message Sent!';
} else if (!isset($_POST['pwd'])) {
    echo "<script type='text/javascript'>alert('Selected substitute teacher is not available!');
        window.location.href = 'generatetimetable.php?display='$whose;</script>";
}

$query = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT * FROM $whose WHERE day = '$day'");
$row = mysqli_fetch_assoc($query);
$pieces = explode("<br>", $row[$period]);
/*echo $pieces[0]; // piece1
echo $pieces[1];
echo $whose_name;
echo $sub_name;
echo "<br>";*/
$string = "Hello " . $sub_name . ", You have to take class " . $pieces[0] . " of " . $whose_name . " in " . $pieces[1] . "\n\n-Sent from TimeTable Management System AMU";
$_SESSION['s'] = $string;
echo 'Sending SMS...';

if (isset($_POST['pwd'])) {
    echo "<script type='text/javascript'>alert('Message Sent!');
        window.location.href = 'generatetimetable.php?display=" . $whose . "';</script>";
}
?>
<div class="content">
    <form method="post" id="smsform"><input type="hidden" name="uid" value="sender mobile number goes here"/>
        <input type="hidden" name="pwd" value="way2sms password goed here"/><input type="hidden" name="to" value="recipient mobile number goes here"/>
        <input type="hidden" name="msg" value="<?php echo $_SESSION['s'] ?>"/>
        <input type="hidden" value="Send SmS" id="send"/></form>
</div>
<script>
    var send = document.getElementById('smsform');
    send.submit();
</script>

