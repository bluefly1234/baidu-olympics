/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/

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

function showUploadPage() {
    var uploadPageShow = new TimelineMax();
    uploadPageShow.set('#upload-page', {display: 'block', autoAlpha: 1, perspective: 500})
    .staggerFromTo(['#upload-container', '#upload-confirm'], 0.6, {autoAlpha: 0, z: -300}, {autoAlpha: 1, z: 0, ease: Back.easeOut.config(1.2)}, 0.12)
}


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
