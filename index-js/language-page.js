{
    let view={
        el:'.language-page',
        template:`
        <div class="language-bg language-bg-blur"></div>
        <div class="language-wrap">
            <div class="language-head">
                <a class="language-back" href="#">Back</a>
                <p>Language</p>
                <img class="search" id="search" src="img/search.svg" alt="">
            </div>
            <div class="language-info-wrap">
                <div class="language-pic">Chineses</div>
            </div>
            <div class="language-songlist">
                <div class="language-songlist-headBar">
                    <span>SongList</span>               
                </div>
                <div class="language-songlist-ul-wrap">
                    <ul class="language-songlist-ul">
                    </ul>
                </div>
            </div>
        </div>        
        `,
        render(){
             $(this.el).html(this.template);
        },
        renderdata(data,languageinfo){
            $(this.el).find('.language-pic').css("background-image","url(img/"+languageinfo.imgsrc+")");
            $(this.el).find('.language-pic').html(languageinfo.content);
            for(let i=0;i<data.length;i++){
                let $li=$('<li class="language-songlist-ul-li"><p class="language-songlist-name">'+data[i].name+'</p><p class="language-songlist-singer">'+data[i].singer+'</p></li>');
                $(this.el).find('.language-songlist-ul').append($li);
            }
        }
    }

    let model={
        data:{
            languagePlayList:[],
            languageInfo:{},
        },

        getlanguagelist(languagename){
            this.data.languagePlayList=[];
            var song = new AV.Query('Music');
            song.equalTo('songType', languagename);
            song.select(['name', 'singer']);
            return song.find().then(function (languageplaylist) {
                for(let i=0;i<languageplaylist.length;i++){
                    model.data.languagePlayList.push(languageplaylist[i].attributes);
                }
                return model.data.languagePlayList;
            });            
        },

        getlanguageinfo(languagename){
            this.data.languageInfo={};
            var song = new AV.Query('languageinfo');
            song.equalTo('name', languagename);
            song.select(['name', 'content','imgsrc']);
            return song.find().then(function (languageinfo) {
                model.data.languageInfo=languageinfo[0].attributes;
                return model.data.languageInfo;
            });            
        }

    }

    let controler={

        init(view,model){
            this.view=view;
            this.model=model;
            this.view.render();
            this.languagelist_pageBack();
            window.eventHub.on('singer-languagelist',(languagename)=>{
                $(this.view.el).css("display","block");
                this.model.getlanguagelist(languagename).then(()=>{
                    this.model.getlanguageinfo(languagename).then(()=>{
                        this.view.render();
                        this.languagelist_pageBack();
                        this.view.renderdata(this.model.data.languagePlayList,this.model.data.languageInfo)                     
                    })
                })
            });
        },
        languagelist_pageBack(){
            $(view.el).find('.language-back').click(()=>{
                window.eventHub.emmit('language-back');
                setTimeout(() => {
                    $(this.view.el).css("display","none")              
                }, 500);
            });
        }
    }
    controler.init(view,model);
}