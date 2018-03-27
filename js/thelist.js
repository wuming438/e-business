$(function(){

    // 取到url里面的参数
    var brandtitleid = getQueryString("brandtitleid");
    var brandname = getQueryString("brandname");

    // 改掉对应品牌标题
    $("#main .title").html(brandname+" 产品销量排行");
    $("#main .pinglun").html(brandname+"最有用的用户评论");

    // 请求数据渲染页面
    $.ajax({
        url: "http://mmb.ittun.com/api/getbrandproductlist",
        data: {
            brandtitleid: brandtitleid,
            pagesize: 4,
        },

        //商品销量榜
        success: function(backdata){
            console.log(backdata);
            var data = backdata; 
            var html = template("list",backdata);
            $(".list ul").html(html);
            var productId = backdata.result[0].productId;

            $.ajax({
                url: "http://mmb.ittun.com/api/getproductcom",
                data: {
                    productid : 1,
                },

                // 商品评论
                success: function(backdata){
                    // console.log(backdata);
                    var html = template("pinglun",backdata);                 
                    $(".ping-list ul").html(html);
                    var htmlone = template("one-photo",data);
                    $(".ping-list ul li .ping-top").html(htmlone);
                                     
                                    
                }
            })    
        }
    })
})


// 取出url参数的函数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}