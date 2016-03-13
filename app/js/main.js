//----Скачивание картинки----
$(function(){
	
	$(".button__submit").on("click", function(e){
		e.preventDefault();
		var sourceImg = $(".processed_img"); //исходное изображение
		var watermark = $("#draggable"); //водяной знак
		var href = "php/server.php"; //путь до серверного обработчика
		var sourceType = $("#source-file-text").val().split('.')[1];
		var watermarkType = $("#watermark-file-text").val().split('.')[1];
		var watermarkWidth = $("#watermark-file-text").css("width");

		postData = {
			sourceImg: $(sourceImg).attr('src'),
		  	watermark : $(watermark).attr('src'),
		  	watermarkX : $("#coords-x").val(),
		    watermarkY : $("#coords-y").val(),
		    opacity : $(watermark).css("opacity"),
		    scale : $(sourceImg).attr('data-scale'),
		    watermarkType: watermarkType,
		    sourceType: sourceType,
		    watermarkWidth : $(watermark).css("width").split('px')[0],
		    watermarkHeight : $(watermark).css("height").split('px')[0]
		};
		console.log(sourceType);
		$.ajax({
		  type: "POST",
		  url: href,
		  data: postData,
		  success: function(msg){
		//  console.log(msg);
	    	var link = document.createElement('a'); // создаём ссылку на скачивание и имитируем клик.
 	     	link.target = "_blank";
			link.download = "img.png";
			link.href = "files/tmp.png";
			link.click();
		
		  }
		});

	});
});