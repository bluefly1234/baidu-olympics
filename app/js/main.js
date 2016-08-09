/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
var choosePicType = ''; // 添加上传照片类型
var chooseTextType = ''; // 添加选择文本类型
var scType = ''; // 素材类型是背景，还是各种类型表情
var choosedPicVal = ''; // 点选背景模板，表情模板的值，即图片src

$('body').bind('touchmove', function (e) {
    e.preventDefault();
}); // 禁止页面滚动

function enableBodyMove() {
    $('body').unbind('touchmove');
}

function disableBodyMove() {
    $('body').bind('touchmove', function (e) {
        e.preventDefault();
    }); // 禁止页面滚动
}

// 预加载
var sourceArr = [
    'images/adjust-guide.png',
    'images/change-btn.png',
    'images/checked.png',
    'images/choose.png',
    'images/close-btn.png',
    'images/common-bottom.png',
    'images/common-title.png',
    'images/confirm.png',
    'images/confirm-blue.png',
    'images/confirms.png',
    'images/cover-bottom.png',
    'images/from-photo.png',
    'images/from-sc.png',
    'images/go-dz.png',
    'images/go-dz-des.png',
    'images/left-arrow.png',
    'images/left-hand.png',
    'images/logo.png',
    'images/mb-text-bg.png',
    'images/mb-text-btn.png',
    'images/personal-text-btn.png',
    'images/daily/0806.png',
    'images/daily/0807.png',
    'images/rb-bottom.png',
    'images/rb-title.png',
    'images/rb-today.png',
    'images/ribao.png',
    'images/right-arrow.png',
    'images/right-hand.png',
    'images/sample.jpg',
    'images/save-reminder.png',
    'images/sc-mb-bg.png',
    'images/tap-me.png',
    'images/text-bg.png',
    'images/theme.png',
    'images/upload-icon.png'
]; //需要加载的资源列表

new mo.Loader(sourceArr,{
	onLoading : function(count,total){
		console.log('onloading:single loaded:',arguments);
        console.log('加载中...（'+count/total*100+'%）');
        var loadPercent = Math.floor(count/total*100);
        $('#loading-num').html(loadPercent+'%');
	},
	onComplete : function(time){
		console.log('oncomplete:all source loaded:',arguments);

        var hideLoading = new TimelineMax({
            onStart: setBgImages,
            delay: 2,
            onComplete: function () {
                showCover();
            }
        });
        hideLoading.to(['#loading-num', '#loading-logo'], 0.6, {autoAlpha: 0})
        .set(['#loading-num', '#loading-logo'], {display: 'none'});
	}
});


