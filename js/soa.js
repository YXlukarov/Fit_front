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
        //暂用sm图云
        url: url,
        contentType: false,
        processData: false,
        data: form_data 
    }).success(function(msg){
        console.log(msg);
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
                $("img.news2").attr("src",newsList.articles[4].urlToImage);
                $("h3.news2").text(newsList.articles[4].title);
                $("p.news2").text(newsList.articles[4].description);
                $("a.news2").attr("href",newsList.articles[4].url);
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