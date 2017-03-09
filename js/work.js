/**
 * 轮播图
 * @params {object} option 要操作的dom元素
 * */
var scrollMove = function(option){
    /**
     * @params {object} leftNav 轮播图左边的切换按钮
     * @params {object} rightNav 轮播图右边的切换按钮
     * @params {object} imgBox 图片并排的大容器
     * @params {object} width 轮播图最外层容器的宽度
     * @params {object} buttons 轮播图的控制按钮
     *
     * */
    this.leftNav = option.leftNav;
    this.rightNav = option.rightNav;
    this.imgBox = option.imgBox;
    this.width = option.width;
    this.buttons = option.buttons;
    this.index = 1;
};
scrollMove.prototype = {
    /**
     * 图片切换
     * */
    animate : function (offset) {
        this.imgBox.style.left = parseInt(this.imgBox.style.left) + offset + "px";
        if(parseInt(this.imgBox.style.left) <= -(this.width * this.buttons.length)){
            this.imgBox.style.left = -(this.width * (this.buttons.length - 1)) + "px";
        }
        if(parseInt(this.imgBox.style.left) >= 0){
            this.imgBox.style.left = 0 + "px";
        }
    },
    /**
     * 给当前按钮添加active样式
     * */
    btnCtrl : function(){
        for (var i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].className == 'active') {
                this.buttons[i].className = '';
            }
        }
        this.buttons[this.index - 1].className = 'active';
    },
    /**
     * 左箭头的点击事件
     * */
    leftClick : function(){
        var that = this;
        that.leftNav.onclick = function(){
            that.index += 1;
            if(that.index > that.buttons.length){
                that.index = that.buttons.length
            }
            if(that.index < 1){
                that.index = 1;
            }
            that.btnCtrl();
            that.animate(-that.width);
        }
    },

    /**
     * 右箭头的点击事件
     * */
    rightClick : function(){
        var that = this;
        that.rightNav.onclick = function(){
            that.index -= 1;
            if(that.index > that.buttons.length){
                that.index = that.buttons.length
            }
            if(that.index < 1){
                that.index = 1;
            }
            that.btnCtrl();
            that.animate(that.width);
        }
    },
    /**
     * 轮播文字导航切换
     * */
    wordNavCtrl : function(){
        var that = this;
        for(var i = 0; i < that.buttons.length; i++){
            (function(i){
                that.buttons[i].onclick = function(){
                    var offSetWidth = that.width * (that.index - parseInt(this.getAttribute("index")));
                    that.animate(offSetWidth);
                    that.index = parseInt(this.getAttribute("index"));
                    that.btnCtrl(that.index)
                }
            })(i)
        }
    }

};
window.onload = function(){
    var myScroll = new scrollMove({
        "rightNav" : document.getElementById("leftNav"),
        "leftNav" : document.getElementById("rightNav"),
        "imgBox" : document.getElementById("workContent"),
        "width" : document.body.clientWidth,
        "buttons" : document.getElementsByClassName("word-nav")[0].getElementsByTagName("div")
    });
    myScroll.leftClick();
    myScroll.rightClick();
    myScroll.wordNavCtrl();
};