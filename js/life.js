// 翻转控制
function turn(element){
    var cls = element.className;
    var n = element.id.split("_")[1];

    if(!/photo-center/.test(cls)){
        return sortPhoto(n);
    }

    if(/photo_front/.test(cls)){
        cls = cls.replace(/photo_front/,"photo_back");
        g('#nav_'+n).className += " s_back ";
    }else{
        cls = cls.replace(/photo_back/,"photo_front");
        g('#nav_'+n).className=g("#nav_"+n).className.replace(/\s*s_back\s*/,"");
    }
    return element.className = cls;
}
// 通用函数
function g(selector){
    var m = selector.substr(0,1) == "."?"getElementsByClassName":"getElementById";
    return document[m](selector.substr(1));
}
// 输出所有海报
function addPhotos(){
    var template = document.getElementById("wrap").innerHTML;
    var wrap = document.getElementById("wrap");
    var html = [];
    var nav=[];
    for(var i = 0;i < data.length;i++){
        var _html = template
            .replace("{{index}}",i)
            .replace("{{img}}",data[i].img)
            .replace("{{caption}}",data[i].caption)
            .replace("{{desc}}",data[i].desc);
        html.push(_html);
        nav.push('<span id="nav_'+i+'" onclick="turn(g(\'#photo_'+i+'\'))" class="s"></span>');
    }
    html.push('<div class="nav">'+nav.join("")+'</div>');
    wrap.innerHTML = html.join("");
    sortPhoto(randomNum([0,data.length]));
}
var data = data;
addPhotos();


// 海报排序
function sortPhoto(n){
    var _photo = document.getElementsByClassName("photo");
    var photos = [];
    for(var i = 0; i < _photo.length; i++){
        _photo[i].className = _photo[i].className.replace(/\s*photo-center\s*/,"");
        _photo[i].className = _photo[i].className.replace(/\s*photo_front\s*/,"");
        _photo[i].className = _photo[i].className.replace(/\s*photo_back\s*/,"");
        _photo[i].className+=" photo_front";
        _photo[i].style.left = "";
        _photo[i].style.top = "";
        _photo[i].style["-webkit-transform"] = "rotate(360deg) scale(1.1)";
        photos.push(_photo[i]);
    }
    var photo_center = document.getElementById("photo_"+n);
    photo_center.className +=" photo-center";
    photo_center = photos.splice(n,1)[0];
    // 海报区域分为两个部分
    var photos_left = photos.splice(0,Math.ceil(photos.length/2));
    var photos_right = photos;
    var ranges = range();
    for(var s in photos_left){
        var photoL=photos_left[s];
        photoL.style.left =randomNum(ranges.left.x)+ "px";
        photoL.style.top = randomNum(ranges.left.y)+ "px";
        photoL.style["-webkit-transform"] = "rotate("+randomNum([0,90])+"deg) scale(1)";
    }
    for(s in photos_right){
        var photo=photos_right[s];
        photo.style.left =randomNum(ranges.right.x)+ "px";
        photo.style.top = randomNum(ranges.right.y)+ "px";
        photo.style["-webkit-transform"] = "rotate("+randomNum([0,90])+"deg) scale(1)";
    }
    // 控制按钮处理
    var navs = g(".s");
    for(var i = 0;i<navs.length;i++){
        navs[i].className = "s";
        // navs[i].className.replace(/\s*s_back\s*/,"");
    }
    g("#nav_"+n).className += " s_current ";
}
// // 随机生成一个值 支持取值范围 (min,max)
function randomNum(range) {
    var num;
    var max = Math.max(range[0],range[1]);
    var min = Math.min(range[0],range[1]);
    var diff = max-min;
    num = Math.ceil(Math.random()*diff + min);
    return num;
}
// // 计算左右分区的范围
function range(){
    var range = {left:{x:[],y:[]},right:{x:[],y:[]}};
    var wrap = {
        w:g("#wrap").clientWidth,
        h:g("#wrap").clientHeight
    };
    var photo = {
        w:g(".photo")[0].clientWidth,
        h:g(".photo")[0].clientHeight
    };
    range.wrap = wrap;
    range.photo = photo;
    range.left.x = [0-photo.w/2,wrap.w/2-photo.w/2];
    range.left.y = [0-photo.h/2,wrap.h];

    range.right.x = [wrap.w/2+photo.w/2,wrap.w+photo.w];
    range.right.y = range.left.y;
    return range;
}















