$(document).ready(function() {

    $("#getnum").click(chooseFile);
    $("#gettext").click(chooseFile);
   
    
           


});

function chooseFile(){
	document.getElementById("btn_file").click();
	
}


 

function jsReadFiles(files) {
		document.getElementById("filepath").value="已导入文件";
        if (files.length) {
            var file = files[0];
            var reader = new FileReader();//new一个FileReader实例
            // if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
            reader.onload = function() {
                    $('body').append('<pre>' + this.result + '</pre>');
                };
                
            // $('body').append('<pre>' + this.result + '</pre>');
            reader.readAsText(file);
            // } else if(/image+/.test(file.type)) {//判断文件是不是imgage类型
            //     reader.onload = function() {
            //         $('body').append('<img src="' + this.result + '"/>');
            //     };
                // reader.readAsDataURL(file);
            // }
        }
    }


function sendFile(files){
	document.getElementById("filepath").value="已选择文件";
	if (files.length) {
        var file = files[0];
        var reader = new FileReader();//new一个FileReader实例
        reader.onload = function() {
        	var data = this.result;
        	$.ajax({
        			url: "/flask/test",
        			type: "POST",
        			// data: data,
        			data: JSON.stringify(data), // 转化为字符串
    				contentType: '/flask/test; charset=UTF-8',
        			dataType: 'json',
        			success: function (data) {
        				document.getElementById("filepath").value="已导入文件";
       				 },
       				error: function(xhr,type) {
    					}
   				 });
        };
        reader.readAsText(file);
	}
}