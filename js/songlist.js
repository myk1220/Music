{
    let view={
        el : 'main > .slide > .songlist',
        template : `
            <ul>
            </ul>
        `,
        render(data){          
            $(this.el).html(this.template);
            let {songs,selectedSongId}=data;
            let liList=[];
            for(let i=0;i<songs.length;i++){                
                if(songs[i].id===selectedSongId){
                    liList.push( $('<li class="active"></li>').text(songs[i].name));
                }else{
                    liList.push( $('<li></li>').text(songs[i].name));
                }
            }
            $(this.el+">ul").empty();
            liList.map((domLi)=>{
                $(this.el+">ul").append(domLi);
            })
        } 
    }

    let model={
        data:{
            songs:[],
            selectedSongId:undefined,
        },
        getSong(){
            var query = new AV.Query('Music');
            return query.find().then((songs)=>{
                this.data.songs=songs.map((song)=>{
                    return {id:song.id, ...song.attributes}
                });
                return songs;
            });
        }
    }

    let controler={
        init(view,model){
            this.view = view;
            this.model = model;
            this.model.getSong().then(()=>{
                this.view.render(this.model.data);
            });
            this.view.render(this.model.data);
            window.eventHub.on('upload',()=>{
                $(this.view.el).find('.active').removeClass('active');
            });
            window.eventHub.on('newSongClick',()=>{
                $(this.view.el).find('.active').removeClass('active');
            });
            window.eventHub.on('saveSong',(data)=>{
                this.model.data.songs.push(data);
                this.view.render(this.model.data);
            });
            window.eventHub.on('changeSong',(data)=>{
                this.model.getSong();
                this.view.render(this.model.data);

            })
            this.eventListener();
        },
        eventListener(){
            this.view = view;
            this.model = model;
            $(this.view.el).on('click','li',(e)=>{
                for(let i=0;i<model.data.songs.length;i++){
                    if(e.currentTarget.innerHTML===model.data.songs[i].name){
                    model.data.selectedSongId = model.data.songs[i].id;
                    view.render(model.data);
                    }
                }
                let chosenSong={};
                for(let i=0;i<this.model.data.songs.length;i++){
                    if(this.model.data.songs[i].name===e.currentTarget.innerHTML){
                        chosenSong=this.model.data.songs[i];
                        break;
                    }
                }
                window.eventHub.emmit('songchosen',chosenSong);
            })
        }


    }

    controler.init(view,model);
}