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
$("#searchPic").on('change',function(){
    var form_data = new FormData();
    var file_data = $("#searchPic").prop("files")[0];
    form_data.append("img", file_data);
    $.ajax({
        type: "POST",
        //url待定
        url: "",
        dataType: "json",
        crossDomain: true,
        processData: false,
        contentType: false,
        data: form_data 
    }).success(function(msg){
        //重定向到识别界面
    }).fail(function(msg){
        alert("上传失败!")
    })
})