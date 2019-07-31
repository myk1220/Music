{
    let view={
        el:'.signIn-page',
        template:`
        <div class="signIn-bg signIn-bg-blur"></div>
        <div class="signIn-wrap">
            <div class="signIn-head">
                <a class="signIn-back" href="#">back</a>
                <p>Sign In</p>
                <a class="signIn-skip" href="#">skip</a>
            </div>
            <div class="signIn-content">
                <div class="signIn-icon"><img src="img/music-icon.png" alt="图片加载失败"></div> 
                <p class="signIn-icon-bottom">Musical</p>
                <div class="signIn-form">
                    <div><input class="username" id="signIn-username" type="text"></div>
                    <div><input class="password" id="signIn-password" type="password"></div>
                    <div><input class="submit" id="signIn-submit" type="button"  value="sign In"></div>
                    <div><a class="forgetPwd" href="#">Forget Your Password?</a></div>
                </div>
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
            window.eventHub.on('welcome-skip',()=>{
                this.pageShow();
            })
        },

        pageOff(){
            $(view.el).find('.signIn-skip').click(()=>{
                $(view.el).slideUp();
                window.eventHub.emmit('signIn-skip');
            });
            $(view.el).find('.signIn-back').click(()=>{
                $(view.el).slideUp();
                window.eventHub.emmit('signIn-back');
            });
        },
        pageShow(){
            $(view.el).slideDown();
        }
    }
    
    controler.init(view,model);
}