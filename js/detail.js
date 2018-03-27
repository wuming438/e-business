var mmm;
$(function () {
    var mmm = new Mmm();

    mmm.getDetail();
    $(".back-top").click(function (event) {
        event.preventDefault();
        console.log("wo");
        $(document).toTop();
    })
})
// 调用获取地址栏参数的方法 获取搜索页面传过来的搜索内容
id = getQueryString('productid');
console.log(id);
var Mmm = function () {

}
Mmm.prototype = {
    // 获取api数据
    getDetail: function () {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getdiscountproduct',
            data: {
                productid: id
            },
            success: function (data) {
                console.log(data);

                // var data = JSON.stringify(data);
                // 调用模板引擎
                var html = template('detailTmp', data);
                $('#detail-form').html(html);
                var html2 = template('nameTmp', data);
                $('#nav-bottom').html(html2);
                document.title = data.result[0].productName;
                
            }
        })
    },
    
}

//获取地址栏的参数方法
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}