var manman;
var id;
var length;
var point;
$(function(){
    manman = new Manman();
    id = getQueryString('couponid');
    // console.log(id);
    manman.couponproduct(id);

    manman.getTitle();
    manman.lunbao();
})
var currentId ;
//创建构造函数
var Manman = function(){

}

Manman.prototype ={

    couponproduct:function(id){
        $.ajax({
            data:{couponid:id},
            type:'get',
            url:'http://mmb.ittun.com/api/getcouponproduct', 
            success:function(data){
                // console.log(data);
                length = data.result.length;

                var html = template('couponproductTmp', data);
                $('#main .mui-table-view').html(html);
                
                var html = template('lunbaoTmp', data);
                $('#lunbao').html(html);
                point = (length * 100) + "%";
                $(".carousel-inner").css("width",point);

                $('.carousel').carousel({
                    interval: 1000
                })
            }
        })
    },
    getTitle:function(){
        var title;
        if(id==0){
            title = "肯德基优惠券";
        }else if(id ==1){
            title = "必胜客优惠券";
        }else if(id ==2){
            title = "版约翰优惠券";
        }else{
            title = "哈根达斯优惠券";
        }
        $(".middle").html(title);
        $(".mingcheng").html(title);
    },
    lunbao:function(){
        $('.mui-table-view').on('click','.lunbao-click',function(){
            $('#lunbao').css("display","flex");
            // currentId=$(this).children("a").data("couponproductid");
            currentId = $(this).index();
            // console.log(currentId);
            var sleft = -((currentId) * 100);
            $(".carousel-inner").animate({
                left:sleft + "%"
            });

        })
        
        $('#lunbao').on('click',function(){
            $('#lunbao').css("display","none");
        })

        $("#lunbao").on("click",".right",function(e){
            e.stopPropagation();
            // console.log(currentId);
            var sleft = -((++currentId) * 100);
            if(sleft <= -(length-1)*100){
                return false;
            }
            $(".carousel-inner").animate({
                left:sleft + "%"
            });
            
        })
        $("#lunbao").on("click",".left",function(e){
            e.stopPropagation();
            // console.log(currentId);
            if(currentId<= 0){
                return false;
            }
            var sleft = -((--currentId) * 100);
            
            $(".carousel-inner").animate({
                left:sleft + "%"
            });
        })
  
    }

   
}

//获取url地址栏的参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
}
