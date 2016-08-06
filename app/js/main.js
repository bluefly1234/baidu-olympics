/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/
var choosePicType = ''; // 添加上传照片类型
var scType = ''; // 素材类型是背景，还是各种类型表情
var choosedPicVal = ''; // 点选背景模板，表情模板的值，即图片src

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
    'images/ribao.png',
    'images/right-arrow.png',
    'images/right-hand.png',
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
        hideLoading.to(['#loading-num'], 0.6, {autoAlpha: 0})
        .set(['#loading-num'], {display: 'none'})
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

    // common page
    $('#common-title').css('background-image', 'url(images/common-title.png)');
    $('#common-bottom').css('background-image', 'url(images/common-bottom.png)');

    // upload page
    $('#upload-icon').css('background-image', 'url(images/upload-icon.png)');
    $('#upload-confirm').css('background-image', 'url(images/confirm.png)');

    // 模板选择弹窗
    $('.confirm-blue').css('background-image', 'url(images/confirm-blue.png)');
    $('#choose').css('background-image', 'url(images/choose.png)');
    $('#from-sc').css('background-image', 'url(images/from-sc.png)');
    $('#from-photo').css('background-image', 'url(images/from-photo.png)');
    $('#sc-mb-container').css('background-image', 'url(images/sc-mb-bg.png)');
    $('.close-btn').css('background-image', 'url(images/close-btn.png)');



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

// 显示共用背景元素
function showCommonPage() {
    var commonPageShow = new TimelineMax({
        onComplete: function () {
            showUploadPage(); // 初次显示upload-page
        }
    });
    commonPageShow.set('#common-page', {display: 'block', autoAlpha: 1})
        .fromTo('#common-bottom', 0.6, {autoAlpha: 0, y: 640}, {autoAlpha: 1, y: 0})
        .fromTo('#common-title', 0.8, {autoAlpha: 0, y: -320}, {autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.2)}, '-=0.3')
}

// 初次显示上传页
function showUploadPage() {
    var uploadPageShow = new TimelineMax();
    uploadPageShow.set('#upload-page', {display: 'block', autoAlpha: 1, perspective: 500})
    .staggerFromTo(['#upload-container', '#upload-confirm'], 0.6, {autoAlpha: 0, z: -300}, {autoAlpha: 1, z: 0, ease: Back.easeOut.config(1.2)}, 0.12)
}

// 点击上传加号调用显示选择照片类型弹窗
$('#upload-icon').on('touchstart', showPicTypeChoose);

// 显示上传页选择照片类型
function showPicTypeChoose() {
    var picTypeChooseShow = new TimelineMax();
    picTypeChooseShow.set('#choose-pic', {display: 'block', autoAlpha: 1})
        .fromTo('#choose-pic', 0.4, {autoAlpha: 0}, {autoAlpha: 1})
        .fromTo('#choose', 0.6, {autoAlpha: 0, scale: 0}, {autoAlpha: 1, scale: 1, ease: Back.easeOut.config(1.2), force3D: true}, '-=0.2')
}

// 隐藏上传页照片类型弹窗
function hidePicTypeChoose() {
    var picTypeChooseHide = new TimelineMax({
        onComplete: uploadChooseTypeResult
    });
    picTypeChooseHide.to('#choose', 0.6, {autoAlpha: 0, scale: 0, ease: Back.easeIn.config(1.2), force3D: true})
        .to('#choose-pic', 0.4, {autoAlpha: 0}, '-=0.1')
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
        .fromTo('#sc-mb-container', 0.8, {autoAlpha: 0, y: -1000}, {autoAlpha: 1, y: 0, ease: Back.easeOut.config(1.2)})
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

// 上传页切换至模板页面
function goToTemplatePage() {
    // 先判断是否上传了照片，没上传需alert并return
    var templatePageShow = new TimelineMax();
    templatePageShow.set('#template', {display: 'block', x: 640, autoAlpha: 1})
        .to('#upload-page', 0.8, {x: -640, ease: Power3.easeInOut})
        .to('#template', 0.8, {x: 0, ease: Power3.easeInOut}, '-=0.8')
        .set('#upload-page', {display: 'none', autoAlpha: 0})
}

// 模板页面返回切换至上传页
function backToUploadPage() {
    var uploadPageBackShow = new TimelineMax();
    uploadPageBackShow.set('#upload-page', {display: 'block', autoAlpha: 1})
        .to('#upload-page', 0.8, {x: 0, ease: Power3.easeInOut})
        .to('#template', 0.8, {x: 640, ease: Power3.easeInOut}, '-=0.8')
        .set('#template', {display: 'none', autoAlpha: 0})
}

// 点击上传照片页确认按钮
$('#upload-confirm').on('touchstart', goToTemplatePage);

// 表情图文页
$('#reselect').on('touchstart', backToUploadPage);


// 模板页面切换至最终页
function goToGeneratedPage() {
    // 先判断表情模板是否选择，文字是否选择填写
    var generatedPageShow = new TimelineMax();
    generatedPageShow.set('#generated-page', {display: 'block', x: 640, autoAlpha: 1})
        .to('#template', 0.8, {x: -640, ease: Power3.easeInOut})
        .to('#generated-page', 0.8, {x: 0, ease: Power3.easeInOut}, '-=0.8')
        .set('#template', {display: 'none', autoAlpha: 0})
}

// 最终页返回至模板页
function backToTemplatePage() {
    var templatePageBackShow = new TimelineMax();
    templatePageBackShow.set('#template', {display: 'block', autoAlpha: 1})
        .to('#template', 0.8, {x: 0, ease: Power3.easeInOut})
        .to('#generated-page', 0.8, {x: 640, ease: Power3.easeInOut}, '-=0.8')
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

// 表情模板轮播
var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    slidesPerView: 3,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    paginationClickable: true,
    spaceBetween: 10,
    loop: true
});

// 文字列表radio样式功能，获取文本内容 start
var radioBoxElements = Array.prototype.slice.call( document.querySelectorAll( '#text-lists input[type="radio"]' ) );
var textContent = '';
// var contentArea = document.getElementById('blessing-content');

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
