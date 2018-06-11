$(document).ready(function() {

    $("#inputwords-form").keyup(limitInputCh);//限制用户输入关键词
    $("#inputwords-form").contextmenu(limitInputCh);
    $("#inputwords-form").change(limitInputCh);

    $("#inputtels-form").keyup(limitInputTel);//限制用户输入号码
    $("#inputtels-form").contextmenu(limitInputTel);

    $("#import-tels-bnt").click(chooseTelFile);//导入号码文件按钮
    $("#import-words-bnt").click(chooseWordFile);//导入关键词文件按钮
    $("#select-words-file").change(checkWordFile);//限制关键词文件导入
    $("#select-tels-file").change(checkTelFile);//限制电话号码文件导入
    $("#clear-words-bnt").click(clearWordContent);//清除已输入关键词内容
    $("#clear-tels-bnt").click(clearTelContent);//清除已输入号码内容
    
    $("#words-submit-bnt").click(confirmSubmit);
    $("#tels-submit-bnt").click(confirmSubmit);
    
});




//限制只能输入中文、括号和逗号
function limitInputCh(){
    
    this.value=this.value.replace(/[^\u4E00-\u9FA5^\，^\（^\）]/g,'');

}

//限制只能输入数字和逗号
function limitInputTel(){
    this.value=this.value.replace(/[^\d^\,]/g,'');
}

// //判断输入的关键词是否标准，并弹出确认框
// function checkInputWords(){
//     //标准格式：
//     $('#confirm-input-modal').modal('show');
    
// }

// 选取关键词文件
function chooseWordFile(){
    document.getElementById("select-words-file").click();
    }

// 选取号码文件
function chooseTelFile(){
    document.getElementById("select-tels-file").click();
    }

//判断关键字文件类型，限制输入为txt文件，并过滤无效字符
function checkWordFile(){  
            if (/.*\.txt$/.test(this.value)) 
            {  
                var files=this.files;
                if (files.length) {
                    var file = files[0];
                    var reader = new FileReader();//new一个FileReader实例
                    reader.onload = function() {
                        var content = this.result.replace(/[^\u4E00-\u9FA5^\，^\（^\）]/g,'');
                        if (content == '')
                        {
                            alert("文件内容不符合要求，请重新选择文件！");
                            document.getElementById("inputwords-form").value='';
                        }
                        else{
                            document.getElementById("inputwords-form").value = content;
                        }          
                        
                    };              
                    reader.readAsText(file);
        
                }
                else{
                    alert("文件为空，请重新输入！");
                    
                    }
                this.value='';
                

            } 
            else {  
                alert('请选择txt文件!'); 
                this.value='';
                
                } 

             
    }  



//判断号码文件类型，限制输入为txt文件，并过滤无效字符
function checkTelFile(){  
            if (/.*\.txt$/.test(this.value)) 
            {  
                var files=this.files;
                if (files.length) {
                    var file = files[0];
                    var reader = new FileReader();//new一个FileReader实例
                    reader.onload = function() {
                        var content = this.result.replace(/[^\d^\,]/g,'');
                        if (content == '')
                        {
                            alert("文件内容不符合要求，请重新选择文件！");
                            document.getElementById("inputtels-form").value='';
                        }
                        else{
                            document.getElementById("inputtels-form").value = content;
                        }          
                        
                    };              
                    reader.readAsText(file);
        
                }
                else{
                    alert("文件为空，请重新输入！");
                    
                    }
                this.value='';
                

            } 
            else {  
                alert('请选择txt文件!'); 
                this.value='';
                
                } 
             
    }  

//清除已输入的关键词内容
function clearTelContent(){
    document.getElementById("inputtels-form").value='';

}


//清除已输入的电话号码
function clearWordContent(){
    document.getElementById("inputwords-form").value='';
}


//确认提交任务
function confirmSubmit(){
    $('#confirm-submit-modal').modal('show');
    var trHTML = "<tr><td>...</td><td>...</td><td>...</td></tr>";
    $("#doing-task-tab").append(trHTML);//在table最后面添加一行
    $("#doing-task-tab tr:eq(2)").after(trHTML); //
    // if (this.id == words-submit-bnt) {

    // }
}





//页面加载时获取任务数量
$(function(){
    var tab1 = document.getElementById("doing-task-tab") ;
      //表格行数
    var tab1rows = tab1.rows.length-1 ;

    var tab2 = document.getElementById("done-task-tab") ;
      //表格行数
    var tab2rows = tab2.rows.length-1 ;

    $("#doing-task-num").text(tab1rows);
    $("#done-task-num").text(tab2rows);

});






// 读取选中的文件，发送json数据到后端
function startCalculate(files){
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
                        document.getElementById("filepath-form").value="已导入文件";
                        html = ' ';
                        tel=data.input_tels;
                        txt=data.input_txts;
                        for (var i=0; i<tel.length; i++){
                            html += '<tr><td>'+tel[i]+'</td><td>'+txt[i]+'</td></tr>';
                        }
                        
                        console.log(html);
                        $('#result').html(html);
                        },
                    error: function (data) {
                        alert('加载数据失败！'); 
                        }
                 });
        };
                 
        reader.readAsText(file);
    }
}

