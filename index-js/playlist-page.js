{
    let view={
        el:'.playList-page',
        template:`
        <div class="playList-bg playList-bg-blur"></div>
        <div class="playList-wrap">
            <div class="playList-head">
                <a class="playList-back" href="#">Back</a>
                <p>Playlist</p>
                <img class="search" id="search" src="img/search.svg" alt="search">
            </div>
            <div class="singer-info-wrap">
                <div class="singer-pic"><img src="" alt=""></div>
                <div class="singer-info">
                    <p class="singer-info-name"></p>
                    <p class="singer-info-country"></p>
                    <p class="singer-info-represent"><B>Representative Song:</B><br/></p>
                </div>
            </div>
            <div class="songlist">
                <div class="songlist-headBar">
                    <span>SongList</span>               
                </div>
                <div class="songlist-ul-wrap">
                    <ul class="songlist-ul">
                    </ul>
                </div>
            </div>
        </div>        
        `,
        render(){
             $(this.el).html(this.template);
        },
        renderdata(data,singerinfo){
            $(this.el).find('.singer-info-name').html(singerinfo.name);
            $(this.el).find('.singer-info-country').html(singerinfo.country);
            $(this.el).find('.singer-info-represent').html('<B>Representative Song:</B><br/>'+singerinfo.represent);
            $(this.el).find('.singer-pic>img').attr('src','img/'+singerinfo.imgsrc);
            $(this.el).find('.songlist-ul').html('');
            for(let i=0;i<data.length;i++){
                let $li=$('<li class="songlist-ul-li" song_id="'+data[i].name+'"><p class="songlist-name">'+data[i].name+'</p><p class="songlist-singer">'+data[i].singer+'</p></li>');
                $(this.el).find('.songlist-ul').append($li);                
            }
        }
    }

    let model={
        data:{
            songlist:[],
            singerInfo:{},
            username:'',
            page_Identifier:'singer'
        },

        getplaylist(singername){
            this.data.songlist=[];
            var song = new AV.Query('Music');
            song.equalTo('singer', singername);
            song.select(['name', 'singer']);
            return song.find().then(function (songlist) {
                model.data.songlist=songlist.map((info)=>{
                    return {id:info.id, ...info.attributes}
                });
            });            
        },

        getsingerinfo(singername){
            this.data.singerInfo={};
            var song = new AV.Query('singerinfo');
            song.equalTo('name', singername);
            song.select(['name', 'country','represent','imgsrc']);
            return song.find().then(function (singerinfo) {
                model.data.singerInfo=singerinfo[0].attributes;
                return model.data.singerInfo;
            });            
        },

        getId(data){
            for(let i=0;i<this.data.songlist.length;i++){
                if(data===this.data.songlist[i].name){
                    return this.data.songlist[i].id;
                }
            }
        }

    }

    let controler={

        init(view,model){
            this.view=view;
            this.model=model;
            this.view.render();
            this.playlist_pageBack();
            window.eventHub.on('singer-playlist',(singername)=>{
                $(this.view.el).css("display","block");
                this.model.getplaylist(singername).then(()=>{
                    this.model.getsingerinfo(singername).then(()=>{
                        this.view.render();
                        this.playlist_pageBack();
                        this.view.renderdata(this.model.data.songlist,this.model.data.singerInfo);
                        this.singerTo_playsonglist();
                        window.eventHub.on('playsongList-back_singer',()=>{
                            $(this.view.el).show().animate({'left':0},500);                
                        })
                        console.log(this.model.data);                 
                    })
                })
            });
        },
        playlist_pageBack(){
            $(view.el).find('.playList-back').click(()=>{
                window.eventHub.emmit('playList-back');
                setTimeout(() => {
                    $(this.view.el).css("display","none")              
                }, 500);
            });
        },
        singerTo_playsonglist(){
            $(this.view.el).find('.songlist-ul').on('click','li',function(e){
                let name=e.currentTarget.getAttribute('song_id');
                model.data.username=model.getId(name);
                let data=model.data;
                window.eventHub.emmit('current-playlist',data);
                $(view.el).animate({'left':'-'+$(document).width()+'px'},500,()=>{
                    $(view.el).hide()
                });
            })
        },
    }
    controler.init(view,model);
}