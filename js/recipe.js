var url = "http://localhost:8011/recipe/";
var str=decodeURI(location.href);
var num=str.indexOf("?") 
str=str.substr(num+1); 
var value;
var keyList = new Array;
var arr=str.split("&"); //各个参数放到数组里
for(var i=0;i < arr.length;i++){ 
    num=arr[i].indexOf("="); 
    if(num>0){ 
        value=arr[i].substr(num+1);
        keyList.push(value);
    }
}
console.log(keyList);

var recipe_name = keyList[0];
var recipe_id = 1;
if(recipe_name == "减肥"){
    recipe_id = 2;
}
if(recipe_name == "瘦身"){
    recipe_id = 3;
}
if(recipe_name == "消脂"){
    recipe_id = 4;
}
if(recipe_name == "丰胸"){
    recipe_id = 5;
}
if(recipe_name == "美容"){
    recipe_id = 6;
}
if(recipe_name == "养颜"){
    recipe_id = 7;
}
if(recipe_name == "美白"){
    recipe_id = 8;
}
console.log("recipe_id "+recipe_id);
var isSearch = keyList[1];
$(".blog_left_sidebar_sign").ready(function(){
    if(isSearch == 1){
        url = url + recipe_id;
        $.ajax({
            type: "GET",
            url: url
        }).success(function(msg){
            var dishList = msg.result.list;
            //dish1
            $("#d1image").attr("src",dishList[0].pic);
            $("#d1name").text(dishList[0].name);
            $("#d1tag").text(dishList[0].tag);
            $("#d1content").html(dishList[0].content);
            $("#d1id").text(dishList[0].id);
            //dish2
            $("#d2image").attr("src",dishList[1].pic);
            $("#d2name").text(dishList[1].name);
            $("#d2tag").text(dishList[1].tag);
            $("#d2content").html(dishList[1].content);
            $("#d2id").text(dishList[1].id);
            //dish3
            $("#d3image").attr("src",dishList[2].pic);
            $("#d3name").text(dishList[2].name);
            $("#d3tag").text(dishList[2].tag);
            $("#d3content").html(dishList[2].content);
            $("#d3id").text(dishList[2].id);
            //dish4
            $("#d4image").attr("src",dishList[3].pic);
            $("#d4name").text(dishList[3].name);
            $("#d4tag").text(dishList[3].tag);
            $("#d4content").html(dishList[3].content);
            $("#d4id").text(dishList[3].id);
            //dish5
            $("#d5image").attr("src",dishList[4].pic);
            $("#d5name").text(dishList[4].name);
            $("#d5tag").text(dishList[4].tag);
            $("#d5content").html(dishList[4].content);
            $("#d5id").text(dishList[4].id);

            $("#isSearch b").text("您搜索的是：");
            $("#keyword").text(recipe_name);

        }).fail(function(msg){
            console.error("error!")
        })
    }
    else{
        url = url + 2;
        $.ajax({
            type: "GET",
            url: url
        }).success(function(msg){
            var dishList = msg.result.list;
            //dish1
            $("#d1image").attr("src",dishList[0].pic);
            $("#d1name").text(dishList[0].name);
            $("#d1tag").text(dishList[0].tag);
            $("#d1content").html(dishList[0].content);
            $("#d1id").text(dishList[0].id);
            //dish2
            $("#d2image").attr("src",dishList[1].pic);
            $("#d2name").text(dishList[1].name);
            $("#d2tag").text(dishList[1].tag);
            $("#d2content").html(dishList[1].content);
            $("#d2id").text(dishList[1].id);
            //dish3
            $("#d3image").attr("src",dishList[2].pic);
            $("#d3name").text(dishList[2].name);
            $("#d3tag").text(dishList[2].tag);
            $("#d3content").html(dishList[2].content);
            $("#d3id").text(dishList[2].id);
            //dish4
            $("#d4image").attr("src",dishList[3].pic);
            $("#d4name").text(dishList[3].name);
            $("#d4tag").text(dishList[3].tag);
            $("#d4content").html(dishList[3].content);
            $("#d4id").text(dishList[3].id);
            //dish5
            $("#d5image").attr("src",dishList[4].pic);
            $("#d5name").text(dishList[4].name);
            $("#d5tag").text(dishList[4].tag);
            $("#d5content").html(dishList[4].content);
            $("#d5id").text(dishList[4].id);

        }).fail(function(msg){
            console.error("error!")
        })
    }
    
})

