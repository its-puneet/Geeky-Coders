<?php
/**
 * Created by PhpStorm.
 * User: MSaqib
 * Date: 30-09-2016
 * Time: 22:44
 */
include 'connection.php';
$id = $_GET['name'];
$q = mysqli_query(mysqli_connect("localhost", "root", "", "ttms"),
    "DELETE FROM subjects WHERE subject_code = '$id' ");
if ($q) {

    header("Location:addsubjects.php");

} else {
    echo 'Error';
}
?>

