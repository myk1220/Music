{
    let view={
        el : '#uploading',
    }

    let controler={
        init(view){
            this.view = view;
            window.eventHub.on('loading',()=>{
                this.loadingShow();
            });
            window.eventHub.on('loaded',()=>{
                this.loadingOff();
            });
        },
        loadingShow(){
            $(this.view.el).addClass('active');
        },
        loadingOff(){
            $(this.view.el).removeClass('active');
        }
    }
    controler.init(view);
}