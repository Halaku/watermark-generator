<?php
// функция получает изображение из base64
function get_image($img, $type) {
	if ($type == "jpg") $type = "jpeg";
	$typeOf = 'data:image/'.$type.';base64,';
	$img = str_replace($typeOf, '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$result = imagecreatefromstring($data);
	// //запись во временный файл и освобождение памяти
	switch ($type){
	case "jpeg": 
		imagejpeg($result);
		break;
	case "jpg": 
		imagejpeg($result);
		break;
	case "png": 
		imagepng($result);
		break;
	case "gif": 
		imagegif($result);
		break;
	}
	return $result;
}
// Переменные из запроса

$source = get_image($_POST['sourceImg'], $_POST['sourceType']); //исходное изображение
$watermark = get_image($_POST['watermark'], $_POST['watermarkType']); // вотермарк
$stampX = $_POST['watermarkX']; // конечная X позиция для вотермарка 
$stampY = $_POST['watermarkY']; // конечная Y позиция для вотермарка 
$opacity = $_POST['opacity']*100; // прозрачность
$scale = $_POST['scale']; //масштаб

$file_dist = $_SERVER['DOCUMENT_ROOT'].'/img/'."tmp.".$_POST['sourceType']; // путь к временному изображению



// получение высоты/ширины вотермарка
$width = imagesx($watermark); //ширина вотермарка
$height = imagesy($watermark); //высота вотермарка


$new_width = $_POST['watermarkWidth']*$scale; //ширина с масштабом и ресайзом
$new_height = $_POST['watermarkHeight']*$scale; //ширина с масштабом и ресайзом

// создаём область для отресайзенного вотермарка
$watermarkOnScale = imagecreatetruecolor($new_width, $new_height); 

//делаем прозрачность для tranparent
$black = imagecolorallocate($watermarkOnScale, 0, 0, 0);
imagecolortransparent($watermarkOnScale, $black);

//ресайзим вотермакр

imagecopyresized($watermarkOnScale, $watermark, 0, 0, 0, 0, $new_width, $new_height, $width, $height);

//слияние

imagecopymerge($source, $watermarkOnScale, $stampX*$scale, $stampY*$scale, 0, 0, $new_width, $new_height, $opacity);

// //запись во временный файл и освобождение памяти
switch ($_POST['sourceType']){
	case "jpeg": 
		imagejpeg($source, $file_dist);
		break;
	case "jpg": 
		imagejpeg($source, $file_dist);
		break;
	case "png": 
		imagepng($source, $file_dist);
		break;
	case "gif": 
		imagegif($source, $file_dist);
		break;
}
imagedestroy($source);

?>