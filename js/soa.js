//语音识别的变色变量，还缺zjx的js脚本添加进来
var searchAudio = -1;
$("#searchAudio").click(function(){
    if(searchAudio < 0){
        $("#searchAudio a").addClass("searchChange");
    }
    else $("#searchAudio a").removeClass("searchChange");
    searchAudio = -searchAudio;
})

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