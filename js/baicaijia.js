var baicai;
var id=1;
$(function(){
    baicai=new Baicai();
    baicai.banner();
    baicai.getNavData();
    baicai.getCategory();
    baicai.jump();
})
var Baicai=function(){

}
Baicai.prototype={
    banner:function(){
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 6,
            // slidesPerColumn: 2,
            spaceBetween: 30,
            pagination: {
            el: '.swiper-pagination',
            // clickable: true,
            },
        });
        $('.swiper-wrapper .swiper-slide a').removeClass('active');
        // 第一次载入获取数据
        $(this).addClass('active');
        $.ajax({
            url:'http://mmb.ittun.com/api/getbaicaijiaproduct',
            data:{titleid:id},
            success:function(data){
                console.log(data);
                var html=template('categoryTmp',data);
                $('.productList').html(html);
            }
        })
    },
    getNavData:function(){
        $.ajax({
            url:'http://mmb.ittun.com/api/getbaicaijiatitle',
            success:function(data){
                // console.log(data);
                var html=template('navTmp',data);
                $('#nav .swiper-wrapper').html(html);
                baicai.banner();
                // getCategory();
            }
        })
    },
    getCategory:function(id){
        $('.swiper-wrapper').on('click','.swiper-slide a',function(e){
            e.preventDefault();
            id=$(this).data('id');
            // console.log(id);
            $('.swiper-wrapper .swiper-slide a').removeClass('active');
            $(this).addClass('active');
            $.ajax({
                url:'http://mmb.ittun.com/api/getbaicaijiaproduct',
                data:{titleid:id},
                success:function(data){
                    console.log(data);
                    var html=template('categoryTmp',data);
                    $('.productList').html(html);
                }
            })
        })
    },
    jump:function(){
        $('.productList').on('click','.left>a',function(e){
            e.preventDefault();
            var productId=$(this).data('id');
            console.log(productId);
            // window.location.href='?productId='+productId;
        })
    }
}