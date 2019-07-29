{
    let view={
        el : 'main > .content',
        template : `
            <form class="songinfo">
                <h2>新建歌曲</h2>
                <div class="row"><label>歌名<input id="songName" type="text"></label></div> 
                <div class="row"><label>歌手<input id="singer" type="text"></label></div> 
                <div class="row"><label>外链<input id="songLink" type="text"></label></div> 
                <div class="row"><input id="save" type="button" value="保存"></div> 
            </form>
        `,
        render(data){
            $(this.el).html(this.template);
            $(this.el).find('#songName').val(data.name);
            $(this.el).find('#singer').val(data.singer);
            $(this.el).find('#songLink').val(data.link);
        } 
    }

    let model={
        data:{
            name:'',singer:'',link:'',id:''
        },
        creat(data){
            // 声明 class
            var Music = AV.Object.extend('Music');

            // 构建对象
            var music = new Music();

            // 为属性赋值
            music.set('name', data.name);
            music.set('singer', data.singer);
            music.set('link',data.link);

            // 将对象保存到云端
            music.save().then(function (newMusic) {
            // 成功保存之后，执行其他逻辑
            model.data.id=newMusic.id;
            model.data.name=newMusic.attributes.name;
            model.data.link=newMusic.attributes.link;
            model.data.singer=newMusic.attributes.singer;
            }, function (error) {
            // 异常处理
            console.error(error);
            });
        },
        updata(){
            let song = AV.Object.createWithoutData('Music', model.data.id);
            song.set('name', model.data.name);
            song.set('singer', model.data.singer);
            song.set('link', model.data.link);
            song.save();
        }
    }

    let controler={
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            window.eventHub.on('upload',(data)=>{            
                this.model.data=data;
                this.view.render(this.model.data);
                $(this.view.el).find('h2').html('新建歌曲');
                this.eventListener();
            });
            window.eventHub.on('newSongClick',(data)=>{
                this.model.data=data;
                this.view.render(this.model.data);
                $(this.view.el).find('h2').html('新建歌曲');
                this.eventListener();
            });
            window.eventHub.on('songchosen',(data)=>{
                this.model.data=data;
                this.view.render(this.model.data);
                $(this.view.el).find('h2').html('编辑歌曲');
                this.eventListener();
            });
            this.eventListener();
        },

        eventListener(){
            this.view = view;
            this.model = model;
            let singer = $(this.view.el).find('#singer');
            let songLink = $(this.view.el).find('#songLink');
            let songName = $(this.view.el).find('#songName');
            $(this.view.el).find('#save').click(function(){
                    model.data.name=songName.val();
                    model.data.singer=singer.val();
                    model.data.link=songLink.val();
                if(model.data.id != ''){
                    model.updata();
                    window.eventHub.emmit('changeSong',model.data);
                }else{
                    model.data.id='';
                    model.creat(model.data);
                    window.eventHub.emmit('saveSong',model.data);
                    singer.val('');
                    songLink.val('');
                    songName.val('');
                }
                
            })
        }

    }

    controler.init(view,model);
}
