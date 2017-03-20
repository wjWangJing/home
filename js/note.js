;(function(){
    /*
    * 程序初始化
    * */
    var init = function(){
        var domElement = {
            $noteTimeLine : document.getElementById("noteTimeLine"),
            $timeLineTpl  : document.getElementById("timeLineTpl"),
            $noteContent  : document.getElementById("noteContent"),
            $contentTpl   : document.getElementById("contentTpl"),
            $noteTop      : document.getElementById("noteTop")
        };
        updateTimeLine(domElement);
        updateContent(domElement);
        fixTimeLine(domElement);
    };
    /*
     * 更新内容区域的左侧时间轴
     * @params {object} domElement 要操作的dom元素
     * */
    var updateTimeLine = function(domElement){
        var _yearHtml = domElement.$noteTimeLine.innerHTML;
        var _monthHtml = domElement.$timeLineTpl.innerHTML;
        var yearLineHtml = [];
        for(var item in noteData){
            var monthLineHtml = [];
            var yearHtml = _yearHtml.replace(/\{\{year\}\}/g,item);
            for(var index in noteData[item]){
                var monthHtml = _monthHtml
                    .replace(/\{\{month\}\}/g,index)
                    .replace(/\{\{year\}\}/g,item);
                monthLineHtml.unshift(monthHtml)
            }
            yearLineHtml.unshift(yearHtml.replace(/\{\{monthList\}\}/g,monthLineHtml.join("")))
        }
        domElement.$noteTimeLine.innerHTML = yearLineHtml.join("");
        console.log(yearLineHtml);
    };
    /*
     * 更新内容区域的右侧内容列表
     * @params {object} domElement 要操作的dom元素
     * */
    var updateContent = function(domElement){
        var _contentTpl = domElement.$contentTpl.innerHTML;
        var _contentHtml = domElement.$noteContent.innerHTML;
        var contentHtmlArr = [];
        for(var item in noteData){
            for(var index in noteData[item]){
                var flag = false;
                var contentMonthItem = [];
                for(var i in noteData[item][index]){
                    var contentHtml = _contentHtml
                        .replace(/\{\{title\}\}/g,noteData[item][index][i].title)
                        .replace(/\{\{date\}\}/g,noteData[item][index][i].date)
                        .replace(/\{\{summary\}\}/g,noteData[item][index][i].summary)
                        .replace(/\{\{className\}\}/g,i%2?"note-content-item-right":"note-content-item-left")
                        .replace(/\{\{pointClassName\}\}/g,flag?"note-content-point-left":"")
                        .replace(/\{\{href\}\}/g,noteData[item][index][i].href)
                        .replace(/\{\{year\}\}/g,item)
                        .replace(/\{\{month\}\}/g,index);
                    contentMonthItem.push(contentHtml);
                    flag = !flag;
                }
                var contentTplHtml = _contentTpl
                        .replace(/\{\{list\}\}/g,contentMonthItem.join(""))
                        .replace(/\{\{year\}\}/g,item)
                        .replace(/\{\{month\}\}/g,index);
                contentHtmlArr.unshift(contentTplHtml);
            }
            domElement.$noteContent.innerHTML = contentHtmlArr.join("");
        }
        console.log(contentHtmlArr);
    };

    /*
     * 固定左侧时间轴
     * @params {object} domElement 要操作的dom元素
     * */
    var fixTimeLine = function(domElement){
        window.onscroll = function () {
            var scrollTop = document.body.scrollTop;
            var height = domElement.$noteTop.offsetHeight + 40;
            if(scrollTop >= height){
                domElement.$noteTimeLine.style.position = "fixed";
                domElement.$noteTimeLine.style.top = "10px";
                domElement.$noteTimeLine.style.left = "8%";
            }else{
                domElement.$noteTimeLine.style.position = "";
                domElement.$noteTimeLine.style.top = "";
                domElement.$noteTimeLine.style.left = "";
            }
        }

    };

    init();
})();


