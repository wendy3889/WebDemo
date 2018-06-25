$(document).ready(function () {  
    $('#result').bootstrapTable({
        url: '/gta/pic/result',  
        method: 'post',  
        //dataType: "json", 
        queryParamsType: '',              //默认值为 'limit' ,在默认情况下 
        toolbar: '#toolbar', //工具按钮用哪个容器
        striped: true,//设置为 true 会有隔行变色效果  
        undefinedText: "-",//当数据为 undefined 时显示的字符  
        pagination: true, //分页  
        // paginationLoop:true,//设置为 true 启用分页条无限循环的功能。  
        showToggle: true,//是否显示 切换试图（table/card）按钮  
        showColumns: true,//是否显示 内容列下拉框 
        showRefresh: false, //是否显示刷新按钮
        pageNumber: 1,//如果设置了分页，首页页码  
        showPaginationSwitch:true,//是否显示 数据条数选择框  
        pageSize: 10,//如果设置了分页，页面数据条数  
        pageList: [5, 10, 20, 40],  //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。  
        paginationPreText: '上一页',//指定分页条中上一页按钮的图标或文字  
        paginationNextText: '下一页',//指定分页条中下一页按钮的图标或文字  
        singleSelect: false,//设置True 将禁止多选  
        search: false, //显示搜索框  
        data_local: "zh-US",//表格汉化  
        sidePagination: "server", //服务端处理分页  
        queryParams: queryParams,
        idField: "ID",//指定主键列  
        columns: [  
            {  
                title: '序号',//表的列名  
                field: 'ID',//json数据中rows数组中的属性名
                width: 50,//宽度  
                align: 'center'//水平居中  
            },  
            {  
                title: '电话号码',  
                field: 'tel',  
                width: 150,
                align: 'center'  
            },  
            {  
                title: '惯用语',  
                field: 'keyWords',  
                align: 'center'  
            },  
            {    
                title: '日期',  
                field: 'date', 
                width: 150, 
                align: 'center'  
            },       
  
        ]  

    }); 

    function queryParams(params) { 
        return {  
            pageSize: params.pageSize,  //每页显示的条数
            pageIndex: params.pageNumber,  //当前页码
            tels: $("#filepath").val(),
            words: $("#inputwords-form").val(),  
            // Author: $.trim($("#txtAuthor").val()),  
            // Publish: $.trim($("#txtPublish").val()),  
        };  
    }  

    }); 

// 群体惯用语分析结果表
function wordTaskTab(taskid) {  
    $('#word-task-result-tab').bootstrapTable({
        url: '/gta/gic/wordtask/result/'+taskid,  
        method: 'post',  
        //dataType: "json", 
        queryParamsType: '',              //默认值为 'limit' ,在默认情况下 
        toolbar: '#toolbar', //工具按钮用哪个容器
        striped: true,//设置为 true 会有隔行变色效果  
        undefinedText: "-",//当数据为 undefined 时显示的字符  
        pagination: true, //分页         
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false,//是否显示 切换试图（table/card）按钮 
        pageNumber: 1,//如果设置了分页，首页页码  
        showPaginationSwitch:false,//是否显示分页隐藏控件  
        pageSize: 10,//如果设置了分页，页面数据条数  
        pageList: [5, 10, 20, 40],  //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。  
        paginationPreText: '上一页',//指定分页条中上一页按钮的图标或文字  
        paginationNextText: '下一页',//指定分页条中下一页按钮的图标或文字  
        singleSelect: false,//设置True 将禁止多选  
        search: false, //显示搜索框  
        data_local: "zh-US",//表格汉化  
        sidePagination: "server", //服务端处理分页  
        queryParams: queryParams,
        idField: "ID",//指定主键列  
        columns: [  
            {  
                title: '序号',//表的列名  
                field: 'ID',//json数据中rows数组中的属性名
                width: 60,//宽度  
                align: 'center'//水平居中  
            },  
            {  
                title: '电话号码',  
                field: 'tel',  
                width: 150,
                align: 'center'  
            }, 
            {  
                title: '关键词文本',  
                field: 'words',  
                align: 'left'  
            }
            
        ]  

    }); 


    function queryParams(params) { 
        return {  
            pageSize: params.pageSize,  //每页显示的条数
            pageIndex: params.pageNumber,  //当前页码 
        };  
    } 

    $("#word-taskid-txt").text(taskid);

}

