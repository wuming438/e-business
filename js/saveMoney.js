var mai;

$(function(){
    mai= new Mai();
    mai.getProductList();
    mai.searchProduct();
    
})


var Mai =function(){

}

//1,定义一个全局页码数
var page =1;

Mai.prototype = {
    //获取商品数据
    getProductList:function(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getmoneyctrl',
            //  data:{id:id},
            success:function(data){
             
                var html =template("productlistTmp",data);

                $('#productlist').html(html);
            }
        })

    },
    
    //搜索商品
    searchProduct:function(){
        //1,给商品添加点击事件
        $('#productlist').on('click','.search-product',function(e){
            e.preventDefault();
            var id = $(this).data('id');
            console.log(id);
            window.location.href="recommend.html?productid="+id;

    
     })

     }
        
}





