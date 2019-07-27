{
    let view={
        el : 'main > .slide > .newSong-wrap',
        template : `
        <div class="active newSong">新建歌曲</div>
        `,
        render(data){
            $(this.el).html(this.template);
        } 
    }

    let model={}

    let controler={
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            window.eventHub.on('upload',(data)=>{
                $(this.view.el).addClass('active');
            })
        }


    }

    controler.init(view,model);
}