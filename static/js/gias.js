$(document).ready(function() {

    $("#import-tel-bnt").click(chooseFile);//导入文件按钮
    $("#select-file").change(checkFileType);//选择文件按钮
    $("[data-toggle='popover']").popover();//弹出框
    $("#inputwords-form").keyup(limitInput);//限制用户输入
    $("#inputwords-form").contextmenu(limitInput);
    $("#inputwords-form").change(checkInputWords);//关键词输入框
    $("#confirm-inputwords-bnt").click(confirmInputWords);//确认输入按钮
    $("#confirm-importfile-bnt").click(confirmImportFile);//确认导入文件按钮
});


$(function(){
    $.ajax({
        url: "/gta/home/donetask",
        type: "GET",
        dataType: 'json',
        success: function (res) {
            
            $("#gic-alarm").text(res.gic_done_num);
            $("#gcc-alarm").text(res.gcc_done_num);
            $("#ric-alarm").text(res.ric_done_num);
            },

        error: function (res) {
            alert('加载任务数量失败！'); 
                        }
    });
});

// 选取文件
function chooseFile(){
    document.getElementById("select-file").click();
    }

//判断文件类型，输入为txt文件则弹出确认框
function checkFileType(){  
            if (/.*\.txt$/.test(this.value)) 
            {  
                document.getElementById("filepath").value=this.files[0].name;
                $('#confirm-import-modal').modal('show');
                } 
            else {  
                    alert('请选择txt文件!'); 
                    this.value='';
                }  
            }  

//限制只能输入中文、括号和逗号
function limitInput(){
    
    this.value=this.value.replace(/[^\u4E00-\u9FA5^\，^\（^\）]/g,'')

}


//判断输入的关键词是否标准，并弹出确认框
function checkInputWords(){
    //标准格式：
    $('#confirm-input-modal').modal('show');
    
}


//用户确认输入后发送数据到后端，并开始分析
function confirmInputWords(){ 
    $('#confirm-input-modal').modal('hide');
    $('#result').bootstrapTable('refresh', { pageNumber: 1 });
    document.getElementById("inputwords-form").value='';
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