// 设置背景图片
function setBgImages() {
    // cover
    $('#ribao').css('background-image', 'url(images/ribao.png)');
    $('#tap-me').css('background-image', 'url(images/tap-me.png)');
    $('#left-hand').css('background-image', 'url(images/left-hand.png)');
    $('#right-hand').css('background-image', 'url(images/right-hand.png)');
    $('#cover-bottom').css('background-image', 'url(images/cover-bottom.png)');
    $('#theme').css('background-image', 'url(images/theme.png)');
    $('#go-dz').css('background-image', 'url(images/go-dz.png)');
    $('#go-dz-des').css('background-image', 'url(images/go-dz-des.png)');

    // 设置日报src
    $('#rb-title').css('background-image', 'url(images/rb-title.png)');
    $('#rb-bottom').css('background-image', 'url(images/rb-bottom.png)');
    $('#rb-today-pic').attr('src', 'images/daily/rb-today.png');
    $('#rb0806-pic').attr('src', 'images/daily/0806.png');
    $('#rb0807-pic').attr('src', 'images/daily/0807.png');
    $('#rb0808-pic').attr('src', 'images/daily/0808.png');

    // common page
    $('#common-title').css('background-image', 'url(images/common-title.png)');
    $('#common-bottom').css('background-image', 'url(images/common-bottom.png)');

    // upload page
    $('#upload-icon').css('background-image', 'url(images/upload-icon.png)');
    $('#upload-confirm').css('background-image', 'url(images/confirm.png)');
    $('#sample').css('background-image', 'url(images/sample.jpg)');

    // 模板选择弹窗
    $('.confirm-blue').css('background-image', 'url(images/confirm-blue.png)');
    $('#choose').css('background-image', 'url(images/choose.png)');
    $('#from-sc').css('background-image', 'url(images/from-sc.png)');
    $('#from-photo').css('background-image', 'url(images/from-photo.png)');
    $('#sc-mb-container').css('background-image', 'url(images/sc-mb-bg.png)');
    $('.close-btn').css('background-image', 'url(images/close-btn.png)');

    // 表情、文案
    $('#mb-text').css('background-image', 'url(images/mb-text-bg.png)');
    $('#reselect').css('background-image', 'url(images/reselect.png)');
    $('.confirms').css('background-image', 'url(images/confirms.png)');
    $('#choose-text-type').css('background-image', 'url(images/choose.png)');
    $('#mb-text-btn').css('background-image', 'url(images/mb-text-btn.png)');
    $('#sc-mb-container').css('background-image', 'url(images/sc-mb-bg.png)');
    $('#personal-text-btn').css('background-image', 'url(images/personal-text-btn.png)');
    $('#adjust-guide').css('background-image', 'url(images/adjust-guide.png)');
    $('#template-text').css('background-image', 'url(images/text-bg.png)');
    $('.checked-circle').css('background-image', 'url(images/checked.png)');
    $('.swiper-button-prev').css('background-image', 'url(images/left-arrow.png)');
    $('.swiper-button-next').css('background-image', 'url(images/right-arrow.png)');


    //生成页
    $('#save-reminder').css('background-image', 'url(images/save-reminder.png)');
    $('#change-btn').css('background-image', 'url(images/change-btn.png)');
    $('#tieba-logo').css('background-image', 'url(images/logo.png)');

}

// 首页动画功能
function showCover() {
    var coverShow = new TimelineMax({
        onComplete: function () {
            tapmeAN.play(0);
            dzBounce.play(0);
        }
    });
    coverShow.set('#cover', {display: 'block', autoAlpha: 1})
    .add('coverStart')
    .fromTo('#cover-bottom', 0.8, {autoAlpha: 0, y: 640}, {autoAlpha: 1, y: 0}, 'coverStart')
    .fromTo('#ribao', 0.8, {autoAlpha: 0, y: -320}, {autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.2)}, 'coverStart+=0.3')
    .fromTo('#theme', 0.8, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.2)}, 'coverStart+=0.3')
    .staggerFromTo(['#go-dz', '#go-dz-des'], 0.8, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.2)}, 0.12, '-=0.2')
}

// 戳我动画
var tapmeAN = new TimelineMax({
    paused: true,
    repeat: -1,
    yoyo: true

});
tapmeAN.add('handStart')
    .to('#left-hand', 0.8, {x: -30, ease: Power1.easeInOut}, 'handStart')
    .to('#right-hand', 0.8, {x: 30, ease: Power1.easeInOut}, 'handStart');

// 定制按钮跳动
var dzBounce = new TimelineMax({
    paused: true,
    repeat: -1,
    yoyo: true
});

dzBounce.to('#go-dz', 0.8, {scale: 1.2, ease: Power1.easeInOut, force3D: true});

// 去表情日报页
$('#tap-me-container').on('touchstart', function () {
    location.href = '#';
});

// 点击我要定制按钮, 隐藏封面
$('#go-dz').on('touchstart', hideCover);

// 隐藏封面动画
function hideCover() {
    var coverHide = new TimelineMax({
        onComplete: function () {
            tapmeAN.pause(0);
            dzBounce.pause(0);
            showCommonPage(); // 显示共用背景
        }
    });
    coverHide.add('coverHideStart')
        .to('#theme', 0.6, {autoAlpha: 0, scale: 2, ease: Back.easeIn.config(1.2)}, 'coverHideStart')
        .to('#ribao', 0.6, {autoAlpha: 0, y: -320}, 'coverHideStart+=0.2')
        .to('#cover-bottom', 0.6, {autoAlpha: 0, y: 640}, 'coverHideStart+=0.2')
        .to(['#go-dz', '#go-dz-des'], 0.4, {autoAlpha: 0}, 'coverHideStart')
        .set('#cover', {display: 'none', autoAlpha: 0})
        .set('#theme', {scale: 0})
}

