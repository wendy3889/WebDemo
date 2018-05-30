$(document).ready(function () {  
    $('#result').bootstrapTable({
        url: '/gias/pic/result',  
        method: 'post',  
        //dataType: "json", 
        queryParamsType: '',              //默认值为 'limit' ,在默认情况下 
        striped: true,//设置为 true 会有隔行变色效果  
        undefinedText: "-",//当数据为 undefined 时显示的字符  
        pagination: true, //分页  
        // paginationLoop:true,//设置为 true 启用分页条无限循环的功能。  
        //showToggle: "true",//是否显示 切换试图（table/card）按钮  
        //showColumns: "true",//是否显示 内容列下拉框  
        pageNumber: 1,//如果设置了分页，首页页码  
        //showPaginationSwitch:true,//是否显示 数据条数选择框  
        pageSize: 1,//如果设置了分页，页面数据条数  
        //pageList: [5, 10, 20, 40],  //如果设置了分页，设置可供选择的页面数据条数。设置为All 则显示所有记录。  
        paginationPreText: '上一页',//指定分页条中上一页按钮的图标或文字  
        paginationNextText: '下一页',//指定分页条中下一页按钮的图标或文字  
        // singleSelect: false,//设置True 将禁止多选  
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
            // Title: $.trim($("#txtTitle").val()),  
            // Author: $.trim($("#txtAuthor").val()),  
            // Publish: $.trim($("#txtPublish").val()),  
        };  
    }  

    }); 