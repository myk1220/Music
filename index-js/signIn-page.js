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
                    <div><a class="CreatAccount" href="#">Creat a New Account</a></div>
                </div>
            </div>
        </div>    
        `,
        render(data){
            $(this.el).html(this.template)
        }
    }

    let model={
        data:{
            userinfo:[]
        },
        signIndata(){
            var query = new AV.Query('userInfo');
            return query.find().then((userinfo)=>{
                this.data.userinfo=userinfo.map((info)=>{
                    return {id:info.id, ...info.attributes}
                });
                return userinfo;
            });
        }
    }

    let controler={
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.render();
            this.pageOff();
            this.signIn();
            this.model.signIndata();
        },

        pageOff(){
            $(view.el).find('.signIn-skip').click(()=>{
            
            });
            $(view.el).find('.signIn-back').click(()=>{
                window.eventHub.emmit('signIn-back');
            });
        },
        pageShow(){
           
        },
        signIn(){
            $(view.el).find('#signIn-submit').click(()=>{
                let input_username=$(view.el).find('.username').val();
                let input_password=$(view.el).find('#signIn-password').val();
                for(let i=0;i<model.data.userinfo.length;i++){
                    if(input_username===model.data.userinfo[i].username&&input_password===model.data.userinfo[i].password){
                        console.log('登录成功');
                        break;
                    }
                }
            })
        }
    }
    
    controler.init(view,model);
}