$(function () {
    getNav();
    getProductList();


    // 滚动一定距离搜索框定位顶部
    var flag = true;
    $(window).scroll(function (event) {

        var winPos = $(window).scrollTop();

        if (flag && winPos > 100) {

            $("#seach").css({
                position: "fixed",
                top: -100,
                left: 0,
            })
            $("#seach").animate({
                top: 0,
            },1000,"easeOutBack")

            flag = false;
        }

        if (winPos < 100) {

            $("#seach").css({
                position: "relative",

            })
            flag = true;
        }
    });

    // 返回顶部操作
    $(".back-top").click(function (event) {  
        event.preventDefault();
        // console.log("wo");
        $(document).toTop();
    })


})

function getNav() {
    $.ajax({
        url: 'http://mmb.ittun.com/api/getindexmenu',
        success: function (data) {
            // console.log(data);
            var html = template('navTmp', data);
            $('#nav .row').html(html);


            // var id=data.indexmenuId;

            $('#nav .row').on('click', 'div', function (e) {
                console.log(this)
                if ($(this).data('id') == "7") {
                    if (!$(this).next().hasClass("convert")) {


                        $(this).nextAll().addClass('convert').css('display', 'none');
                    } else {

                        $(this).nextAll().removeClass('convert').css('display', 'block');
                    }

                }

                if ($(this).data('id') == "4"){
                    e.preventDefault();
                    location.assign("discount.html")


                }


            })

        }
    })
}

function getProductList() {
    $.ajax({
        url: 'http://mmb.ittun.com/api/getmoneyctrl',
        success: function (data) {
            console.log(data);
            var html = template('productlistTmp', data);
            $('#productlist').html(html);
        }
    })
}