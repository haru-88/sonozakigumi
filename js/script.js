$(window).on('load', function() {
  /* ローディングアニメーション */
  $('#loading').delay(1200).fadeOut('slow');
  $(".loader").delay(900).fadeOut('slow');
});

$( function() {
  AOS.init({
    duration: 1000,
  });

  /* ハンバーガーメニュー */
  $('#js-btnHamburger').on('click', function(e) {
    e.preventDefault();

    $('body, header').toggleClass('_open');
    if($('header').hasClass('_open')) {
      $('#js-btnHamburger').attr('aria-label', 'メニューを閉じる');
    }else {
      $('#js-btnHamburger').attr('aria-label', 'メニューを開く');
    };

    $('.js-navLink').on('click', function(e) {
      e.preventDefault();
      $('body, header').removeClass('_open');
    });

    $(window).resize(function() {
      if (window.matchMedia( "(min-width: 992px)" ).matches) {
        $('body, header').removeClass('_open');
        $('#js-btnHamburger').attr('aria-label', 'メニューを開く')
      }
    });
    return false;
  });

  /* header スクロールしてmvを過ぎたら固定＆color変更*/
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > $('#js-mv').outerHeight()) {
        $('header').addClass('_scrolled');
        $('#js-logo').attr('src', './img/logo-b.svg');
    } else {
        $('header').removeClass('_scrolled');
        $('#js-logo').attr('src', './img/logo-w.svg');
    }
  });

  /* カレントナビ */
  //基準点の準備
  let elemTop = [];

  //現在地を取得するための設定を関数でまとめる
  function PositionCheck(){
      //headerの高さを取得
    let headerH = $("header").outerHeight(true);
      //.scroll-pointというクラス名がついたエリアの位置を取得する設定
    $(".scroll-point").each(function(i) {//.scroll-pointクラスがついたエリアからトップまでの距離を計算して設定
      elemTop[i] =Math.round(parseInt($(this).offset().top-headerH));//追従するheader分の高さを引き小数点を四捨五入
    });
  }

  //ナビゲーションに現在地のクラスをつけるための設定
  function ScrollAnime() {//スクロールした際のナビゲーションの関数にまとめる
    let scroll = Math.round($(window).scrollTop());
    let NavElem = $(".header__item");//ナビゲーションのliの何番目かを定義するための準備
    $(".header__item a").removeClass('_current');//全てのナビゲーションの現在地クラスを除去
    if(scroll >= 0 && scroll < elemTop[1]) {//スクロール値が0以上 .scroll-point 1つめ（area-1）の高さ未満
        $(NavElem[0]).children("a").addClass('_current');//1つめのliに現在地クラスを付与
      }
    else if(scroll >= elemTop[1] && scroll < elemTop[2]) {//.scroll-point 1つめ（area-1）以上.scroll-point 2つめ（area-2）未満
      $(NavElem[1]).children("a").addClass('_current');//2つめのliに現在地クラスを付与
      } 
    else if(scroll >= elemTop[2] && scroll < elemTop[3]) {
      $(NavElem[2]).children("a").addClass('_current');
    } 
    else if(scroll >= elemTop[3] && scroll < elemTop[4]) {
      $(NavElem[3]).children("a").addClass('_current');
    } 
    else if(scroll >= elemTop[4] && scroll < elemTop[5]) {
      $(NavElem[4]).children("a").addClass('_current');
    } 
    else if(scroll >= elemTop[5] && scroll < elemTop[6]) {
      $(NavElem[5]).children("a").addClass('_current');
    } 
    else if(scroll >= elemTop[6] && scroll < elemTop[7]) {
      $(NavElem[6]).children("a").addClass('_current');
    } 
      
  }

  // 画面をスクロールをしたら動かす
  $(window).scroll(function () {
    PositionCheck();/* 現在地を取得する関数を呼ぶ*/
    ScrollAnime();/* ナビゲーションに現在地のクラスをつけるための関数を呼ぶ*/
  });
  $(window).resize(function() {
    //リサイズされたときの処理
    PositionCheck()
  });

  /*スムーススクロール */
  $( 'a[href^="#"]' ).on( 'click', function(e){
    e.preventDefault();
    var speed = 500;
    var href= $( this ).attr( 'href' );
    var target = $( href === '#' || href === '' ? 'html' : href );
    var position = target.offset().top - $('header').outerHeight();
    $('html, body').animate( { scrollTop:position }, speed, 'swing' );
    return false;
  });

});