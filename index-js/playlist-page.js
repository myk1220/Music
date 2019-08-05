{
    let view={
        el:'.playList-page',
        template:`
        <div class="playList-bg playList-bg-blur"></div>
        <div class="playList-wrap">
            <div class="playList-head">
                <a class="playList-back" href="#">Back</a>
                <p>Playlist</p>
                <img class="search" id="search" src="" alt="">
            </div>
            <div class="singer-info-wrap">
                <div class="singer-pic"><img src="img/m5.jpg" alt="Maroon 5"></div>
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
                let $li=$('<li class="songlist-ul-li"><p class="songlist-name">'+data[i].name+'</p><p class="songlist-singer">'+data[i].singer+'</p></li>');
                $(this.el).find('.songlist-ul').append($li);                
            }
        }
    }

    let model={
        data:{
            singerPlayList:[],
            singerInfo:{},
        },

        getplaylist(singername){
            this.data.singerPlayList=[];
            console.log(this.data.singerPlayList);
            var song = new AV.Query('Music');
            song.equalTo('singer', singername);
            song.select(['name', 'singer']);
            return song.find().then(function (singerplaylist) {
                for(let i=0;i<singerplaylist.length;i++){
                    model.data.singerPlayList.push(singerplaylist[i].attributes);
                }
                return model.data.singerPlayList;
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
        }

    }

    let controler={

        init(view,model){
            this.view=view;
            this.model=model;
            this.view.render();
            this.playlist_pageBack();
            window.eventHub.on('singer-playlist',(singername)=>{
                $(this.view.el).css("visibility","visible");
                this.model.getplaylist(singername).then(()=>{
                    this.model.getsingerinfo(singername).then(()=>{
                        this.view.render();
                        this.playlist_pageBack();
                        this.view.renderdata(this.model.data.singerPlayList,this.model.data.singerInfo)                     
                    })
                })
            });
        },
        playlist_pageBack(){
            $(view.el).find('.playList-back').click(()=>{
                window.eventHub.emmit('playList-back');
                setTimeout(() => {
                    $(this.view.el).css("visibility","hidden")              
                }, 500);
            });
        }
    }
    controler.init(view,model);
}