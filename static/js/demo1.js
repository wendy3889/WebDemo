$(document).ready(function() {

    $("#import").click(chooseFile);
    $("#getnum").click(chooseFile);
    $("#gettext").click(chooseFile);
    $("#start").click(start);

});


// 选取文件
function chooseFile(){
    document.getElementById("btn_file").click();
    }


// 读取选中的文件，发送json数据到后端
function sendFile(files){
	document.getElementById("filepath").value="已选择文件";
	if (files.length) {
        var file = files[0];
        var reader = new FileReader();//new一个FileReader实例
        reader.onload = function() {
        	var data = this.result;
        	$.ajax({
        			url: "/demo1/sendfile",
        			type: "POST",
        			// data: data,
        			data: JSON.stringify(data), // 转化为字符串
    				contentType: '/demo1/sendfile; charset=UTF-8',
        			dataType: 'json',
        			success: function (data) {
        				document.getElementById("filepath").value="已导入文件";
        				val text=data.terms
        				$("#start").click(start(text));
        				},
        				
       				 
       				error: function (data) {
       					alert('加载数据失败！'); 
    					}
   				 });
        };
        reader.readAsText(file);
	}
}

function start(data){
	// $.ajax({
 //        	url: "/demo1/sendfile",
 //        	type: "POST",		
 //        	data: JSON.stringify(data), // 转化为字符串
 //    		contentType: '/demo1/sendfile; charset=UTF-8',
 //        	dataType: 'json',
 //        	success: function (data) {
        		var	html = '<tr><td>'+data+'</td></tr>';
        		console.log(html);
        		$('#result').html(html);	
       	// 			 },
       	// 	error: function (data) {
       	// 				alert('加载数据失败！'); 
    				// 	}
   				 // });
	}

