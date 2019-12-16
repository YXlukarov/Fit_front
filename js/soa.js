//语音识别的变色变量
var searchAudio = -1;
var url = "http://localhost:8011/uploadRecord";    //调用的后端接口的url
var recorder;
var audio = document.querySelector('audio');
$("#searchAudio").click(function(){
    if(searchAudio < 0){
        $("#searchAudio a").addClass("searchChange");
        //开始录音
        HZRecorder.get(function (rec) {
            recorder = rec;
            recorder.start();
        });
    }
    else {
        $("#searchAudio a").removeClass("searchChange");
        recorder.stop();
        recorder.upload(url, function (state, e) {
            switch (state) {
               case 'uploading':
                 break;
               case 'ok':
                 alert("录音上传成功");
                 break;
               case 'error':
                 alert("录音上传失败");
                 break;
               case 'cancel':
                 alert("录音上传被取消");
                 break;
            }
        });                                 
    }
    searchAudio = -searchAudio;
});

//图片上传识别
var url = "http://localhost:8011/dish/1";
$("#searchPic").on('change',function(){
    var form_data = new FormData();
    var file_data = $("#searchPic")[0].files[0];
    form_data.append("picture", file_data);
    $.ajax({
        async: false,                                                                                                               
        type: "POST",
        url: url,
        contentType: false,
        processData: false,
        data: form_data 
    }).success(function(msg){
        console.log(msg[0].targetImage_url);
        window.sessionStorage.setItem('dish',JSON.stringify(msg));
        window.location.replace("http://127.0.0.1:5500/Fit_front/dish-details.html?targetImage_url=" + msg[0].targetImage_url);
    }).fail(function(msg){
        alert("上传失败!")
    })
})

$(".latest_news").ready(function(){
    var url = 'https://newsapi.org/v2/everything?q=health&' +
            'language=zh&' + 'pageSize=8&' +
            'sortBy=relevancy&' +
            'apiKey=c621ac94609147a09152c13cc8c555f9';
    var req = new Request(url);
    fetch(req).then(function(response) {
            response.json().then(function(data){
                var newsList = data;
                //
                $("img.news1").attr("src",newsList.articles[1].urlToImage);
                $("h3.news1").text(newsList.articles[1].title);
                $("p.news1").text(newsList.articles[1].description);
                $("a.news1").attr("href",newsList.articles[1].url);
                //
                $("img.news2").attr("src",newsList.articles[7].urlToImage);
                $("h3.news2").text(newsList.articles[7].title);
                $("p.news2").text(newsList.articles[7].description);
                $("a.news2").attr("href",newsList.articles[7].url);
                //
                $("a.news3").attr("href",newsList.articles[2].url);
                $("a.news3").text(newsList.articles[2].title);
                //
                $("a.news4").attr("href",newsList.articles[3].url);
                $("a.news4").text(newsList.articles[3].title);
                //
                $("a.news5").attr("href",newsList.articles[6].url);
                $("a.news5").text(newsList.articles[6].title);
            })
        })
    
})

//分享API
mobShare.config( {
  
    debug: true, // 开启调试，将在浏览器的控制台输出调试信息

    appkey: '2d4941ecfe0f2', // appkey

    params: {
        url: 'http://127.0.0.1:5500/Fit_front/index-5.html', // 分享链接
        title: "我在Fit上管理健康，大家快来啊，一起", // 分享标题
        description: "这是一个很好的健康管理网站", // 分享内容
        pic: '', // 分享图片，使用逗号,隔开
        reason:'',//自定义评论内容，只应用与QQ,QZone与朋友网
    },
} );


//登录
$(function () {
    //存储全局url
    var hostURL = ""

    //从当前目录下的url.json文件里，获取全局的url配置
    $.getJSON("./url.json", function (data) {
        hostURL = data.url
    });
    //为获取验证码绑定事件
    $("#loginBtn").on("click", btn);

    function btn() {
        window.location.replace("personal-center.html");
    }
});


$('#login').on('hidden.bs.modal', function () {
    //点击登录之后进行填写身份信息
    $("#register").modal({
      keyboard: false,
      show:true
    });
  });

  $(function () {
    //存储全局url
    var hostURL = ""

    //从当前目录下的url.json文件里，获取全局的url配置
    $.getJSON("./url.json", function (data) {
        hostURL = data.url
    });

    //为获取验证码绑定事件
    $("#vcBtn").on("click", btn);
    function btn() {
        alert("验证码已发送");
        var phone = $("input[name=phone]").val();
        alert(phone)
        $.ajax({
            url: hostURL+"/sendValidation",
            async: false,
            type: "post",
            dataType: "String",
            data: { "phone": phone },
            success: function (data) {
                alert(data);
            },
            error: function () {
                console.log("发送不成功")
       }
        });
    }
});

$("#searchT").on("click",function(){
    var text = $("#inputContext").val();
    var url = "http://127.0.0.1:5500/blog-lefttsidebar.html?recipeName="+text+"&isSearch="+1;
    url = encodeURI(url);
    console.log(url)
    window.location.replace(url)
})