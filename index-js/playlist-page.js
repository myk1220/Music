{
    let view={
        el:'.playList-page',
        template:`
        <div class="playList-bg playList-bg-blur"></div>
        <div class="playList-wrap">
            <div class="playList-head">
                <a class="playList-back" href="#">Back</a>
                <p>Playlist</p>
                <img class="search" id="search" src="img/search.svg" alt="">
            </div>
            <div class="singer-info-wrap">
                <div class="singer-pic"><img src="img/m5.jpg" alt="Maroon 5"></div>
                <div class="singer-info">
                    <p class="singer-info-name">Maroon 5</p>
                    <p class="singer-info-country">America</p>
                    <p class="singer-info-represent"><B>Representative Song:</B><br/>Payphone、Sugar、Map</p>
                </div>
            </div>
            <div class="songlist">
                <div class="songlist-headBar">
                    <span>SongList</span>               
                </div>
                <div class="songlist-ul-wrap">
                    <ul class="songlist-ul">
                        <li class="songlist-ul-li"><p class="songlist-name">Warriors</p><p class="songlist-singer">Imagin Dragon</p></li>
                        <li class="songlist-ul-li"><p class="songlist-name">Legend</p><p class="songlist-singer">The Score</p></li>
                        <li class="songlist-ul-li"><p class="songlist-name">春秋</p><p class="songlist-singer">张敬轩</p></li>
                        <li class="songlist-ul-li"><p class="songlist-name">打上花火</p><p class="songlist-singer">DAOKO,米津玄師</p></li>
                        <li class="songlist-ul-li"><p class="songlist-name">打上花火</p><p class="songlist-singer">DAOKO,米津玄師</p></li>
                        <li class="songlist-ul-li"><p class="songlist-name">打上花火</p><p class="songlist-singer">DAOKO,米津玄師</p></li>
                        <li class="songlist-ul-li"><p class="songlist-name">打上花火</p><p class="songlist-singer">DAOKO,米津玄師</p></li>
                    </ul>
                </div>
            </div>
        </div>        
        `,
        render(){
            $(this.el).html(this.template);

        }
    }

    let model={
        data:{
        }
    }

    let controler={

        init(view,model){
            this.view=view;
            this.model=model;
            this.view.render();
            window.eventHub.on('singer-playlist',(data)=>{
                $(this.view.el).css("visibility","visible");
            });
            this.playlist_pageBack();
        },
        playlist_pageBack(){
            $(view.el).find('.playList-back').click(()=>{
                window.eventHub.emmit('playList-back');
                setTimeout(() => {
                    $(this.view.el).css("visibility","hidden")              
                }, 1000);
            });
        }
    }
    controler.init(view,model);
}