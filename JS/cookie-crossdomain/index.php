<?php
// | Create: 2017/5/30 
// +----------------------------------------------------------------------
// | Author: 海枯 <haiku888@foxmail.com> 
// +----------------------------------------------------------------------
// | Description:  设置cookie
// +----------------------------------------------------------------------
setcookie('uid', 1, time() + 60*60);
?>
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport"
        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>cookie跨域</title>
</head>
<body>
  <button id="load">发出ajax请求</button>

  <script>
    function ajax(url) {
      return () => {
        const xhr = new XMLHttpRequest()
        xhr.open('GET', url)
        xhr.withCredentials = true

        xhr.onreadystatechange = () => {
          if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText)
          }
        }

        xhr.send()
      }
    }

    document.querySelector('#load').onclick = ajax('http://localhost/demo/cookie-crossdomain/getCookie.php')
  </script>
</body>
</html>
