<?php

$stamp = imagecreatefrompng('../img/wm-test.png'); //путь до вотермарка
$im = imagecreatefrompng('../img/nyan.png'); //путь до файла с изображением

// Установка полей для штампа и получение высоты/ширины штампа
$marge_right = 10;
$marge_bottom = 10;
$width = imagesx($stamp);
$height = imagesy($stamp);

//координаты штампа
//$src_x = src_x($stamp); //x-координата штампа.
//$src_y = src_y($stamp); //y-координата штампа.

// Слияние штампа с фотографией. Прозрачность 50%
//-----------------------------------
//todo переделать функцию мержа с координатами!
//-----------------------------------
imagecopymerge($im, $stamp, imagesx($im) - $width - $marge_right, imagesy($im) - $height - $marge_bottom, 0, 0, imagesx($stamp), imagesy($stamp), 50);


// вывод в браузер
header('Content-type: image/png');
$img = imagepng($im);
imagedestroy($im);

?>