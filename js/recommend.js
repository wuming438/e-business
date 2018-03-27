var mai;
var id;
$(function(){
    mai= new Mai();
    id=getQueryString('productid');
    // console.log(id);
    mai.searchProduct();
    
})


var Mai =function(){

}

Mai.prototype ={
    //获取商品的详情页
    searchProduct:function(){
           $.ajax({
            url:'http://mmb.ittun.com/api/getmoneyctrlproduct',
            data:{productid:id},
            success:function(data){
                console.log(data);
               var  html = template("detailTmp",data);
               $("#detail-form").html(html);
               var html2 = template('nameTmp', data);
               $('#nav-bottom').html(html2);
            }

           })
    },

}
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}