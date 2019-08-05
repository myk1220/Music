{
    let view={
        el:'.index-page',
        template:`
        <div class="index-bg index-bg-blur"></div>
        <div class="index-wrap">
            <div class="index-head">
                <a class="index-back" href="#"></a>
                <p>Musical</p>
                <img class="search" id="search" src="img/search.svg" alt="">
            </div>
            <div class="index-content">
                <div class="swiper-container swiper-container-singer">
                    <div id="singer-swiper" class="swiper-wrapper">
                    <div class="swiper-slide" singer_id="The Score"><img src="img/the Score.jpg" alt="图片加载失败"></div>
                    <div class="swiper-slide" singer_id="Imagine Dragons"><img src="img/imagindragon1.jpg" alt="图片加载失败"></div>
                    <div class="swiper-slide" singer_id="Maroon 5"><img src="img/maroon5.jpg" alt="图片加载失败"></div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="language-list">
                        <div class="language-list-head">
                            <span>Browse By Language</span>
                            <span>See All</span>
                        </div>
                        <div class="swiper-container swiper-container-language">
                                <div id="language-swiper" class="swiper-wrapper">
                                  <div class="swiper-slide"><div class="swiper-singer-language-cn">Chineses</div></div>
                                  <div class="swiper-slide"><div class="swiper-singer-language-en">English</div></div>
                                  <div class="swiper-slide"><div class="swiper-singer-language-ot">Other Language</div></div>
                                </div>
                        </div>
                </div>
                <div class="Album-list">
                    <div class="Album-list-head">
                        <span>Album of the Year</span>
                        <span>See All</span>
                    </div>
                    <div class="swiper-container swiper-container-album">
                            <div id="album-swiper" class="swiper-wrapper">
                              <div class="swiper-slide"><img src="img/maroonalbum.jpeg" alt="图片加载失败"><p class="album-name">V</p><p class="album-singer">Maroon5</p></div>
                              <div class="swiper-slide"><img src="img/legend.jpg" alt="图片加载失败"><p class="album-name">Legend</p><p class="album-singer">The Score</p></div>
                              <div class="swiper-slide"><img src="img/imagindragon.png" alt="图片加载失败"><p class="album-name">Thrones</p><p class="album-singer">Imagin Dragon</p></div>
                              <div class="swiper-slide"><img src="img/The score.jpeg" alt="图片加载失败"><p class="album-name">Album</p><p class="album-singer">Somebody</p></div>
                              <div class="swiper-slide"><img src="img/zhangjingxuan.jpeg" alt="图片加载失败"><p class="album-name">Eleven</p><p class="album-singer">张敬轩</p></div>
                            </div>
                    </div>
                </div>
                <div class="hot-songs">
                    <div class="hot-songs-head">
                        <span>Hot Songs Of The World</span>
                        <span>See All</span>
                    </div>
                    <div class="hot-songs-list-wrap">
                        <ul class="hot-songsUl">
                        </ul>
                    </div>                    
                </div>
            </div>
            <div class="sign-out"><p>Log Out</p></div>
        </div>        
        `,
        template_visitor:`
        <div class="index-bg index-bg-blur"></div>
        <div class="index-wrap">
            <div class="index-head">
                <a class="index-back" href="#">Visitor</a>
                <p>Musical</p>
                <img class="search" id="search" src="img/search.svg" alt="">
            </div>
            <div class="index-content">
                <div class="swiper-container swiper-container-singer">
                    <div id="singer-swiper" class="swiper-wrapper">
                        <div class="swiper-slide" singer_id="The Score"><img src="img/the Score.jpg" alt="图片加载失败"></div>
                        <div class="swiper-slide" singer_id="Imagine Dragons"><img src="img/imagindragon1.jpg" alt="图片加载失败"></div>
                        <div class="swiper-slide" singer_id="Maroon 5"><img src="img/maroon5.jpg" alt="图片加载失败"></div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="language-list">
                        <div class="language-list-head">
                            <span>Browse By Language</span>
                            <span>See All</span>
                        </div>
                        <div class="swiper-container swiper-container-language">
                                <div id="language-swiper" class="swiper-wrapper">
                                  <div class="swiper-slide"><div class="swiper-singer-language-cn">Chineses</div></div>
                                  <div class="swiper-slide"><div class="swiper-singer-language-en">English</div></div>
                                  <div class="swiper-slide"><div class="swiper-singer-language-ot">Other Language</div></div>
                                </div>
                        </div>
                </div>
                <div class="Album-list">
                    <div class="Album-list-head">
                        <span>Album of the Year</span>
                        <span>See All</span>
                    </div>
                    <div class="swiper-container swiper-container-album">
                            <div id="album-swiper" class="swiper-wrapper">
                              <div class="swiper-slide"><img src="img/maroonalbum.jpeg" alt="图片加载失败"><p class="album-name">V</p><p class="album-singer">Maroon5</p></div>
                              <div class="swiper-slide"><img src="img/legend.jpg" alt="图片加载失败"><p class="album-name">Legend</p><p class="album-singer">The Score</p></div>
                              <div class="swiper-slide"><img src="img/imagindragon.png" alt="图片加载失败"><p class="album-name">Thrones</p><p class="album-singer">Imagin Dragon</p></div>
                              <div class="swiper-slide"><img src="img/The score.jpeg" alt="图片加载失败"><p class="album-name">Album</p><p class="album-singer">Somebody</p></div>
                              <div class="swiper-slide"><img src="img/zhangjingxuan.jpeg" alt="图片加载失败"><p class="album-name">Eleven</p><p class="album-singer">张敬轩</p></div>
                            </div>
                    </div>
                </div>
                <div class="hot-songs">
                    <div class="hot-songs-head">
                        <span>Hot Songs Of The World</span>
                        <span>See All</span>
                    </div>
                    <div class="hot-songs-list-wrap">
                        <ul class="hot-songsUl">
                        </ul>
                    </div>                    
                </div>
            </div>
            <div class="sign-in"><p>Log In</p></div>
        </div>         
        `,
        render(data,content){
            $(this.el).html(content);
            for(let j=0;j<data.hotsongs.length;j++){
                let $li=$('<li class="hot-songsLi"><p class="hot-songs-list-name">'+data.hotsongs[j].name+'</p><p class="hot-songs-list-singer">'+data.hotsongs[j].singer+'</p></li>');
                $(this.el).find('.hot-songsUl').append($li);
            }
        }
    }

    let model={
        data:{
            hotsongs:[],
            username:''
        },
        getHotsongs(){
            var song = new AV.Query('Music');
            song.equalTo('hotSong', 'hot');
            song.select(['name', 'singer']);
            return song.find().then(function (hotsong) {
                for(let i=0;i<hotsong.length;i++){
                    model.data.hotsongs.push(hotsong[i].attributes);
                }
                return model.data.hotsongs;
            });
        },
        
    }

    let controler={
        init(view,model){
            this.view=view;
            this.model=model;
            this.renderCookie();
        },
        renderCookie(){
            this.view=view;
            this.model=model;
            let consumer=this.getCookie()['username'];
            if(consumer===undefined){
                this.model.getHotsongs().then(()=>{
                    this.view.render(model.data,view.template_visitor);
                    this.userCookie();
                    this.swiper_init();
                    this.logOut();
                    this.logIn();
                    this.singerTo_playlist();
                    window.eventHub.on('playList-back',()=>{
                        $(this.view.el).show().animate({'left':0},500);                
                    })
                });
            }else{
                this.model.getHotsongs().then(()=>{
                    this.view.render(model.data,view.template);
                    this.userCookie();
                    this.swiper_init();
                    this.logOut();
                    this.logIn();
                    this.singerTo_playlist();
                    window.eventHub.on('playList-back',()=>{
                        $(this.view.el).show().animate({'left':0},500);                
                    })
                });
            }
        },
        userCookie(){
            let consumer=unescape(this.getCookie()['username']);
            if(consumer!='undefined'){
            $(view.el).find('.index-back').html(consumer);
            }
        },
        getCookie(){
            var cookie=document.cookie;
            var cookieArr=cookie.split(';');
            var finalObj={};
            for(var i=0;i<cookieArr.length;i++){
                var tempArr=cookieArr[i].trim().split('=');
                finalObj[tempArr[0]]=tempArr[1];
            }
            return finalObj;
        },
        delCookie(name){ 
            var exp = new Date(); 
            exp.setTime(exp.getTime() - 10000); 
            var cval=controler.getCookie()['username'];
            if(cval!=null) 
                document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
        },
        logOut(){
            $(this.view.el).find('.sign-out').click(()=>{
                this.delCookie('username');
                this.view.render(this.model.data,this.view.template_visitor);
                this.logIn();
            })
        },
        logIn(){
            $(this.view.el).find('.sign-in').click(()=>{
                window.location.href = "start.html";
            })   
        },
        singerTo_playlist(){
            $(this.view.el).find('#singer-swiper').on('click','div',function(e){
                window.eventHub.emmit('singer-playlist',e.currentTarget.getAttribute('singer_id'));
                $(view.el).animate({'left':'-'+$(document).width()+'px'},500,()=>{
                    $(view.el).hide()
                });
            })
        },

        swiper_init(){
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
    }
    controler.init(view,model);

}