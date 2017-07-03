<?php
header("Access-Control-Allow-Origin: http://localhost:63343");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, POST");

if (isset($_COOKIE['uid'])) {
  echo $_COOKIE['uid'];
} else {
  echo "Disabled get uid";
}
