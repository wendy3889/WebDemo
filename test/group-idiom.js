$(document).ready(function() {

    $("#inputwords-form").keyup(limitInputCh);//限制用户输入关键词
    $("#inputwords-form").contextmenu(limitInputCh);
    $("#inputwords-form").change(limitInputCh);

    $("#inputtels-form").keyup(limitInputTel);//限制用户输入号码
    $("#inputtels-form").contextmenu(limitInputTel);

    $("#import-tels-bnt").click(chooseTelFile);//导入号码文件按钮
    $("#import-words-bnt").click(chooseWordFile);//导入关键词文件按钮
    $("#select-words-file").change(checkWordFile);//限制txt文件导入
    $("#select-tels-file").change(checkTelFile);
    
    // $("#words-submit-bnt")
    // $("#tels-submit-bnt")

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
                        document.getElementById("inputwords-form").value=this.result;
                        var content = document.getElementById("inputwords-form").value.replace(/[^\u4E00-\u9FA5^\，^\（^\）]/g,'');
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
                

            } 
            else {  
                alert('请选择txt文件!'); 
                
                } 

            this.value=''; 
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
                        this.result=this.result.replace(/[^\d^\,]/g,'');
                        document.getElementById("inputtels-form").value=this.result;

                        this.value='';//读取文件后清空选择文件控件的值
                        };              
                    reader.readAsText(file);
        
                }

                else{
                    alert("文件为空，请重新输入！");
                    this.value='';
                    }
                
            } 
            else {  
                alert('请选择txt文件!'); 
                this.value='';
                }  
    }  

//用户确认输入文件并返回文件内容，若为空则重新选择
function confirmImportFile(){
    $('#confirm-import-modal').modal('hide');
    var files=document.getElementById("select-file").files;
    if (files.length) {
        var file = files[0];
        var reader = new FileReader();//new一个FileReader实例
        reader.onload = function() {
            document.getElementById("filepath").value=this.result;
            $('#result').bootstrapTable('refresh', { pageNumber: 1 });
            document.getElementById("filepath").value='';
            document.getElementById("select-file").value='';
        };              
        reader.readAsText(file);
        
    }

    else{
        alert("文件为空，请重新输入！");
        document.getElementById("select-file").value='';
    }
}



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

