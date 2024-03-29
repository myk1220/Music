{
    let view={
        el:'.play-page',
        template:`
        <audio src=""></audio>
        <div class="play-page-wrap">
        <div class="play-bg play-bg-blur"></div>
        <div class="play-wrap">
            <div class="play-head">
                <a class="play-back" href="#">Back</a>
                <p>Play</p>
            </div>
        </div>
        <div class="playalbum-wrap">
            <div class="playalbum"></div>
        </div>
        <div class="songInfo">
            <p class="songName">Sugar</p>
            <p class="singer">Marron 5</p>
        </div>
        <div class="lyric-wrap">
            <div class="lyric"></div>
        </div>
        <div class="progressBar-wrap">
            <p id="passTime">00:00</p>
            <div class="progressBar-total"></div>
            <div class="progressBar-passed"></div>
            <p id="totalTime">00:00</p>
        </div>
        <div class="control-button">
            <div id="prev-Song"></div>
            <div class="control-Song-wrap">
                <div id="pause-Song" class="control-Song"></div>
            </div>
            <div id="next-Song"></div>
        </div>
    </div>       
        `,
        render(){
            $(this.el).html(this.template);
            $(this.el).find('audio')[0].ontimeupdate=()=>{
                controler.showlyric($(this.el).find('audio')[0].currentTime);
            } 
        },
        renderdata(songinfo){
            $(this.el).find('.songName').html(songinfo.name);
            $(this.el).find('.singer').html(songinfo.singer);
            $(this.el).find('.playalbum').css('background-image','url(img/'+songinfo.imgsrc+')');
            $(this.el).find('audio').attr('src',songinfo.link);
            $(this.el).find('.control-button').html('<div id="prev-Song"></div><div class="control-Song-wrap"><div id="pause-Song" class="control-Song"></div></div><div id="next-Song"></div></div>');
        },
        renderSong(songinfo){
            $(this.el).find('.songName').html(songinfo.name);
            $(this.el).find('.singer').html(songinfo.singer);
            $(this.el).find('.playalbum').css('background-image','url(img/'+songinfo.imgsrc+')');
            $(this.el).find('audio').attr('src',songinfo.link);
        }
    }

    let model={
        data:{
            current_playsong:{
                id:'',
                name:'',
                singer:'',
                link:'',
                imgsrc:'',
            },
            time:{},
            rotateData:{
                Ndeg:0,
                canBegin:true
            },
            playTime:{
                total_m:0,
                total_s:0,
                current_m:0,
                current_s:0,
            },
            playList:[],
            page_Identifier:'',
            lyc:''
        },
        getSongInfo(songname){
            var song = new AV.Query('Music');
            return song.get(songname).then((song)=>{
                this.data.current_playsong.name=song.get('name');
                this.data.current_playsong.singer=song.get('singer');
                this.data.current_playsong.link=song.get('link');
                this.data.current_playsong.imgsrc=song.get('imgsrc');
                this.data.lyc=song.get('lyric');
            }); 
        }
    }

    let controler={

        init(view,model){
            this.view=view;
            this.model=model;
            this.view.render();
            window.eventHub.on('current-playlist',(song)=>{
                this.model.data.page_Identifier=song.page_Identifier;
                if(song.username===this.model.data.current_playsong.id){
                    $(this.view.el).css("display","block");
                }else{
                    this.model.data.playList=song.songlist.map((song)=>{
                        return song.id;
                    });
                    this.model.data.current_playsong.id=song.username;
                    $(this.view.el).css("display","block");
                        this.model.getSongInfo(song.username).then(()=>{
                            this.view.renderdata(this.model.data.current_playsong);
                            this.initialization();
                            this.play_paused();
                            this.playsonglist_pageBack();
                            this.next_song();
                            this.prev_song();
                            this.doLyric();
                        })
                }
            });
        },

        showlyric(time){
            
            for(let i=0;i< $(this.view.el).find('.lyric-wrap > .lyric > p').length;i++){
                if(i==0){
                    if(time<=$(this.view.el).find('.lyric-wrap > .lyric > p').eq(i).attr('time_id')){
                        $(this.view.el).find('.lyric-wrap > .lyric').animate({top:"0.4rem"},100);
                        $(this.view.el).find('.lyric > p').eq(i).addClass('active');
                        return;
                    }
                }else if(i==$(this.view.el).find('.lyric-wrap > .lyric > p').length-1){
                    if(time>=$(this.view.el).find('.lyric-wrap > .lyric > p').eq(i).attr('time_id')){
                        $(this.view.el).find('.lyric-wrap > .lyric').animate({top:-parseInt($(this.view.el).find('.lyric-wrap > .lyric').css('height'))+'rem'},100);
                        $(this.view.el).find('.lyric-wrap > .lyric > p').eq(i).siblings().removeClass('active');
                        $(this.view.el).find('.lyric-wrap > .lyric > p').eq(i).addClass('active');
                    }
                }else{
                    let current_tim = $(this.view.el).find('.lyric-wrap > .lyric > p').eq(i).attr('time_id');
                    let next_tim = $(this.view.el).find('.lyric-wrap > .lyric > p').eq(i+1).attr('time_id');
                    if(time >= current_tim && time < next_tim){
                        $(this.view.el).find('.lyric-wrap > .lyric').animate({top:-($(this.view.el).find('.lyric-wrap > .lyric > p').eq(i).position().top*0.01-0.4)+'rem'},100);
                        $(this.view.el).find('.lyric-wrap > .lyric > p').eq(i).siblings().removeClass('active');
                        $(this.view.el).find('.lyric-wrap > .lyric > p').eq(i).addClass('active');
                    }
                }
            }    
        },

        doLyric(){
            $(this.view.el).find('.lyric').html('');
            let reg=/\[([\d:.]+)\](.+)/;
            let y=model.data.lyc.split("\n");
            y.map((string)=>{
                let p = string.match(reg);
                let tim = p[1].split(':');
                let min = tim[0];
                let sec = tim[1];
                let newTime = parseFloat(min) * 60 + parseFloat(sec);
                $(this.view.el).find('.lyric').append($('<p time_id="'+newTime+'"></p>').html(p[2]));
            });
        },

        next_song(){
            $(this.view.el).find('#next-Song').click(()=>{
                let index=this.model.data.playList.indexOf(this.model.data.current_playsong.id)+1;
                if(index===this.model.data.playList.length){
                    index=0;
                };
                model.data.current_playsong.id=this.model.data.playList[index];
                this.model.getSongInfo(this.model.data.playList[index]).then(()=>{
                    this.view.renderSong(this.model.data.current_playsong);
                    $(this.view.el).find('.control-Song').attr('id','pause-Song');
                    this.initialization();
                    this.doLyric(); 
                })

            })
        },

        prev_song(){
            $(this.view.el).find('#prev-Song').click(()=>{
                let index=this.model.data.playList.indexOf(this.model.data.current_playsong.id)-1;
                if(index===-1){
                    index=this.model.data.playList.length-1;
                };
                model.data.current_playsong.id=this.model.data.playList[index];
                this.model.getSongInfo(this.model.data.playList[index]).then(()=>{
                    this.view.renderSong(this.model.data.current_playsong);
                    $(this.view.el).find('.control-Song').attr('id','pause-Song');
                    this.initialization();
                    this.doLyric(); 
                })

            })
        },

        auto_next(){
            if($(this.view.el).find('audio')[0].ended){
                let index=this.model.data.playList.indexOf(this.model.data.current_playsong.id)-1;
                if(index===-1){
                    index=this.model.data.playList.length-1;
                };
                model.data.current_playsong.id=this.model.data.playList[index];
                this.model.getSongInfo(this.model.data.playList[index]).then(()=>{
                    this.view.renderSong(this.model.data.current_playsong);
                    $(this.view.el).find('.control-Song').attr('id','pause-Song');
                    this.initialization();
                    this.doLyric(); 
                })
            }
        },

        playsonglist_pageBack(){
            $(this.view.el).find('.play-back').click(()=>{
                switch(this.model.data.page_Identifier) {
                    case 'index':
                        window.eventHub.emmit('playsongList-back_index');
                        setTimeout(() => {
                            $(this.view.el).css("display","none")              
                        }, 500);
                       break;
                    case 'singer':
                        window.eventHub.emmit('playsongList-back_singer');
                        setTimeout(() => {
                            $(this.view.el).css("display","none")              
                        }, 500);
                       break;
                    case 'album':
                        window.eventHub.emmit('playsongList-back_album');
                        setTimeout(() => {
                            $(this.view.el).css("display","none")              
                        }, 500);
                    break;
                    case 'language':
                        window.eventHub.emmit('playsongList-back_language');
                        setTimeout(() => {
                            $(this.view.el).css("display","none")              
                        }, 500);
                    break;
               } 


            });
        },

        total_time(){
            let getkey=setInterval(()=>{
                if(document.querySelector('audio').duration){
                    clearInterval(getkey);
                    let totaltime=document.querySelector('audio').duration;
                    let totaltime_m=Math.floor(totaltime/60);
                    let totaltime_s=Math.floor(totaltime%60);
                    if(totaltime_m<10){this.model.data.playTime.total_m='0'+totaltime_m}else{this.model.data.playTime.total_m=totaltime_m};
                    if(totaltime_s<10){this.model.data.playTime.total_s='0'+totaltime_s}else{this.model.data.playTime.total_s=totaltime_s};
                    $(this.view.el).find('#totalTime').html(this.model.data.playTime.total_m+':'+this.model.data.playTime.total_s);
        
                    this.model.data.time['total_timer']=setInterval(()=>{         
                        this.auto_next();
                        let totaltime=document.querySelector('audio').duration;
                        let currenttime=document.querySelector('audio').currentTime;
                        let passedPro=currenttime/totaltime;
                        let currenttime_m=Math.floor(currenttime/60);
                        let currenttime_s=Math.floor(currenttime%60);
                        if(currenttime_m<10){this.model.data.playTime.current_m='0'+currenttime_m}else{this.model.data.playTime.current_m=currenttime_m};
                        if(currenttime_s<10){this.model.data.playTime.current_s='0'+currenttime_s}else{this.model.data.playTime.current_s=currenttime_s};
                        $(this.view.el).find('#passTime').html(this.model.data.playTime.current_m+':'+this.model.data.playTime.current_s);
                        $(this.view.el).find('.progressBar-passed').css("width",(2.4*passedPro)+"rem");
                    },1000)
                }
            },5)

        },

        initialization(){
            $(this.view.el).find('#totalTime').html('00:00');
            $(this.view.el).find('#passTime').html('00:00');
            $(this.view.el).find('.playalbum').css('transform','rotate(0deg)');
            $(this.view.el).find('.progressBar-passed').css("width",0);
            model.data.rotateData.Ndeg=0;
            model.data.rotateData.canBegin=true;   
            this.clear();
            document.querySelector('audio').play();  
            this.albumrotate();
            this.total_time();  
        },

        clear(){
            clearInterval(this.model.data.time['total_timer']);
            clearInterval(this.model.data.time['albumrotate_timer']);
        },

        play_paused(){
            $(this.view.el).find('.control-Song').click(()=>{
                this.albumrotate();
                if($(this.view.el).find('.control-Song').attr('id')==='pause-Song'){
                    document.querySelector('audio').pause();
                    this.clear();
                    $(this.view.el).find('.control-Song').attr('id','play-Song');
                }else{
                    document.querySelector('audio').play();
                    this.total_time();
                    $(this.view.el).find('.control-Song').attr('id','pause-Song');
                }
            })
        },

        albumrotate(){
            if(model.data.rotateData.canBegin===true){
                this.model.data.time['albumrotate_timer']=setInterval(()=>{
                    model.data.rotateData.Ndeg=model.data.rotateData.Ndeg+0.1;
                    var deg = 1 * model.data.rotateData.Ndeg;
                    $(this.view.el).find('.playalbum').css('transform','rotate('+deg+'deg)');
                }, 10);
                this.model.data.rotateData.canBegin = false;
            } else {
                this.model.data.rotateData.canBegin = true;
                }
        }
    }
    controler.init(view,model);
}