// 首页去表情日报页
function goToDailyPage() {
    // 先判断表情模板是否选择，文字是否选择填写
    var dailyPageShow = new TimelineMax({
        onStart: enableBodyMove,
        onComplete: function () {
            tapmeAN.pause(0);
            dzBounce.pause(0);
        }
    });
    dailyPageShow.set('#rb-container', {display: 'block', x: 640, autoAlpha: 1})
        .to('#cover', 0.4, {x: -640, ease: Power3.easeInOut})
        .to('#rb-container', 0.4, {x: 0, ease: Power3.easeInOut}, '-=0.4')
        .set('#cover', {display: 'none', autoAlpha: 0})
}

// 日报页面返回至首页
function backToCoverPage() {
    var coverPageBackShow = new TimelineMax({
        onStart: function () {
            disableBodyMove();
            tapmeAN.play(0);
            dzBounce.play(0);
        }
    });
    coverPageBackShow.set('#cover', {display: 'block', autoAlpha: 1})
        .to('#cover', 0.4, {x: 0, ease: Power3.easeInOut})
        .to('#rb-container', 0.4, {x: 640, ease: Power3.easeInOut}, '-=0.4')
        .set('#rb-container', {display: 'none', autoAlpha: 0})
}

// 点击戳我按钮
$('#tap-me-container').on('touchstart', goToDailyPage);
// 左滑日报页返回首页
touch.on($("#rb-container"), 'swiperight', function(ev){
    console.log(ev.type + ' #rb-container');
    backToCoverPage();
});

// 显示共用背景元素
function showCommonPage() {
    var commonPageShow = new TimelineMax({
        onComplete: function () {
            showUploadPage(); // 初次显示upload-page
        }
    });
    commonPageShow.set('#common-page', {display: 'block', autoAlpha: 1})
        .fromTo('#common-bottom', 0.6, {autoAlpha: 0, y: 640}, {autoAlpha: 1, y: 0})
        .fromTo('#common-title', 0.6, {autoAlpha: 0, y: -320}, {autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.2)}, '-=0.3')
}

// 初次显示上传页
function showUploadPage() {
    var uploadPageShow = new TimelineMax({
        onComplete: function () {
            sampleScale.play(0); // 播放sample缩放动画
        }
    });
    uploadPageShow.set('#upload-page', {display: 'block', autoAlpha: 1, perspective: 500})
    .staggerFromTo(['#upload-container', '#upload-confirm'], 0.6, {autoAlpha: 0, z: -300}, {autoAlpha: 1, z: 0, ease: Back.easeOut.config(1.2)}, 0.12)
}

// sample缩放动画
var sampleScale = new TimelineMax({
    paused: true,
    repeat: -1,
    yoyo: true
});
sampleScale.to('#sample', 0.6, {scale: 1.1, ease: Power2.easeInOut, force3D: true});

// 暂停sample缩放动画并隐藏
// TODO
function stopSampleScale() {
    var hideSample = new TimelineMax({
        onComplete:function () {
            sampleScale.pause(0);
        }
    });
    hideSample.to('#sample', 0.5, {autoAlpha: 0})
            .set('#sample', {display: 'none'});
}

// 点击上传加号调用显示选择照片类型弹窗
$('#upload-icon').on('touchstart', showPicTypeChoose);

// 显示上传页选择照片类型
function showPicTypeChoose() {
    var picTypeChooseShow = new TimelineMax();
    picTypeChooseShow.set('#choose-pic', {display: 'block', autoAlpha: 1})
        .fromTo('#choose-pic', 0.3, {autoAlpha: 0}, {autoAlpha: 1})
        .fromTo('#choose', 0.5, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.2), force3D: true}, '-=0.2')
}

