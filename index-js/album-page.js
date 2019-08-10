{
    let view={
        el:'.Album-page',
        template:`
        <div class="Album-bg Album-bg-blur"></div>
        <div class="Album-wrap">
            <div class="Album-head">
                <a class="Album-back" href="#">Back</a>
                <p>Album</p>
                <img class="search" id="search" src="img/search.svg" alt="">
            </div>
            <div class="Album-info-wrap">
                <div class="Album-pic"><img src="img/m5.jpg" alt="search"></div>
                <div class="Album-info">
                    <p class="Album-info-name">Maroon 5</p>
                    <p class="Album-info-singer">America</p>
                    <p class="Album-info-year"><B>Year of release of album:</B><br/>2013</p>
                </div>
            </div>
            <div class="Album-songlist">
                <div class="Album-songlist-headBar">
                    <span>SongList</span>               
                </div>
                <div class="Album-songlist-ul-wrap">
                    <ul class="Album-songlist-ul">
                    </ul>
                </div>
            </div>
        </div>        
        `,
        render(){
             $(this.el).html(this.template);
        },
        renderdata(data,albuminfo){
            $(this.el).find('.Album-info-name').html(albuminfo.name);
            $(this.el).find('.Album-info-singer').html(albuminfo.singer);
            $(this.el).find('.Album-info-year').html('<B>Year of release of album:</B><br/>'+albuminfo.year);
            $(this.el).find('.Album-pic>img').attr('src','img/'+albuminfo.imgsrc);
            $(this.el).find('.Album-songlist-ul').html('');
            for(let i=0;i<data.length;i++){
                let $li=$('<li class="Album-songlist-ul-li" albumsong_id="'+data[i].name+'"><p class="Album-songlist-name">'+data[i].name+'</p><p class="Album-songlist-singer">'+data[i].singer+'</p></li>');
                $(this.el).find('.Album-songlist-ul').append($li);                
            }
        }
    }

    let model={
        data:{
            songlist:[],
            albumInfo:{},
            username:'',
            page_Identifier:'album'
        },

        getalbumlist(albumname){
            this.data.songlist=[];
            var song = new AV.Query('Music');
            song.equalTo('album', albumname);
            song.select(['name', 'singer']);
            return song.find().then(function (songlist) {
                model.data.songlist=songlist.map((info)=>{
                    return {id:info.id, ...info.attributes}
                });
            });            
        },

        getalbuminfo(albumname){
            this.data.albumInfo={};
            var song = new AV.Query('albuminfo');
            song.equalTo('name', albumname);
            song.select(['name', 'singer','year','imgsrc']);
            return song.find().then(function (albuminfo) {
                model.data.albumInfo=albuminfo[0].attributes;
                return model.data.albumInfo;
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
            this.albumlist_pageBack();
            window.eventHub.on('singer-albumlist',(albumname)=>{
                $(this.view.el).css("display","block");
                this.model.getalbumlist(albumname).then(()=>{
                    this.model.getalbuminfo(albumname).then(()=>{
                        this.view.render();
                        this.albumlist_pageBack();
                        this.view.renderdata(this.model.data.songlist,this.model.data.albumInfo)                     
                        this.singerTo_playsonglist();
                        window.eventHub.on('playsongList-back_album',()=>{
                            $(this.view.el).show().animate({'left':0},500);                
                        })
                    })
                })
            });
        },
        albumlist_pageBack(){
            $(view.el).find('.Album-back').click(()=>{
                window.eventHub.emmit('Album-back');
                setTimeout(() => {
                    $(this.view.el).css("display","none")              
                }, 500);
            });
        },
        singerTo_playsonglist(){
            $(this.view.el).find('.Album-songlist-ul').on('click','li',function(e){
                let name=e.currentTarget.getAttribute('albumsong_id');
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