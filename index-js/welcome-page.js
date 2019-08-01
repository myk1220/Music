{
    let view={
        el:'.welcome-page',
        template:`
        <div class="welcome-bg welcome-bg-blur"></div>
        <div class="welcome-wrap">
            <div class="welcome-head">
                <p>Walkthrough</p>
                <a id="welcome-skip">skip</a>
            </div>
            <div class="welcome-content">
                <div class="welcome-icon"><img src="img/music-icon.png" alt="图片加载失败"></div>
                <p class="welcome-icon-bottom">Musical</p>
                <p class="welcome-text">Welcome</p>
                <p class="welcome-text-bottom">Nice to meet you </br> in the world of music</p>
            </div>
        </div>    
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }

    let model={}

    let controler={
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.render();
            this.pageOff();
            window.eventHub.on('signIn-back',()=>{
                this.pageShow();
            });
        },

        pageOff(){
            $(view.el).find('#welcome-skip').click(()=>{
                $(view.el).animate({'left':'-'+$(document).width()+'px'},500,()=>{
                    $(view.el).hide()
                })
            })
        },

        pageShow(){
            $(view.el).show().animate({'left':0},500)
        }
    }
    
    controler.init(view,model);
}