// 隐藏上传页照片类型弹窗
function hidePicTypeChoose() {
    var picTypeChooseHide = new TimelineMax({
        onComplete: uploadChooseTypeResult
    });
    picTypeChooseHide.to('#choose', 0.4, {autoAlpha: 0, scale: 0, ease: Back.easeIn.config(1.2), force3D: true})
        .to('#choose-pic', 0.2, {autoAlpha: 0}, '-=0.1')
        .set('#choose-pic', {display: 'none'})
}

// 点击上传照片类型按钮隐藏弹窗并判断何种类型
$('.pic-type-btn').on('touchstart', function () {
    console.log(this.id);
    if (this.id == 'from-sc') {
        console.log('去素材库');
        choosePicType = 'sck'; // 素材库
        scType = 'scBg'; // 素材类型为背景图片
    }else if (this.id == 'from-photo') {
        console.log('点击的是相册类型');
        choosePicType = 'xc'; // 相册
    }
    hidePicTypeChoose();
});

// 显示添加照片选择功能，即显示素材库选择界面还是相册添加界面
function uploadChooseTypeResult() {
    // 选择素材库背景按钮
    if (choosePicType=='sck') {
        showMbFace();
    }else if (choosePicType=='xc') {
        // 相册添加，调用手机相册、相机功能
        alert('去手机自带相机、相册添加');
    }

}

// 显示模板照片、表情照片界面
function showMbFace() {
    setMbPics(); // 根据类型初始化选择显示的缩略图
    var mbFaceShow = new TimelineMax();
    mbFaceShow.set('#sc-mb', {display: 'block'})
        .fromTo('#sc-mb', 0.4, {autoAlpha: 0}, {autoAlpha: 1})
        .fromTo('#sc-mb-container', 0.6, {autoAlpha: 0, y: -1000}, {autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.2)}, '-=0.1')
}

// 隐藏模板照片、表情照片选择界面
function hideMbFace() {
    var mbFaceHide = new TimelineMax();
    mbFaceHide.to('#sc-mb-container', 0.6, {autoAlpha: 0, y: -1000, ease: Back.easeIn.config(1.2)})
        .to('#sc-mb', 0.3, {autoAlpha: 0}, '-=0.1')
        .set('#sc-mb', {display: 'none'})
}

// 关闭模板照片、表情照片选择界面
$('#close-sc-mb').on('touchstart', hideMbFace);

// 设置缩略图， 根据类型初始化选择显示的缩略图
function setMbPics() {
     $('.sc-mb-item').find('.item-checked').remove(); // 清除对勾
    if (scType=='scBg') {
        // 设置照片背景素材库缩略图
        console.log('要设置背景缩略图');
    }
}

// 确认是否选择了背景或表情
function confirmChooseBgOrFacePic() {
    // 先判断是否选择了背景或表情，没选择的话return
    if (choosedPicVal=='') {
        alert('请选择');
        return;
    }else{
        hideMbFace(); // 隐藏模板照片、表情照片选择界面
    }

}

// 点击背景素材、表情素材选择界面确定按钮
$('#sc-mb-confirm').on('touchstart', confirmChooseBgOrFacePic);

// 素材库列表添加点选效果
$('.sc-mb-item').on('touchstart', function () {
    console.log($(this));
    $('.sc-mb-item').find('.item-checked').remove();
    $(this).append('<div class="item-checked"></div>');
});

// 上传页切换至模板页面
function goToTemplatePage() {
    // 先判断是否上传了照片，没上传需alert并return
    var templatePageShow = new TimelineMax({
        // onStart: initSwiper,
        onComplete: function () {
            hideAdjustGuide();
        }
    });
    templatePageShow.set('#template', {display: 'block', x: 640, autoAlpha: 1})
        .to('#upload-page', 0.4, {x: -640, ease: Power3.easeInOut})
        .to('#template', 0.4, {x: 0, ease: Power3.easeInOut}, '-=0.4')
        .set('#upload-page', {display: 'none', autoAlpha: 0})
}

