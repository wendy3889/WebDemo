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
    
    $("#words-submit-bnt").click(wordSubmit);
    $("#tels-submit-bnt").click(telSubmit);
    
});


//限制只能输入中文和空格
function limitInputCh(){
    
    this.value=this.value.replace(/[^\u4E00-\u9FA5^\， ]/g,'');

}

//限制只能输入数字和逗号
function limitInputTel(){
    this.value=this.value.replace(/[^\d^\,]/g,'');
}


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
function wordSubmit(){
   var content = document.getElementById("inputwords-form").value;
   if (content == '') {
        alert("未输入任何关键词，无法创建任务！请重新添加内容！");
        } 
   else {
        var taskid = Date.parse(new Date());
        var data = {"taskid":taskid,
                     "words":content};
        $('#confirm-submit-modal').modal('show');
        clearWordContent();
        $.ajax({
            url: "/gta/gcc/word/task",
            type: "POST",
            data: JSON.stringify(data), // 转化为字符串
            contentType: 'charset=UTF-8',
            dataType: 'json',
            success: function(res){
                if (res.flag == "success") {
                    $('#confirm-submit-modal').modal('show');
                } else {
                    alert("任务提交失败！请重新提交！");

                    }
                },

            error:function(res){
                alert("任务提交失败！请重新提交！");
            }
                 });
        }
       
}

//确认提交任务
function telSubmit(){
   var content = document.getElementById("inputtels-form").value;
   if (content == '') {
        alert("未输入任何号码，无法创建任务！请重新添加内容！");
   } 
   else {
        var taskid = Date.parse(new Date());
        var data ={"taskid":taskid,
                    "tels":content};
        clearTelContent();
        $.ajax({
            url: "/gta/gcc/tel/task",
            type: "POST",
            data: JSON.stringify(data), // 转化为字符串
            contentType: 'charset=UTF-8',
            dataType: 'json',
            success: function(res){
                if (res.flag == "success") {
                    $('#confirm-submit-modal').modal('show');
                } else {
                    alert("任务提交失败！请重新提交！");

                    }
                },

            error:function(res){
                alert("任务提交失败！请重新提交！");
            }
         });
   }
   
    
}

//画节点图
function showGraph(taskid,wordsId){
    var myGraph = echarts.init(document.getElementById('graphDom'));
    myGraph.showLoading();
    //设置图初始样式
    myGraph.setOption({
        title: {text:'任务'+taskid+'关键词类别'+wordsId+'节点图'},
        legend: {data:['关键词','电话号码']},
        series:[{
            type: 'graph',
            layout: 'force',
            force:{
                initLayout: 'circular',
                repulsion: 100,
                edgeLength: [10, 50],
            },
            symbol:'circle',
            symbolSize: 15,
            roam: true,//是否可放大缩小移位
            draggable: true,//允许节点拖拽，只在force布局下才有用
            lineStyle: {
                        normal: {
                            width: 3,
                            curveness: 0.2

                        }
                    },
            
            categories:[{
                name: '关键词',
                itemStyle: {
                    normal: {
                        color: "#61a0a8",
                        borderWidth: 1,
                        borderColor: "#fff"
                                }
                            }
                        },
            {
                name: '电话号码',
                itemStyle: {
                    normal: {
                    color: "#d48265",
                    borderWidth: 1,
                    borderColor: "#fff"
                                }
                            }
                        }]

        }]
    });
    $.ajax({
        url: '/gta/graph/'+taskid+'/'+wordsId,
        type: 'post',
        dataType: 'json',
        success: function(res){
            myGraph.hideLoading();
            myGraph.setOption({
                series:{
                    data: res.nodes,
                    links: res.links,
                }
            });



        },
        error: function(res){
            alert('数据接收失败');
        }
    });
}


//页面加载时获取任务数量
$(function(){
    $.ajax({
        url: "/gta/gcc/doingtask",
        type: "POST",
        dataType: 'json',
        success: function (res) {
            var doinghtml = ' '; 

            for(var i=0;i<res.length;i++){ 
                doinghtml += '<tr><td>'+res[i].taskID+'</td><td>'+res[i].taskDesc+'</td><td>'+res[i].taskTime+'</td></tr>';
            }
            
            $("#doing-task-tbody").html(doinghtml);
            // 获取任务数量
            var tab1 = document.getElementById("doing-task-tab") ;
            var tab1rows = tab1.rows.length-1 ;
            $("#doing-task-num").text(tab1rows);
            },

        error: function (res) {
            alert('加载数据失败！'); 
                        }
    });

    $.ajax({
        url: "/gta/gcc/donetask",
        type: "POST",
        dataType: 'json',
        success: function (res) {
            var donehtml = ' ';
            
            for(var i=0;i<res.length;i++){ 
                donehtml += '<tr><td>'+res[i].taskID+'</td><td>'+res[i].taskDesc+'</td>';
                if (res[i].taskStatus=="done") {
                    if (res[i].taskDesc=="关键词输入") {

                        donehtml += '<td><a href="#word-task-result" data-toggle="tab" onclick="wordClusterTab('+res[i].taskID+')">查看结果</a></td></tr>';
                    
                    } 
                    else {

                        donehtml += '<td><a href="#tel-task-result" data-toggle="tab" onclick="telClusterTab('+res[i].taskID+')">查看结果</a></td></tr>';

                    }
                } 
                else {

                    donehtml += '<td>任务失败</td></tr>';

                }
                
            }    

            $("#done-task-tbody").html(donehtml);

            // 获取任务数量
            var tab2 = document.getElementById("done-task-tab") ;
            var tab2rows = tab2.rows.length-1 ;
            $("#done-task-num").text(tab2rows);
            // if (tab2rows > 0) {
            //     $("#gcc-alarm").text("+"+tab2rows);
            //     } 
            },

        error: function (res) {
            alert('加载数据失败！'); 
                        }
    });

});
