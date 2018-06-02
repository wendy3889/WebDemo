$(document).ready(function() {

    $("#import_tel").click(chooseFile);
    $("#inputwords").change(checkCertain);
    $("#inputwords").keyup(checkContent);
    $("[data-toggle='popover']").popover();
    $("#start-date").change(checkStartDate);
    $("#end-date").change(checkEndDate);
    $("#select-file").change(checkFileType); 
    $("#confirm_input").click(confirmInput); 

    // $("#filepath").change(checkCertain);
});


function checkContent(){
    //限制只能输入中文、括号和逗号
    this.value=this.value.replace(/[^\u4E00-\u9FA5^\，^\（^\）]/g,'')

}


function checkCertain(){
    $('#exampleModalCenter').modal('show');


}

function confirmInput(){ 
    $('#exampleModalCenter').modal('hide');
    var data=document.getElementById("inputwords").value;
    $.ajax({
                    url: "/flask/test",
                    type: "POST",
                    // data: data,
                    data: JSON.stringify(data), // 转化为字符串
                    contentType: '/flask/test; charset=UTF-8',
                    dataType: 'json',
                 });
    
}

function checkFileType(){  
            if (/.*\.txt$/.test(document.getElementById("select-file").value)) 
            {  
                filepath.value=this.value;
                checkCertain()
                } 
            else {  
                    alert('请选择txt文件!'); 
                }  
            }  

function checkStartDate(){
    var today = new Date();
    var startdate = new Date(document.getElementById("start-date").value);
    if (document.getElementById("end-date").value!='')
    {
        var endDate = new Date(document.getElementById("end-date").value);
        if(endDate < startdate)
        {
        alert("开始日期不能大于结束日期");
        document.getElementById("start-date").value='';
        } 

    }
    else if (startdate>today)
    {

        alert("开始日期不能大于当前日期");
        document.getElementById("start-date").value='';       
    }   
}

function checkEndDate(){

    var today = new Date();

    if(document.getElementById("start-date").value=='')
    {
        alert("请先输入开始日期");
        document.getElementById("end-date").value='';
    }

    var startdate = new Date(document.getElementById("start-date").value);

    var endDate = new Date(document.getElementById("end-date").value);
    // document.getElementById("end-date").value=y+'-'+m+'-'+d; 
    if (endDate>today)
    {

        alert("结束日期不能大于当前日期");
        document.getElementById("end-date").value='';
        
    } 
    else if(endDate < startdate)
    {
        alert("结束日期必须大于开始日期");
        document.getElementById("end-date").value='';
    } 
}



function chooseFile(){
	document.getElementById("select-file").click();
	
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