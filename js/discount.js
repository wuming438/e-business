
var mmm;

//默认页数
var page = 1;

var pageClude=1;

$(function(){

    mmm = new Mmm();
   
    //调用轮播图的方法
    mmm.getCarousel();
    //调用垂直滚动方法
    mmm.setVerticalRoll();
    //调用获取的数据
    mmm.getData();
    //调用分页方法
     mmm.getClick();

});


var Mmm = function(){


}

Mmm.prototype = {
  //图片轮播图及回弹方法
  getCarousel:function(){
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval: 1000 //自动轮播周期，若为0则不自动播放，默认为0；  让轮播图支持自动轮播
    });
    //回弹效果
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });
  },
  //海淘头条垂直滚动效果
   setVerticalRoll: function(){  
    //demo1的内部元素赋值给demo2也可以自己在写一遍  
    var demo=document.getElementById("demo");   
    var demo2=document.getElementById("demo2");   
    var demo1=document.getElementById("demo1");   
    //demo1的内部元素赋值给demo2也可以自己在写一遍  
    demo2.innerHTML=demo1.innerHTML ;  
    //垂直滚动函数  
    function Marquee(){  
        //如果demo2的距离demo的上边距减去demo的ScrollTop<=0，代表内部元素块全部移动到了demo的上边距之上  
        if(demo2.offsetTop-demo.scrollTop<=0){
               //重新设置scrollTop高度，可以设置为0或者自己调整  
            demo.scrollTop-=demo1.offsetHeight;   
        } 
          
        else{   
            //代表内部元素块没有全部移动到demo上方，继续移动  
            demo.scrollTop++ ;  
        }   
    }  
    //设置定时器0.2秒重复执行一次函数   
    var MyMar=setInterval(Marquee,30);  

   },
   getData:function(){
       $.ajax({
           url:'http://mmb.ittun.com/api/getmoneyctrl',
           data:{
               pageid: page,
           },
           success:function(data) {
               
              
               pageClude = Math.ceil(data.totalCount/data.pagesize);
               //console.log(zongyeshu);
               var arr = [];
               for(var i = 1; i<=pageClude;i++){
        
               arr.push(i);
               
                }
                var obj = {
                    pageClude: arr,
                    page: page
               }
               
        
            var html = template("pages",obj);
            //console.log(data.productId);
            //console.log(obj.page);
             //console.log(html);
             $('#paging').html(html);
               var html = template("product",data);
               //console.log(html);
               $('#contain .mui-table-view').html(html);

               $('.mui-table-view a img').addClass("mui-media-object  mui-pull-left small");

               var html = template("moodsBody",data);
               $("#moods-body #moods-list .mui-scroll").html(html);

           }
       })
   },
   //分页效果
   getClick:function(){
       $("#paging").on("change",".form-control",function(){
        
           page=$("option:selected").attr("data-ye");
            
           mmm.getData();
       })
      
    $("#paging").on("click",".mui-previous bottom",function(){
        
        if(page<=2){
            page=1;
            mmm.getData();
        }else{
            page--;
            mmm.getData();
        }
     
    })
    $("#paging").on("click",".mui-next bottom",function(){
        if(page>=pageClude.length){
            page =pageClude.length;
            mmm.getData();
        }else {
            page--;
            mmm.getData();
        }
    })

   }
   

} 

$(".back-top").click(function (event) {
 
    event.preventDefault();
    //console.log("wo");
    $(document).toTop();

})