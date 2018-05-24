$(document).ready(function() {

    $('#getterms').click(get_terms);
    $("#getnum").click(chooseFile);
    $("#gettext").click(chooseFile);

});


function get_terms(e) {
     e.preventDefault();

    $.get('http://localhost:5000/gta/api/terms', function(datas,status) {
        html = ' ';
        vals = datas.terms;
        $.each(vals, function(i,val){
            html += '<tr><td>'+val.id+'</td>'+'<td>'+val.terms+'</td></tr>';
        });
        console.log(html);
        $('#result').html(html);
    });

  
}


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
                    url: "/flask/test",
                    type: "POST",
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