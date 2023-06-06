<?php 

include 'config.php';

error_reporting(0); 

if (isset($_POST['submit'])) { 
    $name = $_POST['name']; 
    $email = $_POST['email']; 
    $comment = $_POST['comment']; 

    $sql = "INSERT INTO comments (name, email, comment)
            VALUES ('$name', '$email', '$comment')";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        echo "<script>alert('Thank you for contacting!')</script>";
    } else {
        echo "Try again!";
    }
}
?>