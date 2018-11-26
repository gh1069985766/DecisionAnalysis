/**
 main.html的js方法
 */

function addTabByChild(url, index, name) {
    window.parent.window.menuItemByChild(url, index, name, true);
    // window.parent.window.menuItemByChild("/one/showOne", "1", "余姚市安全生产监督管理局行政处罚决定书送达公告", true);
}

// 是否为三天内
function isRecently(date) {
    date = date.replace(/-/g,"/");

    var date1 = new Date(date);
    var nowDate = new Date();
    var num = (nowDate - date1)/(1000*3600*24);
    var days = parseInt(Math.ceil(num));
    if (days <= 3) {
        return "1";
    } else {
        return "0";
    }
}

var divArr = [0,1,2];
$(function () {
    talent();
    $("#data1").hide()
    $("#data2").hide()
    $('.layui-col-md12 .button-3d').click(function(){
        // console.log("$(this).index()"+$(this).index())
        var buttonIndex = $(this).index();
        $(this).addClass('active').siblings('.button-3d').removeClass('active')
        $.each(divArr, function (item, index) {
            // console.log("item" + item);
            // console.log("index" + index);
            // console.log("$(this).index()"+$(this).index())
            if (index == buttonIndex) {
                // console.log("123132")
                if (index == 1) {
                    science();
                } else if (index == 2) {
                    industry();
                } else {
                    talent();
                }
                $("#data"+buttonIndex).show()
            } else {
                // console.log("12313111112")
                $("#data"+index).hide()
            }
        })


        // myChart.setOption(optionArr[$(this).index()], true);
    })


})

