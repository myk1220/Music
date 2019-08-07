{
    let view={
        el:'.play-page',
        template:`
        <audio  src=""></audio>
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
        <div class="lyric"></div>
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
        },
        renderdata(songinfo){
            $(this.el).find('.songName').html(songinfo.name);
            $(this.el).find('.singer').html(songinfo.singer);
            $(this.el).find('audio').attr('src',songinfo.link);
            $(this.el).find('.control-Song-wrap').html('<div id="pause-Song" class="control-Song"></div>')
        },
    }

    let model={
        data:{
            current_playsong:{
                name:'',
                singer:'',
                link:''
            },
            rotateData:{
                timer:{},
                Ndeg:0,
                canBegin:true
            }
        },
        getSongInfo(songname){
            var song = new AV.Query('Music');
            return song.get(songname).then((song)=>{
                this.data.current_playsong.name=song.get('name');
                this.data.current_playsong.singer=song.get('singer');
                this.data.current_playsong.link=song.get('link');
            }); 
        }
    }

    let controler={

        init(view,model){
            this.view=view;
            this.model=model;
            this.view.render();
            window.eventHub.on('current-playlist',(song)=>{
                $(this.view.el).css("display","block");
                this.model.getSongInfo(song).then(()=>{
                    this.view.renderdata(this.model.data.current_playsong);
                    this.first_play();
                    this.play_paused();
                    this.playsonglist_pageBack();
                })
            })
        },

        playsonglist_pageBack(){
            $(view.el).find('.play-back').click(()=>{
                window.eventHub.emmit('playsongList-back');
                setTimeout(() => {
                    $(this.view.el).css("display","none")              
                }, 500);
            });
        },

        first_play(){
            clearInterval(model.data.rotateData.timer);
            model.data.rotateData.timer='';
            model.data.rotateData.Ndeg=0;
            model.data.rotateData.canBegin=true;
            document.querySelector('audio').play();
            this.albumrotate();
            if($(this.view.el).find('#play-Song')){
                $(this.view.el).find('#play-Song').attr('id','pause-Song');
            } 
        },

        play_paused(){
            $(this.view.el).find('.control-Song').click(()=>{
                this.albumrotate();
                if($(this.view.el).find('.control-Song').attr('id')==='pause-Song'){
                    document.querySelector('audio').pause();
                    $(this.view.el).find('.control-Song').attr('id','play-Song');
                }else{
                    document.querySelector('audio').play();
                    $(this.view.el).find('.control-Song').attr('id','pause-Song');
                }
            })
        },

        albumrotate(){
            if(model.data.rotateData.canBegin===true){
                model.data.rotateData.timer = setInterval(()=>{
                    model.data.rotateData.Ndeg=model.data.rotateData.Ndeg+0.1;
                    var deg = 1 * model.data.rotateData.Ndeg;
                    $(this.view.el).find('.playalbum').css('transform','rotate('+deg+'deg)');
                }, 10);
                model.data.rotateData.canBegin = false;
            } else {
                clearInterval(model.data.rotateData.timer);
                model.data.rotateData.canBegin = true;
                }
        }
    }
    controler.init(view,model);
}