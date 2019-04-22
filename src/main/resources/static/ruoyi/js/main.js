/**
 main.html的js方法
 */

var rcTableName = "rc_feature_dict_dd";
var cxTableName = "cx_feature_dict_dd";
var cyTableName = "cy_feature_dict_dd";

var rcKeyWords = "rc_key_words";
var cyKeyWords = "cy_key_words";
var cxKeyWords = "cx_key_words";

var rcSimilaryNameArr =  ['创业扶持', '办公补贴', '生活', '招聘补助', '薪金', '住房', '创新', '人才'];
var cxSimilaryNameArr =  ['外资', '内资', '资奖励'];
var cySimilaryNameArr =  ['现代医药', '新材料', '高端装备', '数字经济', '亩产', '半导体','产业引导基金','土地', '准入','促进', '产业'];

var rcSimilaryColumnArr = ['support', 'office_allowance', 'daily_allowance', 'recruit_remuneration',
    'remuneration', 'housing', 'innovation', 'rencai'];

var cxSimilaryColumnArr = ['waizi', 'neizi', 'zijiangli'];

var cySimilaryColumnArr = ['yiyao', 'cailiao', 'zhuangbei', 'shuzijingji', 'muchan', 'bandaoti', 'yindaojijin',
    'tudi', 'zhunru', 'cujin','domain']

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

    $.ajax({
        url: "/law/getKeyWordList",
        async: false,
        success:function (d) {
            $.each(d.data, function (index, item) {
                if (item.bigTypeCode == 'rc') {
                    rcSimilaryNameArr = item.smallType.split(",");
                }
                if (item.bigTypeCode == 'cx') {
                    cxSimilaryNameArr = item.smallType.split(",");
                }
                if (item.bigTypeCode == 'cy') {
                    cySimilaryNameArr = item.smallType.split(",");
                }
            })
        }
    })

    // 首先进行内容的填充
    var rcStr = "";
    $.each(rcSimilaryNameArr, function (index, item) {
        rcStr += '<div class="layui-col-md6">';
        rcStr += '<div class="layui-card">';
        rcStr += '<div class="layui-card-header"><span style="font-weight: bold">'+rcSimilaryNameArr[index]+'</span><a href="#" style="margin-left: 75%;" onclick="addTabByChild(\'/law/toList?bigType=rc&type='+item+'\',\'1\',\''+rcSimilaryNameArr[index]+'\')">更多>></a></div>';
        rcStr += '<div class="layui-card-body">';
        rcStr += '<table id="rc'+index+'"></table>'
        rcStr += '</div>'
        rcStr += '</div>'
        rcStr += '</div>'
    });
    $("#rc").html(rcStr);


    var cxStr = "";
    $.each(cxSimilaryNameArr, function (index, item) {
        cxStr += '<div class="layui-col-md6">';
        cxStr += '<div class="layui-card">';
        cxStr += '<div class="layui-card-header"><span style="font-weight: bold">'+cxSimilaryNameArr[index]+'</span><a href="#" style="margin-left: 75%;" onclick="addTabByChild(\'/law/toList?bigType=cx&type='+item+'\',\'1\',\''+cxSimilaryNameArr[index]+'\')">更多>></a></div>';
        cxStr += '<div class="layui-card-body">';
        cxStr += '<table id="cx'+index+'"></table>'
        cxStr += '</div>'
        cxStr += '</div>'
        cxStr += '</div>'
    });
    $("#cx").html(cxStr);

    var cyStr = "";
    $.each(cySimilaryNameArr, function (index, item) {
        cyStr += '<div class="layui-col-md6">';
        cyStr += '<div class="layui-card">';
        cyStr += '<div class="layui-card-header"><span style="font-weight: bold">'+cySimilaryNameArr[index]+'</span><a href="#" style="margin-left: 75%;" onclick="addTabByChild(\'/law/toList?bigType=cy&type='+item+'\',\'1\',\''+cySimilaryNameArr[index]+'\')">更多>></a></div>';
        cyStr += '<div class="layui-card-body">';
        cyStr += '<table id="cy'+index+'"></table>'
        cyStr += '</div>'
        cyStr += '</div>'
        cyStr += '</div>'
    });
    $("#cy").html(cyStr);



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

    $.each(rcSimilaryNameArr, function (index, item) {
        tableInit('rc'+index, rcTableName, rcKeyWords, item)
    })
}

function science() {
    $.each(cxSimilaryNameArr, function (index, item) {
        tableInit('cx'+index, cxTableName, cxKeyWords, item)
    })
}

function industry() {
    $.each(cySimilaryNameArr, function (index, item) {
        tableInit('cy'+index, cyTableName, cyKeyWords, item)
    })
}

function tableInit(id, tableName, keyWords, similaryColumn) {
    var researchTable = layui.table;
    researchTable.render({
        elem: '#'+id
        ,url: '/law/selectLawListByDynamic' //数据接口
        ,page: false //开启分页
        ,height:  274
        ,limit:6
        ,request: {
            pageName: 'pageNum' //页码的参数名称，默认：page
            ,limitName: 'pageSize' //每页数据量的参数名，默认：limit
        }
        ,where:{  // 其他参数
            keyColumn:keyWords,
            tableName:tableName,
            similarityName:similaryColumn
        }
        ,cols: [[ //表头
            {field: 'title', title: '标题', width: '62%', templet: function(d){
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
            // ,{field: 'similarity', title: '相似度', width: '15%', templet:function (d) {
            //         if (isRecently(d.publishDate) == '1') {
            //             return '<span style="font-weight: bold">'+d.similarity+'</span>'
            //         } else {
            //             return '<span>'+d.similarity+'</span>'
            //         }
            //     }}
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