function talent() {
    layui.use('table', function(){
        var table = layui.table;

        //创业扶持
        table.render({
            elem: '#start'
            ,height:  274
            ,url: '/law/list' //数据接口
            ,page: false //开启分页
            ,limit:6
            ,request: {
                pageName: 'pageNum' //页码的参数名称，默认：page
                ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
            }
            ,where:{  // 其他参数
                bigType:'rc',
                type:'support',
                orderBy:'date'
            }
            ,cols: [[ //表头
                {field: 'title', title: '标题', width: '47%', templet: function(d){
                    if (isRecently(d.publishDate) == '1') {
                        return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    } else {
                        return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    }
                }}
                ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.areaName+'</span>'
                        } else {
                            return '<span>'+d.areaName+'</span>'
                        }
                    }}
                ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.similarity+'</span>'
                        } else {
                            return '<span>'+d.similarity+'</span>'
                        }
                    }}
                ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                        } else {
                            return '<span>'+d.publishDate+'</span>'
                        }
                    }}
            ]]
            ,response: {
                statusName: 'code' //规定数据状态的字段名称，默认：code
                ,statusCode: 0 //规定成功的状态码，默认：0
                ,countName: 'total' //规定数据总数的字段名称，默认：count
                ,dataName: 'rows' //规定数据列表的字段名称，默认：data
            }
            ,skin:'line'
            ,even:true
        });

        // 办公补贴
        var officeTable = layui.table;
        officeTable.render({
            elem: '#office'
            ,height:  274
            ,url: '/law/list' //数据接口
            ,page: false //开启分页
            ,limit:6
            ,request: {
                pageName: 'pageNum' //页码的参数名称，默认：page
                ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
            }
            ,where:{  // 其他参数
                bigType:'rc',
                type:'officeAllowance',
                orderBy:'date'
            }
            ,cols: [[ //表头
                {field: 'title', title: '标题', width: '47%', templet: function(d){
                        if (isRecently(d.publishDate) == '1') {
                            return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                        } else {
                            return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                        }
                    }}
                ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.areaName+'</span>'
                        } else {
                            return '<span>'+d.areaName+'</span>'
                        }
                    }}
                ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.similarity+'</span>'
                        } else {
                            return '<span>'+d.similarity+'</span>'
                        }
                    }}
                ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                        } else {
                            return '<span>'+d.publishDate+'</span>'
                        }
                    }}
            ]]
            ,response: {
                statusName: 'code' //规定数据状态的字段名称，默认：code
                ,statusCode: 0 //规定成功的状态码，默认：0
                ,countName: 'total' //规定数据总数的字段名称，默认：count
                ,dataName: 'rows' //规定数据列表的字段名称，默认：data
            }
            ,skin:'line'
            ,even:true
        })

        // 生活津贴
        var liveTable = layui.table;
        liveTable.render({
            elem: '#live'
            ,height:  274
            ,url: '/law/list' //数据接口
            ,page: false //开启分页
            ,limit:6
            ,request: {
                pageName: 'pageNum' //页码的参数名称，默认：page
                ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
            }
            ,where:{  // 其他参数
                bigType:'rc',
                type:'dailyAllowance',
                orderBy:'date'
            }
            ,cols: [[ //表头
                {field: 'title', title: '标题', width: '47%', templet: function(d){
                        if (isRecently(d.publishDate) == '1') {
                            return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                        } else {
                            return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                        }
                    }}
                ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.areaName+'</span>'
                        } else {
                            return '<span>'+d.areaName+'</span>'
                        }
                    }}
                ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.similarity+'</span>'
                        } else {
                            return '<span>'+d.similarity+'</span>'
                        }
                    }}
                ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                        } else {
                            return '<span>'+d.publishDate+'</span>'
                        }
                    }}
            ]]
            ,response: {
                statusName: 'code' //规定数据状态的字段名称，默认：code
                ,statusCode: 0 //规定成功的状态码，默认：0
                ,countName: 'total' //规定数据总数的字段名称，默认：count
                ,dataName: 'rows' //规定数据列表的字段名称，默认：data
            }
            ,skin:'line'

            ,even:true
        })


        // 人才招聘
        var talentTable = layui.table;
        talentTable.render({
            elem: '#talent'
            ,height:  274
            ,url: '/law/list' //数据接口
            ,page: false //开启分页
            ,limit:6
            ,request: {
                pageName: 'pageNum' //页码的参数名称，默认：page
                ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
            }
            ,where:{  // 其他参数
                bigType:'rc',
                type:'recruitment',
                orderBy:'date'
            }
            ,cols: [[ //表头
                {field: 'title', title: '标题', width: '47%', templet: function(d){
                        if (isRecently(d.publishDate) == '1') {
                            return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                        } else {
                            return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                        }
                    }}
                ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.areaName+'</span>'
                        } else {
                            return '<span>'+d.areaName+'</span>'
                        }
                    }}
                ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.similarity+'</span>'
                        } else {
                            return '<span>'+d.similarity+'</span>'
                        }
                    }}
                ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                        } else {
                            return '<span>'+d.publishDate+'</span>'
                        }
                    }}
            ]]
            ,response: {
                statusName: 'code' //规定数据状态的字段名称，默认：code
                ,statusCode: 0 //规定成功的状态码，默认：0
                ,countName: 'total' //规定数据总数的字段名称，默认：count
                ,dataName: 'rows' //规定数据列表的字段名称，默认：data
            }
            ,skin:'line'

            ,even:true
        })

        // 薪金补助
        var salaryTable = layui.table;
        salaryTable.render({
            elem: '#salary'
            ,height:  274
            ,url: '/law/list' //数据接口
            ,page: false //开启分页
            ,limit:6
            ,request: {
                pageName: 'pageNum' //页码的参数名称，默认：page
                ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
            }
            ,where:{  // 其他参数
                bigType:'rc',
                type:'remuneration',
                orderBy:'date'
            }
            ,cols: [[ //表头
                {field: 'title', title: '标题', width: '47%', templet: function(d){
                        if (isRecently(d.publishDate) == '1') {
                            return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                        } else {
                            return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                        }
                    }}
                ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.areaName+'</span>'
                        } else {
                            return '<span>'+d.areaName+'</span>'
                        }
                    }}
                ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.similarity+'</span>'
                        } else {
                            return '<span>'+d.similarity+'</span>'
                        }
                    }}
                ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                        if (isRecently(d.publishDate) == '1') {
                            return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                        } else {
                            return '<span>'+d.publishDate+'</span>'
                        }
                    }}
            ]]
            ,response: {
                statusName: 'code' //规定数据状态的字段名称，默认：code
                ,statusCode: 0 //规定成功的状态码，默认：0
                ,countName: 'total' //规定数据总数的字段名称，默认：count
                ,dataName: 'rows' //规定数据列表的字段名称，默认：data
            }
            ,skin:'line'

            ,even:true
        })
    });
}

