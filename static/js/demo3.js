$(document).ready(function() {

    $("#import").click(chooseFile);
    $("#getnum").click(chooseFile);
    $("#gettext").click(chooseFile);
    $("#start").click(startCalculate);

});


// 选取文件
function chooseFile(){
    document.getElementById("btn_file").click();
    }


// 读取选中的文件，发送json数据到后端处理后返回
function startCalculate(files){
    if (files.length) {
        var file = files[0];
        var reader = new FileReader();//new一个FileReader实例
        reader.onload = function() {
            var data = this.result;
            $.ajax({
                    url: "/demo3/sendfile",
                    type: "POST",
                    // data: data,
                    data: JSON.stringify(data), // 转化为字符串
                    contentType: '/demo3/sendfile; charset=UTF-8',
                    dataType: 'json',
                    success: function (data) {
                        document.getElementById("filepath").value="已导入文件";
                        var html = '<tr><td>'+data.terms+'</td></tr>';
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

