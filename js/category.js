var mmm;
$(function () {
    mmm = new Mmm();
    mmm.getCategoryTitle();
    mmm.getCategory();
    mmm.getCategoryById();
});
Mmm = function () {

};
Mmm.prototype = {
    //获取一级标题
    getCategoryTitle: function () {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getcategorytitle',
            success: function (data) {
                var html = template('listclassTmp', data);
                $('.panel-group').html(html);
            }
        });
    },
    //获取二级标题
    getCategory: function () {
        //一级标题的点击事件
        $('.panel-group').on('click', '.title', function () {
            //获取存在a标签的一级标签id值
            var titleid = $(this).data("id");
            //切换上下箭头,默认为down
            if ($(this).children().hasClass('fa-angle-down')) {
                //重置为down
                $('.title span').removeClass().addClass("fa fa-angle-down");
                //改变this的箭头为up
                $(this).children().removeClass().addClass("fa fa-angle-up");
                $.ajax({
                    url: 'http://mmb.ittun.com/api/getcategory',
                    data: {
                        titleid: titleid
                    },
                    success: function (data) {
                        console.log(data);
                        var html = template('getcategoryTmp', data);
                        $('.panel-body ul').html(html);
                        $(this).parent().parent().next().collapse();
                    }
                });
            } else if ($(this).children().hasClass('fa fa-angle-up')) {
                $(this).children().removeClass("fa fa-angle-up").addClass("fa fa-angle-down");
            }
        });
    },
    //点击二级标题跳转
    getCategoryById: function () {
        $('.panel-group').on('click', 'li', function () {
            //获取二级标题的id
            var categoryid = $(this).data('id');
            //为存在本地做准备
            var ID = [],
                result = {};
            $.ajax({
                url: 'http://mmb.ittun.com/api/getcategorybyid',
                data: {
                    categoryid: categoryid,
                },
                success: function (data) {
                    console.log(data);
                    result = {
                        categoryId: data.result[0].categoryId,
                        category: data.result[0].category,
                        titleId: data.result[0].titleId,
                    };
                    ID.push(result);
                    ID = JSON.stringify(ID);
                    localStorage.setItem("ID", ID);
                    window.location.href = 'poductlist.html';
                }
            });
        });
    }
};