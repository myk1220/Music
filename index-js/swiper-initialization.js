{
    var mySwiper_singer = new Swiper ('.swiper-container-singer', {
        direction: 'horizontal',
        loop: true,
        pagination :{
          el: '.swiper-pagination',
          clickable :true,
        },
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
    });

    var swiper_album = new Swiper('.swiper-container-album', {
      slidesPerView: 2.4,
      spaceBetween: 15
    });
    
    var swiper_language = new Swiper('.swiper-container-language', {
      slidesPerView: 1.7,
      spaceBetween: 15
    });    
}