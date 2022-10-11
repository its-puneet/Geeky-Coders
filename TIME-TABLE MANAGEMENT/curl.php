<?php
$agent = $_SERVER['HTTP_USER_AGENT'];

function getcap($url, $ch, $ckfile, $proxy = '', $ref = '')
{
    global $agent;
    if ($ref == '')
        $ref = $url;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_USERAGENT, $agent);
    curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Content-Type: image/jpeg", "Accept: */*"));
    curl_setopt($ch, CURLOPT_COOKIEJAR, $ckfile);
    curl_setopt($ch, CURLOPT_PROXY, $proxy);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_NOPROGRESS, false);
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
    curl_setopt($ch, CURLOPT_REFERER, $ref);
    return curl_exec($ch);
}

function ngetcap($url, $ch, $ckfile, $proxy = '', $ref = '')
{
    global $agent;
    if ($ref == '')
        $ref = $url;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_USERAGENT, $agent);
    curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Content-Type: image/jpeg", "Accept: */*"));
    curl_setopt($ch, CURLOPT_COOKIEFILE, $ckfile);
    curl_setopt($ch, CURLOPT_PROXY, $proxy);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_NOPROGRESS, false);
    curl_setopt($ch, CURLOPT_VERBOSE, true);
    curl_setopt($ch, CURLOPT_BINARYTRANSFER, 1);
    curl_setopt($ch, CURLOPT_REFERER, $ref);
    return curl_exec($ch);
}

function npost($url, $post, $ch, $ckfile, $proxy = '', $ref = '')
{
    global $agent;
    if ($ref == '')
        $ref = $url;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, $agent);
    curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Content-Type: application/x-www-form-urlencoded", "Accept: */*"));
    curl_setopt($ch, CURLOPT_COOKIEFILE, "$ckfile");
    curl_setopt($ch, CURLOPT_PROXY, $proxy);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_REFERER, $ref);
    return curl_exec($ch);
}

function post($url, $post, $ch, $ckfile, $proxy = '', $ref = '')
{
    global $agent;
    if ($ref == '')
        $ref = $url;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, $agent);
    curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Content-Type: application/x-www-form-urlencoded", "Accept: */*"));
    curl_setopt($ch, CURLOPT_COOKIEJAR, "$ckfile");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_PROXY, $proxy);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
    curl_setopt($ch, CURLOPT_REFERER, $ref);
    return curl_exec($ch);
}

function get($url, $ch, $ckfile, $proxy = '', $ref = '')
{
    global $agent;
    if ($ref == '')
        $ref = $url;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, $agent);
    curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Content-Type: application/x-www-form-urlencoded", "Accept: */*"));
    curl_setopt($ch, CURLOPT_COOKIEJAR, "$ckfile");
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_PROXY, $proxy);
    curl_setopt($ch, CURLOPT_REFERER, $ref);
    return curl_exec($ch);
}

function nget($url, $ch, $ckfile, $proxy = '', $ref = '')
{
    global $agent;
    if ($ref == '')
        $ref = $url;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, $agent);
    curl_setopt($ch, CURLOPT_HTTPHEADER, Array("Content-Type: application/x-www-form-urlencoded", "Accept: */*"));
    curl_setopt($ch, CURLOPT_COOKIEFILE, "$ckfile");
    curl_setopt($ch, CURLOPT_PROXY, $proxy);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_REFERER, $ref);
    return curl_exec($ch);
}

?>

