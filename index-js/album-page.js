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
                let $li=$('<li class="Album-songlist-ul-li"><p class="Album-songlist-name">'+data[i].name+'</p><p class="Album-songlist-singer">'+data[i].singer+'</p></li>');
                $(this.el).find('.Album-songlist-ul').append($li);                
            }
        }
    }

    let model={
        data:{
            albumPlayList:[],
            albumInfo:{},
        },

        getalbumlist(albumname){
            this.data.albumPlayList=[];
            var song = new AV.Query('Music');
            song.equalTo('album', albumname);
            song.select(['name', 'singer']);
            return song.find().then(function (albumplaylist) {
                for(let i=0;i<albumplaylist.length;i++){
                    model.data.albumPlayList.push(albumplaylist[i].attributes);
                }
                return model.data.albumPlayList;
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
        }

    }

    let controler={

        init(view,model){
            this.view=view;
            this.model=model;
            this.view.render();
            this.albumlist_pageBack();
            window.eventHub.on('singer-albumlist',(albumname)=>{
                $(this.view.el).css("visibility","visible");
                this.model.getalbumlist(albumname).then(()=>{
                    this.model.getalbuminfo(albumname).then(()=>{
                        this.view.render();
                        this.albumlist_pageBack();
                        this.view.renderdata(this.model.data.albumPlayList,this.model.data.albumInfo)                     
                    })
                })
            });
        },
        albumlist_pageBack(){
            $(view.el).find('.Album-back').click(()=>{
                window.eventHub.emmit('Album-back');
                setTimeout(() => {
                    $(this.view.el).css("visibility","hidden")              
                }, 500);
            });
        }
    }
    controler.init(view,model);
}