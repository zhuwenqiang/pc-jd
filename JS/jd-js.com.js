/*选择城市代码*/
(function () {
    var to = document.getElementById("to");
    var toDiv = document.getElementById("toDiv");
    document.body.onclick = function (e) {
        e = e || window.event;//鼠标事件对象e处理兼容
        e.target = e.target || e.srcElement;//目标源兼容
        if (e.target.id === "to" || e.target.tagName.toLowerCase() === "span" && e.target.parentNode.id === "to") {
            if (toDiv.style.display === "none") {
                toDiv.style.display = "block";
            } else {
                toDiv.style.display = "none";
            }
            return;
        }

        if (e.target.id === "toDiv") {
            return;
        }

        toDiv.style.display === "none";
    };
})();


/*焦点图*/
(function () {
//先获取input文本框和要显示的li列表；
    var ipt = document.getElementById("ipt");
    var searchList = document.getElementById("searchList");
//判断文本框中是否有内容
    ipt.onfocus = ipt.onkeyup = function () {
        var val = this.value.replace(/(^ +| +$)/g, ""); //匹配获取文本框中的内容，去除首位空格；
        searchList.style.display = val.length === 0 ? "none" : "block";
    };
    //以上代码实现输入内容显示ul列表

    //使用时间委托给body绑定点击事件，通过事件源做相应处理
    document.body.onclick = function (e) {
        e = e || window.event;
        var tar = e.target || e.srcElement;

        if (tar.tagName.toLowerCase() === "li" && tar.parentNode.id === "searchList") {
            ipt.value = tar.getElementsByTagName("a")[0].innerHTML;
            searchList.style.display = "none";
            return;
        }
        //->如果点击的是li下的a标签：
        if (tar.tagName.toLowerCase() === "a" && tar.parentNode.parentNode.id === "searchList") {
            ipt.value = tar.innerHTML;
            searchList.style.display = "none";
            return;
        }
        //如果点击文本框，我们什么都不做
        if (tar.id === "ipt") {
            return;
        }
        searchList.style.display = "none";
    }
})();
/*点击span不显示项目*/

/*轮播图*/
(function () {
//数据源
    var ary = ["img/img1.jpg", "img/img4.jpg", "img/img6.jpg", "img/img5.jpg", "img/img3.jpg", "img/img2.jpg"];
//定义初始变量
    var autoTimer = null;
    var step = 0;//当前图片的索引
    var count = ary.length;//实际的图片的数量
//获取要操作的元素
    var inner = document.getElementById("inner");
    var imgList = inner.getElementsByTagName("img");
    var tip = document.getElementById("tip");
    var tipList = tip.getElementsByTagName("li");
    var btnLeft = document.getElementById("btnLeft");
    var btnRight = document.getElementById("btnRight");

    //数据绑定
    bindData();
    function bindData() {
        var str = "";
        for (var i = 0; i < ary.length; i++) {
            str += "<div><img src='' trueImg='" + ary[i] + "'/></div>";//循环4个div标签和4张图片；
        }
        str += "<div><img src='' trueImg='" + ary[0] + "'/></div>";
        inner.innerHTML = str;
        inner.style.width = (count + 1) * 730 + "px";
        //默认选择第一个焦点选中样式；
        selectTip()
    }

    //图片延时加载
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0; i < imgList.length; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    animate(curImg, {opacity: 1}, 500);
                }
            }(i);
        }
    }

//实现自动轮播无缝轮播滚动
    var autoTimer = window.setInterval(autoMove, 4000);

    function autoMove() {
        step++;
        if (step > count) {//第七章添加图片索引大于实际总图片数
            step = 1;
            inner.style.left = 0;
        }
        animate(inner, {left: step * -730}, 500, 3);
        selectTip();
    }

//实现焦点样式的选中
    function selectTip() {
        var tempStep = step;//现在是哪张图片谁也不知道，将现在这张图片的索引=当前的焦点的索引
        tempStep >= tipList.length ? tempStep = 0 : null;
        for (var i = 0; i < tipList.length; i++) {
            tipList[i].className = i === tempStep ? "bg" : null;
        }
    }

