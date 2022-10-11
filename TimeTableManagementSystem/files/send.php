<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<?php
if (isset($_POST['submit1'])) {
    $user = $_POST['user'];
    $senderid = $_POST['senderid'];
    $channel = $_POST['channel'];
    $DCS = $_POST['DCS'];
    $flashsms = $_POST['flashsms'];
    $number = $_POST['number'];
    $message = $_POST['message'];
    $route = $_POST['route'];

    $ch = curl_init('http://login.smsgatewayhub.com/api/mt/SendSMS?APIKey=' . $_POST['user'] . '&senderid=' . $_POST
        ['senderid'] . '&channel=' . $_POST['channel'] . '&DCS=' . $_POST['number'] . '&flashsms=' . $_POST['flashsms'] . '&numb
er=' . $_POST['number'] . '&text=' . $_POST['message'] . '&route=' . $_POST['route'] . ';');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, "");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 2);
    $data = curl_exec($ch);
    print($data); /* result of API call*/
}
?>
<body>
<form method="post" action="">
    <table><input type="text" id="TextBox1" name=""
                  value="http://login.smsgatewayhub.com/api/mt/SendSMS?" readonly="readonly">
        APIKey=<input id="TextBox2" type="text" name="user" value="">
        Sender ID<input id="TextBox3" type="text" name="senderid" value="WEBSMS">
        Channel<input id="TextBox4" type="text" name="channel" value="2">
        DCS<input id="TextBox5" type="text" name="DCS" value="0">
        FlashSMS<input id="TextBox6" type="text" name="flashsms" value="0">
        Mobileno:<input id="TextBox7" type="text" name="number" value="">
        Message:<input id="TextBox8" type="text" name="message" value="">
        Route:<input id="TextBox9" type="text" name="route" value="1">
        <input type="submit" name="submit2" value="submit" onClick='getValue(); return false;'>
        <input type="submit" name="submit1" value="Response">
</form>
</body>
</html>