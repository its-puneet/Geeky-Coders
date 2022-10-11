<?php
/**
 * Created by PhpStorm.
 * User: MSaqib
 * Date: 31-08-2016
 * Time: 02:56
 */

include 'connection.php';
if (isset($_POST['UN']) && isset($_POST['PASS'])) {
    $id = $_POST['UN'];
    $password = $_POST['PASS'];
} else {
    die();
}
$q = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"), "SELECT name FROM admin WHERE name = '$id' and password = '$password' ");
if (mysqli_num_rows($q) == 1) {
    echo 'welcome admin';
} else {
    $message = "Username and/or Password incorrect.\\nTry again.";
    echo "<script type='text/javascript'>alert('$message');</script>";
}

?>