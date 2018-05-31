$(document).ready(function() {

    $("#import").click(chooseFile);
    $("#getnum").click(chooseFile);
    $("#gettext").click(chooseFile);
    $("#start-date").change(checkStartDate);
    $("#end-date").change(checkEndDate); 
    $("#start").click(startCalculate);
    $("#inputwords").change(checkCertain);
    $("#confirm_input").click(confirmInput);


});


// 选取文件
function chooseFile(){
    document.getElementById("btn_file").click();
    }

//判断文件类型
function checkFileType(){  
            if (/.*\.txt$/.test(document.getElementById("select-file").value)) 
            {  
                filepath.value=this.value;
                } 
            else {  
                    alert('请选择txt文件!'); 
                }  
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
                        document.getElementById("filepath").value="已导入文件";
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
