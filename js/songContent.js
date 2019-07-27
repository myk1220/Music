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
            music.set('name', data.songName);
            music.set('singer', data.singer);
            music.set('link',data.songLink);

            // 将对象保存到云端
            music.save().then(function (newMusic) {
            // 成功保存之后，执行其他逻辑
            console.log('保存成功。objectId：' + newMusic.id);
            }, function (error) {
            // 异常处理
            console.error(error);
            });
        }
    }

    let controler={
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            window.eventHub.on('upload',(data)=>{
                $(this.view.el).find('#songName').val(data.key);
                $(this.view.el).find('#songLink').val(data.link);
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
                let data={
                    'songName':songName.val(),
                    'songLink':songLink.val(),
                    'singer':singer.val(),
                }
                model.creat(data);
                window.eventHub.emmit('saveSong',data);
                singer.val('');
                songLink.val('');
                songName.val('');
            })
        }

    }

    controler.init(view,model);
}