function science() {
    // 研发补助
    var researchTable = layui.table;
    researchTable.render({
        elem: '#research'
        ,url: '/law/list' //数据接口
        ,page: false //开启分页
        ,limit:10
        ,request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
        }
        ,where:{  // 其他参数
            bigType:'cx',
            type:'developSubsidy',
            orderBy:'date'
        }
        ,cols: [[ //表头
            {field: 'title', title: '标题', width: '47%', templet: function(d){
                    if (isRecently(d.publishDate) == '1') {
                        return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    } else {
                        return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    }
                }}
            ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.areaName+'</span>'
                    } else {
                        return '<span>'+d.areaName+'</span>'
                    }
                }}
            ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.similarity+'</span>'
                    } else {
                        return '<span>'+d.similarity+'</span>'
                    }
                }}
            ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                    } else {
                        return '<span>'+d.publishDate+'</span>'
                    }
                }}
        ]]
        ,response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,statusCode: 0 //规定成功的状态码，默认：0
            ,countName: 'total' //规定数据总数的字段名称，默认：count
            ,dataName: 'rows' //规定数据列表的字段名称，默认：data
        }
        ,skin:'line'
         
        ,even:true
    })
}

function industry() {
    // 工业
    var industrialTable = layui.table;
    industrialTable.render({
        elem: '#industrial'
        ,height:  274
        ,url: '/law/list' //数据接口
        ,page: false //开启分页
        ,limit:6
        ,request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
        }
        ,where:{  // 其他参数
            bigType:'cy',
            type:'industry',
            orderBy:'date'
        }
        ,cols: [[ //表头
            {field: 'title', title: '标题', width: '47%', templet: function(d){
                    if (isRecently(d.publishDate) == '1') {
                        return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    } else {
                        return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    }
                }}
            ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.areaName+'</span>'
                    } else {
                        return '<span>'+d.areaName+'</span>'
                    }
                }}
            ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.similarity+'</span>'
                    } else {
                        return '<span>'+d.similarity+'</span>'
                    }
                }}
            ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                    } else {
                        return '<span>'+d.publishDate+'</span>'
                    }
                }}
        ]]
        ,response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,statusCode: 0 //规定成功的状态码，默认：0
            ,countName: 'total' //规定数据总数的字段名称，默认：count
            ,dataName: 'rows' //规定数据列表的字段名称，默认：data
        }
        ,skin:'line'
         
        ,even:true
    })

    // 服务业
    var serviceTable = layui.table;
    serviceTable.render({
        elem: '#service'
        ,height:  274
        ,url: '/law/list' //数据接口
        ,page: false //开启分页
        ,limit:6
        ,request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
        }
        ,where:{  // 其他参数
            bigType:'cy',
            type:'service',
            orderBy:'date'
        }
        ,cols: [[ //表头
            {field: 'title', title: '标题', width: '47%', templet: function(d){
                    if (isRecently(d.publishDate) == '1') {
                        return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    } else {
                        return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    }
                }}
            ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.areaName+'</span>'
                    } else {
                        return '<span>'+d.areaName+'</span>'
                    }
                }}
            ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.similarity+'</span>'
                    } else {
                        return '<span>'+d.similarity+'</span>'
                    }
                }}
            ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                    } else {
                        return '<span>'+d.publishDate+'</span>'
                    }
                }}
        ]]
        ,response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,statusCode: 0 //规定成功的状态码，默认：0
            ,countName: 'total' //规定数据总数的字段名称，默认：count
            ,dataName: 'rows' //规定数据列表的字段名称，默认：data
        }
        ,skin:'line'
         
        ,even:true
    })

    // 高端制造
    var highEndTable = layui.table;
    highEndTable.render({
        elem: '#highEnd'
        ,height:  274
        ,url: '/law/list' //数据接口
        ,page: false //开启分页
        ,limit:6
        ,request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
        }
        ,where:{  // 其他参数
            bigType:'cy',
            type:'manufacturing',
            orderBy:'date'
        }
        ,cols: [[ //表头
            {field: 'title', title: '标题', width: '47%', templet: function(d){
                    if (isRecently(d.publishDate) == '1') {
                        return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    } else {
                        return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    }
                }}
            ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.areaName+'</span>'
                    } else {
                        return '<span>'+d.areaName+'</span>'
                    }
                }}
            ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.similarity+'</span>'
                    } else {
                        return '<span>'+d.similarity+'</span>'
                    }
                }}
            ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                    } else {
                        return '<span>'+d.publishDate+'</span>'
                    }
                }}
        ]]
        ,response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,statusCode: 0 //规定成功的状态码，默认：0
            ,countName: 'total' //规定数据总数的字段名称，默认：count
            ,dataName: 'rows' //规定数据列表的字段名称，默认：data
        }
        ,skin:'line'
         
        ,even:true
    })

    // 税收
    var taxTable = layui.table;
    taxTable.render({
        elem: '#tax'
        ,height:  274
        ,url: '/law/list' //数据接口
        ,page: false //开启分页
        ,limit:6
        ,request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
        }
        ,where:{  // 其他参数
            bigType:'cy',
            type:'revenue',
            orderBy:'date'
        }
        ,cols: [[ //表头
            {field: 'title', title: '标题', width: '47%', templet: function(d){
                    if (isRecently(d.publishDate) == '1') {
                        return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    } else {
                        return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    }
                }}
            ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.areaName+'</span>'
                    } else {
                        return '<span>'+d.areaName+'</span>'
                    }
                }}
            ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.similarity+'</span>'
                    } else {
                        return '<span>'+d.similarity+'</span>'
                    }
                }}
            ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                    } else {
                        return '<span>'+d.publishDate+'</span>'
                    }
                }}
        ]]
        ,response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,statusCode: 0 //规定成功的状态码，默认：0
            ,countName: 'total' //规定数据总数的字段名称，默认：count
            ,dataName: 'rows' //规定数据列表的字段名称，默认：data
        }
        ,skin:'line'
         
        ,even:true
    })

    // 地价
    var landPriceTable = layui.table;
    landPriceTable.render({
        elem: '#landPrice'
        ,height:  274
        ,url: '/law/list' //数据接口
        ,page: false //开启分页
        ,limit:6
        ,request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
        }
        ,where:{  // 其他参数
            bigType:'cy',
            type:'landPrice',
            orderBy:'date'
        }
        ,cols: [[ //表头
            {field: 'title', title: '标题', width: '47%', templet: function(d){
                    if (isRecently(d.publishDate) == '1') {
                        return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    } else {
                        return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    }
                }}
            ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.areaName+'</span>'
                    } else {
                        return '<span>'+d.areaName+'</span>'
                    }
                }}
            ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.similarity+'</span>'
                    } else {
                        return '<span>'+d.similarity+'</span>'
                    }
                }}
            ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                    } else {
                        return '<span>'+d.publishDate+'</span>'
                    }
                }}
        ]]
        ,response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,statusCode: 0 //规定成功的状态码，默认：0
            ,countName: 'total' //规定数据总数的字段名称，默认：count
            ,dataName: 'rows' //规定数据列表的字段名称，默认：data
        }
        ,skin:'line'
        
        ,even:true
    })

    // 租金
    var rentTable = layui.table;
    rentTable.render({
        elem: '#rent'
        ,height:  274
        ,url: '/law/list' //数据接口
        ,page: false //开启分页
        ,limit:6
        ,request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
        }
        ,where:{  // 其他参数
            bigType:'cy',
            type:'rental',
            orderBy:'date'
        }
        ,cols: [[ //表头
            {field: 'title', title: '标题', width: '47%', templet: function(d){
                    if (isRecently(d.publishDate) == '1') {
                        return '<a href="#" style="font-weight: bold" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    } else {
                        return '<a href="#" onclick="addTabByChild(\'/law/showContent/'+d.id+'\',\''+d.id+'\',\''+d.title+'\')">'+d.title+'</a>'
                    }
                }}
            ,{field: 'areaName', title: '区域', width: '14%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.areaName+'</span>'
                    } else {
                        return '<span>'+d.areaName+'</span>'
                    }
                }}
            ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.similarity+'</span>'
                    } else {
                        return '<span>'+d.similarity+'</span>'
                    }
                }}
            ,{field: 'publishDate', title: '发布时间', width: '24%', templet:function (d) {
                    if (isRecently(d.publishDate) == '1') {
                        return '<span style="font-weight: bold">'+d.publishDate+'</span>'
                    } else {
                        return '<span>'+d.publishDate+'</span>'
                    }
                }}
        ]]
        ,response: {
            statusName: 'code' //规定数据状态的字段名称，默认：code
            ,statusCode: 0 //规定成功的状态码，默认：0
            ,countName: 'total' //规定数据总数的字段名称，默认：count
            ,dataName: 'rows' //规定数据列表的字段名称，默认：data
        }
        ,skin:'line'
        ,even:true
    })
}