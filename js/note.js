;(function(){
    /*
    * 程序初始化
    * */
    var init = function(){
        var domElement = {
            $noteTimeLine   : document.getElementById("noteTimeLine"),
            $timeLineTpl    : document.getElementById("timeLineTpl"),
            $noteContent    : document.getElementById("noteContent"),
            $contentMonthTpl: document.getElementById("contentMonthTpl"),
            $noteTop        : document.getElementById("noteTop"),
            $contentYearTpl : document.getElementById("contentYearTpl")
        };
        showTimeLine(domElement);
        updateContent(domElement);
        fixTimeLine(domElement);
        showYear();
        showMonth();
        // windowResize(domElement);

    };
    /*
     * 更新内容区域的左侧时间轴
     * @params {object} domElement 要操作的dom元素
     * */
    var showTimeLine = function(domElement){
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
    };
    /*
     * 更新内容区域的右侧内容列表
     * @params {object} domElement 要操作的dom元素
     * */
    var updateContent = function(domElement){
        var _contentYearTpl = domElement.$contentYearTpl.innerHTML;
        var _contentMonthTpl = domElement.$contentMonthTpl.innerHTML;
        var _contentMonthItemTpl = domElement.$noteContent.innerHTML;
        var contentHtml = [];
        for(var year in noteData){
            var contentYear = [];
            for(var month in noteData[year]){
                var contentMonth = [];
                for(var date in noteData[year][month]){
                    var contentMonthItem = _contentMonthItemTpl
                        .replace(/\{\{title\}\}/g,noteData[year][month][date].title)
                        .replace(/\{\{date\}\}/g,noteData[year][month][date].date)
                        .replace(/\{\{summary\}\}/g,noteData[year][month][date].summary)
                        .replace(/\{\{className\}\}/g,date%2?"note-content-item-right":"note-content-item-left")
                        .replace(/\{\{href\}\}/g,noteData[year][month][date].href)
                        .replace(/\{\{year\}\}/g,year)
                        .replace(/\{\{month\}\}/g,month);
                    contentMonth.push(contentMonthItem);
                }
                var contentMonthHtml = _contentMonthTpl
                    .replace(/\{\{year\}\}/g,year)
                    .replace(/\{\{month\}\}/g,month)
                    .replace(/\{\{list\}\}/g,contentMonth.join(""));
                contentYear.unshift(contentMonthHtml)
            }
            var contentYearHtml = _contentYearTpl
                .replace(/\{\{yearList\}\}/g,contentYear.join(""))
                .replace(/\{\{year\}\}/g,year);
            contentHtml.unshift(contentYearHtml);
            domElement.$noteContent.innerHTML = contentHtml.join("");
        }
    };

    /*
     * 滚动条事件
     * @params {object} domElement 要操作的dom元素
     * */
    var fixTimeLine = function(domElement){
        window.onscroll = function () {
            var scrollTop = document.body.scrollTop;
            var height = domElement.$noteTop.offsetHeight + 30;
            var bodyWidth = document.body.clientWidth;
            var parentWidth = document.getElementsByClassName("note-bottom")[0].offsetWidth;
            if(bodyWidth <= 960 && bodyWidth > 800){
                if(scrollTop >= height){
                    domElement.$noteTimeLine.style.position = "fixed";
                    domElement.$noteTimeLine.style.top = "10px";
                    domElement.$noteTimeLine.style.left = bodyWidth * 0.05 + "px";
                    domElement.$noteTimeLine.style.width = parentWidth * 0.15 + "px";
                }else{
                    domElement.$noteTimeLine.style.position = "";
                    domElement.$noteTimeLine.style.top = "";
                    domElement.$noteTimeLine.style.left = "";
                    domElement.$noteTimeLine.style.width = "";
                }
            }else if(bodyWidth > 960){
                if(scrollTop >= height){
                    domElement.$noteTimeLine.style.position = "fixed";
                    domElement.$noteTimeLine.style.top = "10px";
                    domElement.$noteTimeLine.style.left = "8%";
                }else{
                    domElement.$noteTimeLine.style.position = "";
                    domElement.$noteTimeLine.style.top = "";
                    domElement.$noteTimeLine.style.left = "";
                }
            }else if(bodyWidth <= 800){
                if(scrollTop >= height){
                    domElement.$noteTimeLine.style.position = "fixed";
                    domElement.$noteTimeLine.style.top = "10px";
                    domElement.$noteTimeLine.style.left = bodyWidth * 0.025 + "px";
                    domElement.$noteTimeLine.style.width = parentWidth * 0.15 + "px";
                }else{
                    domElement.$noteTimeLine.style.position = "";
                    domElement.$noteTimeLine.style.top = "";
                    domElement.$noteTimeLine.style.left = "";
                    domElement.$noteTimeLine.style.width = "";
                }
            }

            updateTimeLineYear(scrollTop);
            updateTimeLineMonth(scrollTop);
        }
    };
    /*
     * 左侧时间轴--年份点击处理
     * */
    var showYear = function(){
        for(var year in noteData){
            (function(year){
                var content_year = document.getElementById("note-content-year-"+year);
                var timeLine_year = document.getElementById("note_timeLine_year_"+year);
                openMonthList(year,timeLine_year);
                timeLine_year.onclick = function(){
                    openMonthList(year,timeLine_year);
                    var height = content_year.offsetTop + 120;
                    var start = document.body.scrollTop;
                    window.scrollTo(start,height);
                }
            })(year);
        }
    };
    /*
     * 左侧时间轴--月份点击处理
     * */
    var showMonth = function(){
        for(var year in noteData){
            for(var month in noteData[year]){
                (function(year,month){
                    var content_year_month = document.getElementById("note_content_year_"+year+"_"+month);
                    var timeLine_year_month = document.getElementById("note_timeLine_year_"+year+"_"+month);
                    timeLine_year_month.onclick = function(){
                        var height = content_year_month.offsetTop + 130;
                        var start = document.body.scrollTop;
                        window.scrollTo(start,height);
                    }
                })(year,month);
            }
        }
    };
    /*
     * 左侧时间轴--点击年份展开月份
     * */
    var openMonthList = function (year,element) {
        var years = document.getElementById("noteTimeLine").getElementsByClassName("year-list");
        var months = document.getElementById("noteTimeLine").getElementsByClassName("month-list");
        var currentYear_month = document.getElementById("noteTimeLine").getElementsByClassName(year+"_month");
        // 清除所有年份的current样式
        for(var i = 0; i < years.length; i++){
            years[i].className = years[i].className.replace(/current/,"");
        }
        // 隐藏所有月份
        for(var j = 0; j < months.length; j++){
            months[j].style.display = "none";
        }
        // 展示当前年份下的月份
        for(var k = 0; k < currentYear_month.length; k++){
            currentYear_month[k].style.display = "block";
        }
        element.className += " current";
    };
    /*
    * 根据滚动条的位置更新左侧时间轴的年月的显示隐藏
    * */
    var updateTimeLineYear = function(scrollTop){
        var years = document.getElementById("noteContent").getElementsByClassName("note-content-year");
        var scrollTopYear = [];
        for(var i = 0; i < years.length; i++){
            scrollTopYear.push(years[i].offsetTop)
        }
        for(var j = 1; j < scrollTopYear.length; j++){
            if(scrollTop < scrollTopYear[j] && scrollTop > scrollTopYear[j - 1]){
                var year = years[i-1].innerHTML.slice(0,4);
                openMonthList(year,document.getElementById("note_timeLine_year_"+year));
                return ;
            }
        }
    };
    /*
    * 根据滚动条的位置高亮月份
    * */
    var updateTimeLineMonth = function(scrollTop){
        var months = document.getElementsByClassName("note-content-month");
        var scrollTopMonth = [];
        for(var i = 0; i < months.length; i++){
            scrollTopMonth.push(months[i].offsetTop)
        }
        for(var j = 1; j < scrollTopMonth.length; j++){
            if(scrollTop < scrollTopMonth[j] && scrollTop > scrollTopMonth[j - 1]){
                var year = months[j-1].id.split("_")[3];
                var month = months[j-1].id.split("_")[4];
                monthHighLight(year,month,document.getElementById("note_timeLine_year_"+year+"_"+month));
                return ;
            }
        }
        console.log("scrollTopMonth",scrollTopMonth)
    };
    /*
    * 滚动条的位置和月份对应
    * */
    var monthHighLight = function (year,month,element) {
        var months = document.getElementsByClassName(year+"_month");
        var scrollTopMonth = [];
        // 清除所有月份current样式
        for(var k = 0; k < months.length; k++){
            months[k].className = months[k].className.replace(/current/,"");
        }
        for(var i = 0; i < months.length; i++){
            scrollTopMonth.push(months[i].scrollTop);
        }
        for(var j = 1; j < scrollTopMonth.length; j++){
            openMonthList(year,document.getElementById("note_timeLine_year_"+year));
        }
        element.className += " current";
    };
    /*
     * 窗口改变事件处理; 保持时序列表的位置
     * */
    var windowResize = function(domElement){
        window.onresize = function(){
            fixTimeLine(domElement)
        }
    };

    init();
})();


