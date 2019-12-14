$(document).ready(function () {

    var select = $('select[multiple]');
    var options = select.find('option');

    var div = $('<div />').addClass('selectMultiple');
    var active = $('<div />');
    var list = $('<ul />');
    var placeholder = select.data('placeholder');

    var span = $('<span />').text(placeholder).appendTo(active);

    options.each(function () {
        var text = $(this).text();
        if ($(this).is(':selected')) {
            active.append($('<a />').html('<em>' + text + '</em><i></i>'));
            span.addClass('hide');
        } else {
            list.append($('<li />').html(text));
        }
    });

    active.append($('<div />').addClass('arrow'));
    div.append(active).append(list);

    select.wrap(div);

    //点击某个餐饮选中时触发的事件
    $(document).on('click', '.selectMultiple ul li', function (e) {
        var select = $(this).parent().parent();

        var li = $(this);
        if (!select.hasClass('clicked')) {
            select.addClass('clicked');
            li.prev().addClass('beforeRemove');
            li.next().addClass('afterRemove');
            li.addClass('remove');
            var a = $('<a />').addClass('notShown').html('<em>' + li.text() + '</em><i></i>').hide().appendTo(select.children('div'));
            a.slideDown(400, function () {
                setTimeout(function () {
                    a.addClass('shown');
                    select.children('div').children('span').addClass('hide');
                    select.find('option:contains(' + li.text() + ')').prop('selected', true);
                }, 500);
            });
            setTimeout(function () {
                if (li.prev().is(':last-child')) {
                    li.prev().removeClass('beforeRemove');
                }
                if (li.next().is(':first-child')) {
                    li.next().removeClass('afterRemove');
                }
                setTimeout(function () {
                    li.prev().removeClass('beforeRemove');
                    li.next().removeClass('afterRemove');
                }, 200);

                li.slideUp(400, function () {
                    li.remove();
                    select.removeClass('clicked');
                });
            }, 600);
        }

        //yc：这行代码用于获取点击的是早餐，午餐，晚餐还是加餐
        var selectedId = select.children('div').children('span').children('select').attr('id');

        //yc：然后将点击的食物加入对应的数组中，数组定义在records.html的最下面，如xxArr
        switch (selectedId) {
            case 'breakfast':
                breakfastArr.push(li.text());
                console.log(breakfastArr)
                break;
            case 'lunch':
                lunchArr.push(li.text());
                console.log(lunchArr)
                break;
            case 'dinner':
                dinnerArr.push(li.text());
                console.log(dinnerArr)
                break;
            case 'extraFood':
                extraFoodArr.push(li.text());
                console.log(extraFoodArr)
                break;
            default:
                console.log("没有该餐饮数组");
        }

    });

    //点击选中某个餐饮删除时触发的事件
    $(document).on('click', '.selectMultiple > div a', function (e) {
        var select = $(this).parent().parent();
        var self = $(this);
        self.removeClass().addClass('remove');
        select.addClass('open');
        setTimeout(function () {
            self.addClass('disappear');
            setTimeout(function () {
                self.animate({
                    width: 0,
                    height: 0,
                    padding: 0,
                    margin: 0
                }, 300, function () {
                    var li = $('<li />').text(self.children('em').text()).addClass('notShown').appendTo(select.find('ul'));
                    li.slideDown(400, function () {
                        li.addClass('show');
                        setTimeout(function () {
                            select.find('option:contains(' + self.children('em').text() + ')').prop('selected', false);
                            if (!select.find('option:selected').length) {
                                select.children('div').children('span').removeClass('hide');
                            }
                            li.removeClass();
                        }, 400);
                    });
                    self.remove();
                })
            }, 300);
        }, 400);

        //yc：这行代码用于获取点击的是早餐，午餐，晚餐还是加餐
        var selectedId = select.children('div').children('span').children('select').attr('id');

        //yc：然后将点击的食物从对应的数组中移除，数组定义在records.html的最下面，如xxArr
        switch (selectedId) {
            case 'breakfast':
                for(let i=0;i<breakfastArr.length;i++){
                    if(breakfastArr[i]==self.children('em').text()){
                        breakfastArr.splice(i,1);
                      break;//该行代码变成i--,则移除所有2
                    }
                }
                console.log(breakfastArr)
                break;
            case 'lunch':
                for(let i=0;i<lunchArr.length;i++){
                    if(lunchArr[i]==self.children('em').text()){
                        lunchArr.splice(i,1);
                      break;//该行代码变成i--,则移除所有2
                    }
                }
                console.log(lunchArr)
                break;
            case 'dinner':
                for(let i=0;i<dinnerArr.length;i++){
                    if(dinnerArr[i]==self.children('em').text()){
                        dinnerArr.splice(i,1);
                      break;//该行代码变成i--,则移除所有2
                    }
                }
                console.log(dinnerArr)
                break;
            case 'extraFood':
                for(let i=0;i<extraFoodArr.length;i++){
                    if(extraFoodArr[i]==self.children('em').text()){
                        extraFoodArr.splice(i,1);
                      break;//该行代码变成i--,则移除所有2
                    }
                }
                console.log(extraFoodArr)
                break;
            default:
                console.log("没有该餐饮数组");
        }
    });

    //点击下拉列表的事件
    $(document).on('click', '.selectMultiple > div .arrow, .selectMultiple > div span', function (e) {
        $(this).parent().parent().toggleClass('open');
    });

});