//----Скачивание картинки----
$(".button__submit").on("click", function(e){
	e.preventDefault();
	var href = "php/server.php"; //путь до серверного обработчика
	$.ajax({
	  type: "POST",
	  url: href,
	  data: {
	  	// sourceImage : sourceImage;
	  	// watermark : watermark;
	  	// opacity : opacity;

	  },
	  success: function(msg){

	   	var link = document.createElement('a'); // создаём ссылку на скачивание и имитируем клик.
		link.target = "_blank";
		link.download = "img.png";
		link.href = href;
		link.click();
	  }
	});

});
