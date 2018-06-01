$(document).ready(function() {

    $("#import-tel-bnt").click(chooseFile);//导入文件按钮
    $("#select-file").change(checkFileType);//选择文件按钮
    $("#inputwords-form").change(checkInputWords);//关键词输入框
    $("#confirm-inputwords-bnt").click(confirmInputWords);//确认输入按钮
    $("#confirm-importfile-bnt").click(confirmImportFile);//确认导入文件按钮


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


//判断输入的关键词是否标准，并弹出确认框
function checkInputWords(){
    //标准格式：
    if (true) {
        $('#confirm-input-modal').modal('show');
    }
    else{
        alert("输入有误，请按示例重新输入！");
        this.value='';

    }
    
}


//用户确认输入后发送数据到后端，并开始分析
function confirmInputWords(){ 
    $('#confirm-input-modal').modal('hide');
    $('#result').bootstrapTable('refresh', { pageNumber: 1 });
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

// 开始日期检验
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

// 结束日期检验
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
