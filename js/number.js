$(function () {
    var url = "http://localhost:8011/bodyScore";
         // Dropzone initialization
         Dropzone.autoDiscover = false;
         $(function () {
             $("div#myDropZone").dropzone({
                 url: url,
                 paramName: "picture", // The name that will be used to transfer the file
                 maxFilesize: 0.5, // MB
                 clickable: true,
                 maxFiles: 100, //最大上传数量
                 maxFilesize: 1000, // MB 单个文件大小上限
                 filesizeBase: 1000,
                 acceptedFiles: ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.7z,.txt,image/*,application/pdf,.psd",
                 addRemoveLinks: true,
                 clickable: true,
                 autoProcessQueue: true, // true:自动上传，一次性上传parallelUploads个文件，上传成功后后面排队的其他队伍也会继续排队上传。false:关闭自动上传, 手动调度 ,但每次需要点击“上传”按钮才会触发上传，排队的其他文件不会自动上传。 
                 parallelUploads: 2, //最大并行处理量（一次同时上传的个数，不设置的话，默认：2个）
                 /* 插件消息翻译 */
                 /*  dictDefaultMessage: '<i class="fa fa-cloud-upload"></i>拖拉文件上传<br />或 <i class="fa fa-thumbs-down"></i>点此上传', */
                 dictInvalidFileType: '仅支持以下格式文件：.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar,.7z,.txt,image/*,application/pdf,.psd',
                 dictFileTooBig: '文件超出最大10M约束',
                 dictMaxFilesExceeded: '超出最大上传数量',
                 dictCancelUpload: '取消上传',
                 dictRemoveFile: '删除文件',
                 dictCancelUploadConfirmation: '确认取消上传',
                 dictResponseError: "文件上传失败!",
                 dictDefaultMessage: "<span class='bigger-150 bolder'><i class='icon-caret-right red'></i>拖动文件</span>上传\ <span class='smaller-80 gre'>(或者点击上传)</span> <br /> \ <i class='upload-icon icon-cloud-upload blue icon-3x'></i>",

               init: function () {
                  this.on("addedfile", function (file) {
                     console.log("Prepare");
                  });
                  this.on("removedfile", function (file) {
                     //删除文件时触发的方法
                     console.log("removedfile:" + file.name + "\npath:" + $(file.previewElement).find(".aliyuncs").text().trim())
                     this.removeFile(file);
                  });

                  this.on('success', function (files, data) {
                     //文件上传成功之后的操作
                     console.log(data);
                    var dom = document.querySelector(".number");
                    var digit = new Digit({
                        number : data, // 到达指定数值停止滚动
                        finish : 5, // 整体完成时间
                        speed : 1, // 数值越大，越多数字同时进行翻滚，取值范围（1 ~ 10）
                        direction : "right", // 动画方向
                        dom : dom, // 在指定dom节点插入动画
                    });

                    digit.render(); // 执行
                  });
               }
            });
         });

    function Digit(a) {
        function b(a, b) {
            var g, h, e = d(b),
                f = e.toString().length;
            for (g = 0; f > g; g++) h = document.createElement("div"), h.className = "," != e[g] && "." != e[g] ? "to__led-number" : "to__led-number to__led-number--no", h.innerHTML = e[g], a.appendChild(h)
        }
    
        function c(a, b, c) {
            function i() {
                return 9 == h ? h = 0 : h++, h
            }
            var e, f, g, h, j, k, d = a.childNodes.length - 1;
            for (e = 0; e < a.childNodes.length; e++) f = {}, f = "left" == c ? a.childNodes[e] : a.childNodes[d], g = f.innerHTML, h = 0, f.innerHTML = "", "," != g && "." != g && (b.timerTemp += b.single), j = .5 * b.timerTemp / b.speed, k = b.timerTemp - j, ! function(a, b) {
                setTimeout(function() {
                    if (a.innerHTML = b, "," != b && "." != b) {
                        a.innerHTML = b;
                        var c = setInterval(function() {
                            a.innerHTML = i()
                        }, 50);
                        setTimeout(function() {
                            clearInterval(c), a.innerHTML = b
                        }, 1e3 * k);
                    } else a.innerHTML = b;
                }, 1e3 * j)
            }(f, g), d--
        }
    
        function d(a) {
            var c, d, f, g, h;
            for (a = a.toString(), c = a.split("."), d = c[0], f = "." + c[1], g = d, h = 1; h <= Math.floor((d.length - 1) / 3); h++) g = e(g, d.length - 3 * h, ",");
            return g += f
        }
    
        function e(a, b, c) {
            return a.slice(0, b) + c + a.slice(b)
        }
        Digit.prototype.render = function() {
            var d = a.direction,
                e = a.finish,
                f = a.speed,
                g = a.number.toString().replace(".", "").length - 1,
                h = Number((e / g).toFixed(2)),
                i = {
                    number: g,
                    single: h,
                    speed: f,
                    timerTemp: 0
                };
            i.timerTemp -= i.single, b(a.dom, a.number, i), c(a.dom, i, d)
        }
    }

});

