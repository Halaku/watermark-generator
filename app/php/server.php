<?php
// функция получает изображение из base64
function get_image($img) {
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$result = imagecreatefromstring($data);
	
	return $result;
}
// Переменные из запроса
$source = get_image($_POST['sourceImg']); //исходное изображение
$watermark = get_image($_POST['watermark']); // вотермарк
$stampX = $_POST['watermarkX']; // конечная X позиция для вотермарка 
$stampY = $_POST['watermarkY']; // конечная Y позиция для вотермарка 
$opacity = $_POST['opacity']*100; // прозрачность
$scale = $_POST['scale'];


$file_dist = $_SERVER['DOCUMENT_ROOT'].'/img/'."tmp.png"; // путь к временному изображению

// получение высоты/ширины вотермарка
$width = imagesx($watermark); //ширина вотермарка
$height = imagesy($watermark); //высота вотермарка
$new_width = $width*$scale; // ширина с масштабом
$new_height = $height*$scale; //высота с масштабом

$watermarkOnScale = imagecreatetruecolor($new_width, $new_height); 

//делаем прозрачность для tranparent
$black = imagecolorallocate($watermarkOnScale, 0, 0, 0);
imagecolortransparent($watermarkOnScale, $black);

//вотермарк с масштабом
imagecopyresampled($watermarkOnScale, $watermark, 0, 0, 0, 0, $new_width, $new_height, $width, $height);


//слияние

imagecopymerge($source, $watermarkOnScale, $stampX*$scale , $stampY*$scale , 0, 0, $width*$scale, $height*$scale, $opacity);

//запись во временный файл b освобождение памяти
imagepng($source, $file_dist );
imagedestroy($source);

?>