//实现点击切换轮播图
    tipMove();
    function tipMove() {
        for (var i = 0; i < tipList.length; i++) {
            var curTip = tipList[i];
            curTip.index = i;
            curTip.onclick = function () {
                window.clearInterval(autoTimer);
                step = this.index;
                animate(inner, {left: -step * 730}, 300);
                selectTip();
                autoTimer = window.setInterval(autoMove, 2000);
            }
        }
    }

//点击左右按钮实现切换图片
    btnRight.onclick = function () {
        window.clearInterval(autoTimer);
        autoMove();
        autoTimer = window.setInterval(autoMove, 2000);
    };
//点击左侧按钮切换轮播图
    btnLeft.onclick = function () {
        window.clearInterval(autoTimer);
        step--;
        if (step < 0) {
            step = count - 1;
            inner.style.left = -count * 730 + "px";
        }
        animate(inner, {left: -step * 730}, 300);
        selectTip();
        autoTimer = window.setInterval(autoMove, 2000);

    };

    //实现滑过显示左右按钮
    outer.onmouseover = function () {
        btnLeft.style.display = "block";
        btnRight.style.display = "block";
    };
    outer.onmouseout = function () {
        btnLeft.style.display = "none";
        btnRight.style.display = "none";
    }
})();

/*第一屏右侧*/


/*第二屏点击选择图*/
(function () {
    var ary = ["img/1.jpg", "img/2.jpg", "img/3.jpg",
        "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg",
        "img/8.jpg", "img/9.jpg", "img/10.jpg", "img/11.jpg", "img/12.jpg",
        "img/13.jpg", "img/14.jpg", "img/15.jpg", "img/16.jpg", "img/1.jpg",
        "img/2.jpg", "img/3.jpg", "img/4.jpg"];
    var rightInner = document.getElementById("rightInner");
    var right = document.getElementById("slider-right");
    var left = document.getElementById("slider-left");
    var step = 0;//图片索引
    /*动态绑定图片*/
    bindData();
    function bindData() {
        var str = "";
        for (var i = 0; i < ary.length; i++) {
            str += "<div><img src='" + ary[i] + "'/></div>"
        }
        rightInner.innerHTML = str;
    }

    function move() {
        step++;
        if (step > 4) {
            step = 1/**/;
            rightInner.style.left = 0;
        }
        animate(rightInner, {left: step * -1000}, 300);
    }

    /*实现右点击*/
    right.onclick = function () {
        move();
    };
    /*实现左侧点击*/
    left.onclick = function () {
        step--;
        if (step < 0) {
            step = 3;
            rightInner.style.left = -4000 + "px";
        }
        animate(rightInner, {left: -step * 1000}, 300);
    };
})();
/*----------------------猜你喜欢=动画----------------------------*/
(function () {

    var anm = document.getElementById("anm");//要运动的元素
    var aDiv = document.getElementById("aDiv");//总路程
    var step = 10;
    var youLike = document.getElementById("youLike");
    youLike.onmouseenter = function () {
        var timer = window.setInterval(
            function () {
                var curL = utils.getCss(anm, "left");
                var tarLeft = utils.getCss(aDiv, "width") - anm.offsetWidth;
                if (curL>= tarLeft) {
                    utils.setCss(anm, "left", tarLeft);
                    window.clearInterval(timer);//到目的地后让定时器清除，这样就达成了我们的目的;
                }
                utils.setCss(anm, "left", curL + step);
            }, 1);
    };
    youLike.onmouseleave = function () {
        utils.setCss(anm, "left", -364);
        console.log()
    };
})();

/*回到顶部*/
(function(){
    var but6=document.getElementById("but6");
    but6.onclick=function(){
        document.documentElement.scrollTop=0;
        document.body.scrollTop=0;
    }



})();