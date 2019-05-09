(function(){
    var page=1;//页码
    var limit=13;//数量
    var acount=0;//总页数

    pageContent();
    function pageContent(){
        $.ajax({
            url: xaUrl + "api/data/blocks",
            dataType: "json",
            data:{
                "page" :page,
                "limit":limit
            },
            success: function(resault) {
                var data=resault.data;
                //块的范围
                $("#viewAll-top-num").html("块 #"+data.lists.pop().block_number+" To "+"#"+data.lists[0].block_number);
                //块的内容
                $("#list").html(template('listContent',{data:data.lists}));
                //隐藏loading
                $(".loading").css("display","none")
                //页数
                acount=parseInt(data.total/limit);//总页数
                if(data.total%limit){
                    acount++;//余数不为零页数就加+1
                }
                //内容为空总页数为1
                if(!acount){
                    acount=1
                }
                var pageNum=" page "+page+" of "+acount;
                $("#pagesNum").html(pageNum);
            }
        });

    }
    //下一页
    $("#next").click(function() {
        page+=1;
        if(page > acount) {
            page=acount;
            return;
        } else{
            pageContent();
        }
    });
    //上一页
    $("#prev").click(function() {
        page-=1;
        if(page <= 0) {
            page = 1;
            return;
        } else{
            pageContent();
        }

    });
    //首页
    $("#homePage").click(function(){
        if(page=="1"){
            return ;
        }else{
            page=1;
            pageContent();
        }
    })
    //最后一页
    $("#endPage").click(function(){
        if(page==acount){
            return ;
        }else{
            page=acount;
            pageContent();
        }
    })
})()