function telTaskTab(taskid) {  
    $('#tel-task-result-tab').bootstrapTable({
        url: '/gta/gic/teltask/result/'+taskid,  
        method: 'post',  
        //dataType: "json", 
        queryParamsType: '',              //默认值为 'limit' ,在默认情况下 
        toolbar: '#toolbar', //工具按钮用哪个容器
        striped: true,//设置为 true 会有隔行变色效果  
        undefinedText: "-",//当数据为 undefined 时显示的字符  
        pagination: true, //分页         
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false,//是否显示 切换试图（table/card）按钮 
        pageNumber: 1,//如果设置了分页，首页页码  
        showPaginationSwitch:false,//是否显示分页隐藏控件  
        pageSize: 10,//如果设置了分页，页面数据条数  
        pageList: [5, 10, 20, 40],  //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。  
        paginationPreText: '上一页',//指定分页条中上一页按钮的图标或文字  
        paginationNextText: '下一页',//指定分页条中下一页按钮的图标或文字  
        singleSelect: false,//设置True 将禁止多选  
        search: false, //显示搜索框  
        data_local: "zh-US",//表格汉化  
        sidePagination: "server", //服务端处理分页  
        queryParams: queryParams,
        idField: "ID",//指定主键列 
        columns: [  
            {  
                title: '序号',//表的列名  
                field: 'ID',//json数据中rows数组中的属性名
                width: 80,//宽度  
                align: 'center'//水平居中  
            },  
            {  
                title: '惯用语',  
                field: 'words',  
                
                align: 'left'  
            } 
           ]  

    }); 


    function queryParams(params) { 
        return {  
            pageSize: params.pageSize,  //每页显示的条数
            pageIndex: params.pageNumber,  //当前页码 
        };  
    } 

    $("#tel-taskid-txt").text(taskid); 

}


// 群体聚类及惯用语分析结果表
function wordClusterTab(taskid) {  
    $('#word-cluster-tel-tab').bootstrapTable({
        url: '/gta/gcc/wordtask/result/tel/'+taskid,  
        method: 'post',  
        //dataType: "json", 
        queryParamsType: '',              //默认值为 'limit' ,在默认情况下 
        toolbar: '#toolbar', //工具按钮用哪个容器
        striped: true,//设置为 true 会有隔行变色效果  
        undefinedText: "-",//当数据为 undefined 时显示的字符  
        pagination: true, //分页         
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false,//是否显示 切换试图（table/card）按钮 
        pageNumber: 1,//如果设置了分页，首页页码  
        showPaginationSwitch:false,//是否显示分页隐藏控件  
        pageSize: 10,//如果设置了分页，页面数据条数  
        pageList: [5, 10, 20, 40],  //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。  
        paginationPreText: '上一页',//指定分页条中上一页按钮的图标或文字  
        paginationNextText: '下一页',//指定分页条中下一页按钮的图标或文字  
        singleSelect: false,//设置True 将禁止多选  
        search: false, //显示搜索框  
        data_local: "zh-US",//表格汉化  
        sidePagination: "server", //服务端处理分页  
        queryParams: queryParams,
        idField: "tel",//指定主键列 
        columns: [  
            {  
                title: '关键词类别',//表的列名  
                field: 'ID',//json数据中rows数组中的属性名
                width: 60,//宽度  
                align: 'center'//水平居中  
            },  
            {  
                title: '电话号码',  
                field: 'tel',  
                align: 'left'  
            } 
            
        ]  

    }); 

    $('#word-cluster-word-tab').bootstrapTable({
        url: '/gta/gcc/wordtask/result/word/'+taskid,  
        method: 'post',  
        //dataType: "json", 
        queryParamsType: '',              //默认值为 'limit' ,在默认情况下 
        toolbar: '#toolbar', //工具按钮用哪个容器
        striped: true,//设置为 true 会有隔行变色效果  
        undefinedText: "-",//当数据为 undefined 时显示的字符  
        pagination: true, //分页         
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false,//是否显示 切换试图（table/card）按钮 
        pageNumber: 1,//如果设置了分页，首页页码  
        showPaginationSwitch:false,//是否显示分页隐藏控件  
        pageSize: 10,//如果设置了分页，页面数据条数  
        pageList: [5, 10, 20, 40],  //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。  
        paginationPreText: '上一页',//指定分页条中上一页按钮的图标或文字  
        paginationNextText: '下一页',//指定分页条中下一页按钮的图标或文字  
        singleSelect: false,//设置True 将禁止多选  
        search: false, //显示搜索框  
        data_local: "zh-US",//表格汉化  
        sidePagination: "server", //服务端处理分页  
        queryParams: queryParams,
        idField: "ID",//指定主键列  
        columns: [  
            {  
                title: '关键词类别',//表的列名  
                field: 'ID',//json数据中rows数组中的属性名
                width: 60,//宽度  
                align: 'center'//水平居中  
            },  
            {  
                title: '关键词组',  
                field: 'words',  
                align: 'left'  
            },
            {  
                title: '可视化',  
                field: 'graph',
                //width: 60,//宽度   
                align: 'center',
                formatter:function(value,row,index){
                        var wordsId = row.ID;
                        //var myGraphurl = "/gta/gcc/wordtask/result/word/"+taskid+"/"+wordsId;
                        return '<a href="#graph" data-toggle="tab" onclick="showGraph('+taskid+','+wordsId+')">查看节点图</a>';
                        }  
            }
            
        ]  

    }); 


    function queryParams(params) { 
        return {  
            pageSize: params.pageSize,  //每页显示的条数
            pageIndex: params.pageNumber,  //当前页码 
        };  
    } 

    $("#word-taskid-txt").text(taskid);

}

