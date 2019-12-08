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