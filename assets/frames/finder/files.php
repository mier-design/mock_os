<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Files</title>
    <style>
        body {
            background-color: rgba(255, 255, 255, 0.5);
        }
    </style>
</head>

<body>
    <?php
        $files = scandir($_SERVER["DOCUMENT_ROOT"]."/assets/images/");
        for($i = 0; sizeof($files) > $i; $i++){
            echo "<a href='".$files[$i]."'>".$files[$i]."</a>";
        }
    ?>
</body>
</html>