// 模板页面返回切换至上传页
function backToUploadPage() {
    var uploadPageBackShow = new TimelineMax();
    uploadPageBackShow.set('#upload-page', {display: 'block', autoAlpha: 1})
        .to('#upload-page', 0.4, {x: 0, ease: Power3.easeInOut})
        .to('#template', 0.4, {x: 640, ease: Power3.easeInOut}, '-=0.4')
        .set('#template', {display: 'none', autoAlpha: 0})
}

// 点击上传照片页确认按钮
$('#upload-confirm').on('touchstart', goToTemplatePage);

// 表情图文页
$('#reselect').on('touchstart', backToUploadPage);

// 隐藏手指指示
function hideAdjustGuide() {
    var adjustGuideHide = new TimelineMax({
        delay: 1
    });
    adjustGuideHide.to('#adjust-guide', 0.6, {autoAlpha: 0})
        .set('#adjust-guide', {display: 'none'});
}

Draggable.create("#text-lists", {type:"scrollTop",
   // edgeResistance:0.1,
   throwProps:true,
});

Draggable.create("#sc-mb-items", {type:"scrollTop",
   // edgeResistance:0.1,
   throwProps:true,
});

// Draggable.create("#ribao-container", {type:"scrollTop",
//    // edgeResistance:0.1,
//    throwProps:true,
// });

// 模板页表情模板、配文按钮切换
function changeMbTextTabs() {
    console.log(this);
    $('.choose-tab').removeClass('active-tab');
    $(this).addClass('active-tab');
    if (this.id == 'mb-tab') {
        console.log('表情模板tab');
        TweenMax.to(['#template-pics', '#personal-input'], 0.4, {autoAlpha: 0});
        TweenMax.to('#template-text', 0.4, {autoAlpha: 1});
    }else if (this.id == 'text-tab') {
        console.log('配文模板');
        // showTextTypeChoose();
        TweenMax.to(['#template-pics', '#template-text'], 0.4, {autoAlpha: 0});
        TweenMax.to('#personal-input', 0.4, {autoAlpha: 1});
    }
}

$('.choose-tab').on('touchstart', changeMbTextTabs);

// 配文页选择配文类型
function showTextTypeChoose() {
    var textTypeChooseShow = new TimelineMax();
    textTypeChooseShow.set('#choose-text-type-container', {display: 'block', autoAlpha: 1})
        .fromTo('#choose-text-type-container', 0.4, {autoAlpha: 0}, {autoAlpha: 1})
        .fromTo('#choose-text-type', 0.6, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.2), force3D: true}, '-=0.2')
}

// 隐藏表情配文页配文类型弹窗
function hideTextTypeChoose() {
    var textTypeChooseHide = new TimelineMax({
        onStart: textChooseTypeResult
    });
    textTypeChooseHide.to('#choose-text-type', 0.6, {autoAlpha: 0, scale: 0, ease: Back.easeIn.config(1.2), force3D: true})
        .to('#choose-text-type-container', 0.4, {autoAlpha: 0}, '-=0.1')
        .set('#choose-text-type-container', {display: 'none'})
}

// 点击文案类型按钮隐藏弹窗并判断何种类型
$('.text-type-btn').on('touchstart', function () {
    console.log(this.id);
    if (this.id == 'mb-text-btn') {
        console.log('去模板文本界面');
        chooseTextType = 'mbText'; // 文案模板
    }else if (this.id == 'personal-text-btn') {
        console.log('去个性文本界面');
        chooseTextType = 'gxText'; // 个性文案
    }
    hideTextTypeChoose();
});

// 显示添加文本类型功能，即显示个性输入界面还是选择文本模板界面
function textChooseTypeResult() {
    // 选择素材库背景按钮
    if (chooseTextType == 'mbText') {
        TweenMax.to(['#template-pics', '#personal-input'], 0.4, {autoAlpha: 0});
        TweenMax.to('#template-text', 0.4, {autoAlpha: 1});
    }else if (chooseTextType == 'gxText') {
        TweenMax.to(['#template-pics', '#template-text'], 0.4, {autoAlpha: 0});
        TweenMax.to('#personal-input', 0.4, {autoAlpha: 1});
    }

}