$("#changeRecipe2").click(function(){
    url = url + "2";
    $.ajax({
        type: "GET",
        url: url
    }).success(function(msg){
        console.log(msg);
        var dishList = msg.result.list;
        //dish1
        $("#d1image").attr("src",dishList[5].pic);
        $("#d1name").text(dishList[5].name);
        $("#d1tag").text(dishList[5].tag);
        $("#d1content").html(dishList[5].content);
        $("#d1id").text(dishList[5].id);
        //dish2
        $("#d2image").attr("src",dishList[6].pic);
        $("#d2name").text(dishList[6].name);
        $("#d2tag").text(dishList[6].tag);
        $("#d2content").html(dishList[6].content);
        $("#d2id").text(dishList[6].id);
        //dish3
        $("#d3image").attr("src",dishList[7].pic);
        $("#d3name").text(dishList[7].name);
        $("#d3tag").text(dishList[7].tag);
        $("#d3content").html(dishList[7].content);
        $("#d3id").text(dishList[7].id);
        //dish4
        $("#d4image").attr("src",dishList[8].pic);
        $("#d4name").text(dishList[8].name);
        $("#d4tag").text(dishList[8].tag);
        $("#d4content").html(dishList[8].content);
        $("#d4id").text(dishList[8].id);
        //dish5
        $("#d5image").attr("src",dishList[9].pic);
        $("#d5name").text(dishList[9].name);
        $("#d5tag").text(dishList[9].tag);
        $("#d5content").html(dishList[9].content);
        $("#d5id").text(dishList[9].id);

        //change nav state
        $("#changeRecipe1").removeClass("activePagi");
        $("#changeRecipe2").addClass("activePagi");

    }).fail(function(msg){
        console.error("error!")
    })
})

$("#moreinfo1").click(function(){
    var dishId = $("#d1id").text();
    window.location.replace("http://127.0.0.1:5500/events-details.html?recipeId=" + dishId);
})
$("#moreinfo2").click(function(){
    var dishId = $("#d2id").text();
    window.location.replace("http://127.0.0.1:5500/events-details.html?recipeId=" + dishId);
})
$("#moreinfo3").click(function(){
    var dishId = $("#d3id").text();
    window.location.replace("http://127.0.0.1:5500/events-details.html?recipeId=" + dishId);
})
$("#moreinfo4").click(function(){
    var dishId = $("#d4id").text();
    window.location.replace("http://127.0.0.1:5500/events-details.html?recipeId=" + dishId);
})
$("#moreinfo5").click(function(){
    var dishId = $("#d5id").text();
    window.location.replace("http://127.0.0.1:5500/events-details.html?recipeId=" + dishId);
})

//获取url中的参数
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象 &name=参数&
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//匹配目标参数
    if (r != null) return unescape(r[2]); return null;//返回参数值
}
var url_detail = "http://localhost:8011/recipedetail/";
$(".banner-ready-sign").ready(function(){
    var id = getUrlParam("recipeId");
    var request_url = url_detail + id;
    console.log(id);
    $.ajax({
        type: "GET",
        url: request_url
    }).success(function(msg){
        console.log(msg);
        $("#recipe-detail-img").attr("src",msg.pic);
        $("#recipe-detail-content").html(msg.content);
        var ingred = msg.material;
        var tbody = $("#ingredient");
        for(var i = 0;i<ingred.length;i++){
            tbody.append(
                '<tr><td>'+ingred[i].mname+'</td><td>'+ingred[i].amount+'</td></tr>'
            )
        }
        var proc = msg.process;
        var procUL = $("#proc_body");
        for(var j = 0;j<proc.length;j++){
            procUL.append(
                '<tr><td>'+proc[j].pcontent+'</td><td><div class="recipe-detail-pro-container"><img class="recipe-detail-pro" src='+proc[j].pic+'></div></td></tr>'
            )
        }
        $("#recipe-detail-name").text(msg.name);
        $("#recipe-detail-amount").text(msg.peoplenum);
        $("#recipe-detail-prepare").text(msg.preparetime);
        $("#recipe-detail-cooktime").text(msg.cookingtime);
        $("#recipe-detail-tags").text(msg.tag);

    }).fail(function(msg){
        console.error("error!")
    })
})
