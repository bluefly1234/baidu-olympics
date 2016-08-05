/**
  Author: Kale Chao | FakeCityMan
  Blog: http://kalechao87.github.io/
**/

(function($) {
    $(document).ready(function() {
        console.log('Ready');
    });  //Document ready
})(jQuery);

// 文字列表radio样式功能，获取祝福内容 start
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
// 祝福列表radio样式功能，获取祝福内容 end
