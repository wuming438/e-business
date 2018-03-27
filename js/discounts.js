var manman ;
$(function(){
    manman = new Manman();
    //调用函数
    manman.productLogo();
})
//创建构造函数
var Manman = function(){

}

//原型对象
Manman.prototype = {
    //创建模板
    productLogo:function(){
        $.ajax({
            type:'get',
            url:'http://mmb.ittun.com/api/getcoupon',
            success:function(data){
                // console.log(data);
                var html = template('productLogoTmp', data);
                $('#main .mui-row').html(html);
            }  
        })
        
    },
}