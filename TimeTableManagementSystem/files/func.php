 <?php
include('curl.php');

@ini_set('zlib.output_compression', 0);
@ini_set('implicit_flush', 1);
@ob_end_clean();

set_time_limit(0);
ob_implicit_flush(1);
$time = time();


function go($url)
{
    header('Location: ' . $url);
    exit;
}

function input($text)
{
    return trim(htmlspecialchars($text));
}

function output($text, $html = true)
{
    if ($html) {
        return trim(stripslashes($text));
    } else {
        return trim(htmlspecialchars(stripslashes($text)));
    }
}

function rword($length = 10, $allow = "all")
{
    if ($allow == "all")
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    elseif ($allow == "num")
        $characters = '0123456789';
    elseif ($allow == "en")
        $characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    elseif ($allow == "low")
        $characters = 'abcdefghijklmnopqrstuvwxyz';
    elseif ($allow == "up")
        $characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    else
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $randomString;
}

function sor($html)
{
    $html = htmlspecialchars($html);
    return $html;
}

function clean($html)
{
    $html = str_replace(array("\r\n", "\r", "\n"), "", $html);
    return $html;
}

function show($text, $color = "darkred")
{
    echo '<font color="' . $color . '">' . $text . '</font><br/>';
    ob_flush();
    flush();
}

function fc($text, $color = "darkred")
{
    echo '<font color="' . $color . '">' . $text . '</font>';
    ob_flush();
    flush();
}


function err($head = "Error", $text = "Error")
{
    echo '<div class="head">' . $head . '</div><div class="content">' . $text . '</div>';
    ob_flush();
    flush();
    include "foot.php";
    ob_flush();
    flush();
    die();
}

?>