// 模板页表情模板点选功能
function selectBqType() {
    console.log(this);
    $('.template-pic-type').removeClass('pic-type-active');
    $(this).addClass('pic-type-active');
    if (this.id=='kx') {
        choosePicType='kx'; // 开心
    }else if (this.id=='bkx') {
        choosePicType='bkx'; // 不开心
    }else if (this.id=='ku') {
        choosePicType='ku'; // 哭
    }else if (this.id=='mm') {
        choosePicType='mm'; // 卖萌
    }else if (this.id=='sb') {
        choosePicType='sb'; // 撕逼
    }else if (this.id=='zb') {
        choosePicType='zb'; // 装逼
    }else if (this.id=='qt') {
        choosePicType='qt'; // 哭
    }

    showMbFace(); // 去弹窗选择
}

// 点选表情模板类缩略图
$('.template-pic-type').on('touchstart', selectBqType);


// 模板页面切换至最终页
function goToGeneratedPage() {
    // 先判断表情模板是否选择，文字是否选择填写
    var generatedPageShow = new TimelineMax();
    generatedPageShow.set('#generated-page', {display: 'block', x: 640, autoAlpha: 1})
        .to('#template', 0.4, {x: -640, ease: Power3.easeInOut})
        .to('#generated-page', 0.4, {x: 0, ease: Power3.easeInOut}, '-=0.4')
        .set('#template', {display: 'none', autoAlpha: 0})
}

// 最终页返回至模板页
function backToTemplatePage() {
    var templatePageBackShow = new TimelineMax();
    templatePageBackShow.set('#template', {display: 'block', autoAlpha: 1})
        .to('#template', 0.4, {x: 0, ease: Power3.easeInOut})
        .to('#generated-page', 0.4, {x: 640, ease: Power3.easeInOut}, '-=0.4')
        .set('#generated-page', {display: 'none', autoAlpha: 0})
}

// 点击表情文字页确认按钮
$('#mb-text-confrim').on('touchstart', goToGeneratedPage);

// 点击最终页换一组按钮
$('#change-btn').on('touchstart', backToTemplatePage);

(function($) {
    $(document).ready(function() {
        console.log('Ready');
    });  //Document ready
})(jQuery);

function initSwiper() {
    // 表情模板轮播
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        slidesPerView: 3,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 10
    });
}



// 文字列表radio样式功能，获取文本内容 start
var radioBoxElements = Array.prototype.slice.call( document.querySelectorAll( '#text-lists input[type="radio"]' ) );
var textContent = '';
var contentArea = document.getElementById('display-text');

function createCheckedCircle() {
    var checkedCircle = document.createElement("div");
    checkedCircle.setAttribute("class","checked-circle");
    return checkedCircle;
}

function controlRadiobox(el) {
    var checkedCircle = createCheckedCircle();

    el.addEventListener( 'change', function() {
        console.log(el.parentNode);
        textContent = el.parentNode.querySelector( 'label' ).innerHTML; //获取label文本
        console.log(textContent);
        // contentArea.value = textContent;  // textarea文本内容设置为选择内容
        contentArea.innerHTML = textContent;  // 显示文本内容设置为选择内容
        resetRadio(el);
        el.parentNode.appendChild( checkedCircle );

    } );
}
    radioBoxElements.forEach( function( el, i ) { controlRadiobox( el ); } );

function resetRadio( el ) {
    Array.prototype.slice.call( document.querySelectorAll( 'input[type="radio"][name="' + el.getAttribute( 'name' ) + '"]' ) ).forEach( function( el ) {
        var checkedCircle = el.parentNode.querySelector( '.checked-circle' );
        if( checkedCircle) {
            el.parentNode.removeChild( checkedCircle );
        }
    } );
}
// 文本模板列表radio样式功能，获取文版模板内容 end

$('#personal-input').on('input', function () {
    console.log($('#personal-input').val());
    $('#display-text').html($('#personal-input').val());
});
