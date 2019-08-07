{
    let view={
        el:'.index-page',
        template:`
        <div class="index-bg index-bg-blur"></div>
        <div class="index-wrap">
            <div class="index-head">
                <a class="index-back" href="#"></a>
                <p>Musical</p>
                <img class="search" id="search" src="img/search.svg" alt="search">
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
                                  <div class="swiper-slide"><div class="swiper-singer-language-cn languge" language_id='cn'>Chineses</div></div>
                                  <div class="swiper-slide"><div class="swiper-singer-language-en languge" language_id='en'>English</div></div>
                                  <div class="swiper-slide"><div class="swiper-singer-language-ot languge" language_id='ot'>Other Language</div></div>
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
                              <div class="swiper-slide" album_id='V'><img src="img/maroonalbum.jpeg" alt="图片加载失败"><p class="album-name">V</p><p class="album-singer">Maroon5</p></div>
                              <div class="swiper-slide" album_id='Legend'><img src="img/legend.jpg" alt="图片加载失败"><p class="album-name">Legend</p><p class="album-singer">The Score</p></div>
                              <div class="swiper-slide" album_id='Thrones'><img src="img/imagindragon.png" alt="图片加载失败"><p class="album-name">Thrones</p><p class="album-singer">Imagin Dragon</p></div>
                              <div class="swiper-slide" album_id='Album'><img src="img/The score.jpeg" alt="图片加载失败"><p class="album-name">Album</p><p class="album-singer">Somebody</p></div>
                              <div class="swiper-slide" album_id='Eleven'><img src="img/zhangjingxuan.jpeg" alt="图片加载失败"><p class="album-name">Eleven</p><p class="album-singer">张敬轩</p></div>
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
        render(data,content){
            $(this.el).html(this.template);
            $(this.el).find('.index-back').html(content);
            if(content==='Visitor'){
                $(this.el).find('.sign-out').removeClass('sign-out').addClass('sign-in');
                $(this.el).find('.sign-in > p').html('Log In');
            }
            for(let j=0;j<data.hotsongs.length;j++){
                let $li=$('<li class="hot-songsLi" hotsong_id="'+data.hotsongs[j].name+'"><p class="hot-songs-list-name">'+data.hotsongs[j].name+'</p><p class="hot-songs-list-singer">'+data.hotsongs[j].singer+'</p></li>');
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
                model.data.hotsongs=hotsong.map((info)=>{
                    return {id:info.id, ...info.attributes}
                });
            });
        },
        getId(data){
            for(let i=0;i<this.data.hotsongs.length;i++){
                if(data===this.data.hotsongs[i].name){
                    return this.data.hotsongs[i].id;
                }
            }
        }
        
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
                    this.view.render(model.data,'Visitor');
                    this.swiper_init();
                    this.logOut();
                    this.logIn();
                    this.singerTo_playlist();
                    this.singerTo_albumlist();
                    this.singerTo_languagelist();
                    this.singerTo_playsonglist();
                    window.eventHub.on('playList-back',()=>{
                        $(this.view.el).show().animate({'left':0},500);                
                    });
                    window.eventHub.on('Album-back',()=>{
                        $(this.view.el).show().animate({'left':0},500);                
                    });
                    window.eventHub.on('language-back',()=>{
                        $(this.view.el).show().animate({'left':0},500);                
                    });
                    window.eventHub.on('playsongList-back',()=>{
                        $(this.view.el).show().animate({'left':0},500);                
                    })
                });
            }else{
                let consumer=unescape(this.getCookie()['username']);
                this.model.getHotsongs().then(()=>{
                    this.view.render(model.data,consumer);
                    this.swiper_init();
                    this.logOut();
                    this.logIn();
                    this.singerTo_playlist();
                    this.singerTo_albumlist();
                    this.singerTo_languagelist();
                    this.singerTo_playsonglist();
                    window.eventHub.on('playList-back',()=>{
                        $(this.view.el).show().animate({'left':0},500);                
                    });
                    window.eventHub.on('Album-back',()=>{
                        $(this.view.el).show().animate({'left':0},500);                
                    });
                    window.eventHub.on('language-back',()=>{
                        $(this.view.el).show().animate({'left':0},500);                
                    });
                    window.eventHub.on('playsongList-back',()=>{
                        $(this.view.el).show().animate({'left':0},500);                
                    })
                });
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
                this.view.render(this.model.data,'Visitor');
                this.logIn();
            })
        },
        logIn(){
            $(this.view.el).find('.sign-in').click(()=>{
                window.location.href = "start.html";
            })   
        },

        singerTo_playlist(){
            $(this.view.el).find('#singer-swiper').on('click','.swiper-slide',function(e){
                window.eventHub.emmit('singer-playlist',e.currentTarget.getAttribute('singer_id'));
                $(view.el).animate({'left':'-'+$(document).width()+'px'},500,()=>{
                    $(view.el).hide()
                });
            })
        },
        singerTo_albumlist(){
            $(this.view.el).find('#album-swiper').on('click','div',function(e){
                window.eventHub.emmit('singer-albumlist',e.currentTarget.getAttribute('album_id'));
                $(view.el).animate({'left':'-'+$(document).width()+'px'},500,()=>{
                    $(view.el).hide()
                });
            })
        },
        singerTo_languagelist(){
            $(this.view.el).find('#language-swiper').on('click','.languge',function(e){
                window.eventHub.emmit('singer-languagelist',e.currentTarget.getAttribute('language_id'));
                $(view.el).animate({'left':'-'+$(document).width()+'px'},500,()=>{
                    $(view.el).hide()
                });
            })
        },
        singerTo_playsonglist(){
            $(this.view.el).find('.hot-songsUl').on('click','li',function(e){
                let name=e.currentTarget.getAttribute('hotsong_id');
                let data=model.getId(name);
                window.eventHub.emmit('current-playlist',data);
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