var mmm;
$(function () {
    mmm = new Mmm();
    mmm.getData();
    //返回顶部
    $(".back-top").click(function (event) {
        event.preventDefault();
        console.log("wo");
        $(document).toTop();
    
    })



})

var Mmm = function () {

}

Mmm.prototype = {
    //调用首页数据

    getData: function () {
        // alert('cccc');
        $.ajax({
            url: 'http://mmb.ittun.com/api/getinlanddiscount',
            success: function (data) {

                console.log(data.result[0].productImg)
                //调用模板一引擎
                // console.log(data.result[0].productId);
                var html = template('productListTmp', data);
                $('.aaa').html(html);
                // console.log(data.result);
            }
        })
    },
    //点击回到顶部
    
}
//懒加载实现

// （一）获取窗口、窗口滚动和元素距离窗口顶部的偏移高度，计算元素是否出现在窗口可视范围内
// function isShow($el) {
//     var winH = $(window).height(), //获取窗口高度
//         scrollH = $(window).scrollTop(), //获取窗口滚动高度
//         top = $el.offset().top; //获取元素距离窗口顶部偏移高度
//     if (top < scrollH + winH) {
//         return true; //在可视范围
//     } else {
//         return false; //不在可视范围
//     }
// }

// // //（二）监听窗口滚动事件，检查元素是否在可视范围内;
// $(window).on('scroll', function () { //监听滚动事件
//     checkShow();
//     console.log(1);

// })
// checkShow();

// function checkShow() { //检查元素是否在可视范围内
//     $('.product-img>img').each(function () { //遍历每一个元素
//         var $cur = $(this);
//         // if (!isLoaded($cur)) {
//         //     return;
//         // } //判断是否已加载
//         if (isShow($cur)) {
//             setTimeout(function () {
//                 showImg($cur);
//             }, 300) //设置时间是为了更好的看出效果
//         };
//     });
// }
// // //（三）元素显示的时候把之前的默认照片替换成data-src里的照片。
// function showImg($el) {
//     $el.attr('src', $el.attr('data-src'));
//     $cur.data('isloaded', true);
// }
// getTop = function () {
//     //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失
//     //当点击跳转链接后，回到页面顶部位置
//     $(".getTop").click(function (e) {
        
//         e.preventDefault()
        
//         $('html').animate({
//             scrollTop: 0
//         }, 1000);
//         return false;
//     });
// }
// getTop();