function telClusterTab(taskid) {  
    $('#tel-cluster-tel-tab').bootstrapTable({
        url: '/gta/gcc/teltask/result/tel/'+taskid,  
        method: 'post',  
        //dataType: "json", 
        queryParamsType: '',              //默认值为 'limit' ,在默认情况下 
        toolbar: '#toolbar', //工具按钮用哪个容器
        striped: true,//设置为 true 会有隔行变色效果  
        undefinedText: "-",//当数据为 undefined 时显示的字符  
        pagination: true, //分页         
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false,//是否显示 切换试图（table/card）按钮 
        pageNumber: 1,//如果设置了分页，首页页码  
        showPaginationSwitch:false,//是否显示分页隐藏控件  
        pageSize: 10,//如果设置了分页，页面数据条数  
        pageList: [5, 10, 20, 40],  //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。  
        paginationPreText: '上一页',//指定分页条中上一页按钮的图标或文字  
        paginationNextText: '下一页',//指定分页条中下一页按钮的图标或文字  
        singleSelect: false,//设置True 将禁止多选  
        search: false, //显示搜索框  
        data_local: "zh-US",//表格汉化  
        sidePagination: "server", //服务端处理分页  
        queryParams: queryParams,
        idField: "tel",//指定主键列  
        columns: [  
            {  
                title: '关键词类别',//表的列名  
                field: 'ID',//json数据中rows数组中的属性名
                width: 60,//宽度  
                align: 'center'//水平居中  
            },  
            {  
                title: '电话号码',  
                field: 'tel',  
                align: 'left'  
            } 
            
        ]  

    }); 

    $('#tel-cluster-word-tab').bootstrapTable({
        url: '/gta/gcc/teltask/result/word/'+taskid,  
        method: 'post',  
        //dataType: "json", 
        queryParamsType: '',              //默认值为 'limit' ,在默认情况下 
        toolbar: '#toolbar', //工具按钮用哪个容器
        striped: true,//设置为 true 会有隔行变色效果  
        undefinedText: "-",//当数据为 undefined 时显示的字符  
        pagination: true, //分页         
        showColumns: false,//是否显示 内容列下拉框
        showToggle: false,//是否显示 切换试图（table/card）按钮 
        pageNumber: 1,//如果设置了分页，首页页码  
        showPaginationSwitch:false,//是否显示分页隐藏控件  
        pageSize: 10,//如果设置了分页，页面数据条数  
        pageList: [5, 10, 20, 40],  //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。  
        paginationPreText: '上一页',//指定分页条中上一页按钮的图标或文字  
        paginationNextText: '下一页',//指定分页条中下一页按钮的图标或文字  
        singleSelect: false,//设置True 将禁止多选  
        search: false, //显示搜索框  
        data_local: "zh-US",//表格汉化  
        sidePagination: "server", //服务端处理分页  
        queryParams: queryParams,
        idField: "ID",//指定主键列  
        columns: [  
            {  
                title: '关键词类别',//表的列名  
                field: 'ID',//json数据中rows数组中的属性名
                width: 60,//宽度  
                align: 'center'//水平居中  
            },  
            {  
                title: '关键词组',  
                field: 'words',  
                align: 'left'  
            },
            {  
                title: '可视化',  
                field: 'graph',
                //width: 60,//宽度   
                align: 'center',
                formatter:function(value,row,index){
                        var wordsId = row.ID;
                        //var myGraphurl = '/gta/gcc/teltask/result/tel/'+taskid+''+wordsId; 
                        return '<a href="#graph" data-toggle="tab" onclick="showGraph('+taskid+','+wordsId+')">查看节点图</a>';
                        } 
            }  
            
        ]  

    }); 


    function queryParams(params) { 
        return {  
            pageSize: params.pageSize,  //每页显示的条数
            pageIndex: params.pageNumber,  //当前页码 
        };  
    } 

    $("#tel-taskid-txt").text(taskid);

}