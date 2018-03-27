var mmm;
$(function(){
    mmm=new Mmm();
    //调用获取商城列表的方法
    mmm.getShoppingList();
})
//声明一个构造函数
var Mmm=function(){

}
//构造函数原型的方法
Mmm.prototype={
    getShoppingList:function(){
        //调用API
        $.ajax({
            url:'http://mmb.ittun.com/api/getsitenav',
            dataType:'json',
            success:function(data){
                console.log(data);
                //调用模板引擎的方法渲染页面
                var html=template('shoppingListTmp',data);
                //把html渲染到页面
                console.log(html);
                $('#main .link').html(html);
            }
        })
    }
}