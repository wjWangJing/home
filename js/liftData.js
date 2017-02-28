var data=[];
var dataStr = "1、test1<br>\
<br>\
描述：这是一张test1<br>\
<br>\
<br>\
2、test2<br>\
<br>\
描述：这是一张test2<br>\
<br>\
<br>\
3、test3<br>\
<br>\
描述：这是一张test3<br>\
<br>\
<br>\
4、test4<br>\
<br>\
描述：这是一张test4<br>\
<br>\
<br>\
5、test5<br>\
<br>\
描述：这是一张test5<br>\
<br>\
<br>\
6、test6<br>\
<br>\
描述：这是一张test6<br>\
<br>\
<br>\
7、test7<br>\
<br>\
描述：这是一张test7<br>\
<br>\
<br>\
8、test8<br>\
<br>\
描述：这是一张test8<br>\
<br>\
<br>\
9、test9<br>\
<br>\
描述：这是一张test9<br>\
<br>\
<br>\
10、test10<br>\
<br>\
描述：这是一张test10<br>\
<br>\
<br>\
11、test11<br>\
<br>\
描述：这是一张test11<br>\
<br>\
<br>\
12、test12<br>\
<br>\
描述：这是一张test12<br>\
<br>\
<br>\
13、test13<br>\
<br>\
描述：这是一张test13<br>\
<br>\
<br>\
14、test14<br>\
<br>\
描述：这是一张test14<br>\
<br>\
<br>\
15、test15<br>\
<br>\
描述：这是一张test15<br>\
<br>\
<br>\
16、test16<br>\
<br>\
描述：这是一张test16<br>\
<br>\
<br>\
17、test17<br>\
<br>\
描述：这是一张test17<br>\
<br>\
<br>\
18、test18<br>\
<br>\
描述：这是一张test18<br>\
<br>\
<br>\
19、test19<br>\
<br>\
描述：这是一张test19<br>\
<br>\
<br>\
20、test20<br>\
<br>\
描述：这是一张test20<br>\
<br>\
<br>\
";

var d = dataStr.split("<br><br><br>");
for(var i = 0;i < d.length-1;i++){
    var c = d[i].split("<br><br>");
    data.push({
        img:c[0].replace((i+1)+"、","")+".png",
        caption:c[0].split("、")[1],
        desc : c[1]
    });
    console.log(c[0].replace("、","")+".png");
}

























