var mmm, productid, categoryid;
$(function () {
    mmm = new Mmm();
    productid = getQueryString("productid");
    mmm.getProduct();
    mmm.getCommont();
    mmm.pathTo();
});
Mmm = function () {

};
Mmm.prototype = {
    getProduct: function () {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getproduct?productid=' + productid,
            success: function (data) {
                console.log(data);
                $('.breadcrumb .active a').html(data.result[0].productName);
                var html = template('productTmp', data);
                $('.introduction').html(html);
                var html1 = template('bjShopTmp', data);
                // console.log(html1);
                $('#commont').html(html1);
            }
        })
    },
    getCommont: function () {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getproductcom?productid=' + productid,
            success: function (data) {
                console.log(data);
                categoryid = data.result[0].categoryId;
                console.log(categoryid);
                var html = template('commentTmp', data);
                $('td.r').html(html);
                $.ajax({
                    url: 'http://mmb.ittun.com/api/getcategorybyid?categoryid=' + categoryid,
                    success: function (data) { 
                        $('.breadcrumb .two a').html(data.result[0].category);
                    }
                }); 
            }
        })
    },
    pathTo:function () {
        $('.breadcrumb .two a').on('click',function (e) {
            console.log(e);
            e.preventDefault();
            window.location.href='poductlist.html';
        })
    },
    
};
// 取出url参数的函数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
