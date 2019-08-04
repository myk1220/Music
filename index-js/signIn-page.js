{
    let view={
        el:'.signIn-page',
        template:`
        <div class="signIn-bg signIn-bg-blur"></div>
        <div class="signIn-wrap">
            <div class="signIn-head">
                <a class="signIn-back" href="#">back</a>
                <p>Sign In</p>
                <a class="signIn-skip" href="index-page.html">Visitor</a>
            </div>
            <div class="signIn-content">
                <div class="signIn-icon"><img src="img/music-icon.png" alt="图片加载失败"></div> 
                <p class="signIn-icon-bottom">Musical</p>
                <div class="signIn-form">
                    <div><input class="input" id="signIn-username" type="text" placeholder="Username"></div>
                    <div><input class="input" id="signIn-password" type="password" placeholder="Password"></div>
                    <div><input class="input" id="signIn-submit" type="button"  value="sign In"></div>
                    <div><a id="CreatAccount" href="#">Creat a New Account</a></div>
                </div>
            </div>
        </div>    
        `,
        template_up:`
            <div class="signUp-bg signUp-bg-blur"></div>
            <div class="signUp-wrap">
                <div class="signUp-head">
                    <a class="signUp-back" id="signUp-back" href="#">Back</a>
                    <p>Sign Up</p>
                </div>
                <div class="signUp-content">
                    <p class="signUp-icon-bottom">Account Registration</p>
                    <div class="signUp-form">
                        <div><input class="input" id="signUp-username" type="text" placeholder="Username"></div>
                        <div><input class="input" id="signUp-email" type="text" placeholder="Email Adress"></div>
                        <div><input class="input" id="signUp-password" type="password" placeholder="Password"></div>
                        <div><input class="submit" id="signUp-submit" type="button"  value="sign Up"></div>
                        <div class="signUp-icon"><img src="img/music-icon.png" alt="图片加载失败"></div> 
                        <div class="declare">
                            <p>By signing up,you agree to the<p>
                            <p>Terms Of Service<p>
                            <p style="color: white;margin:0 0.01rem 0 0.03rem">&</p>
                            <p>Privacy Police</p>
                        </div>
                    </div>
                </div>
            </div>              
        `,
        render(data,content){
            $(this.el).html(content)
        }
    }

    let model={
        data:{
            userinfo:[],
            newUserInfo:{
                username:'',
                password:'',
                emailAdress:''
            }
        },
        signIndata(){
            var query = new AV.Query('userInfo');
            return query.find().then((userinfo)=>{
                this.data.userinfo=userinfo.map((info)=>{
                    return {id:info.id, ...info.attributes}
                });
                return userinfo;
            });
        },

    }

    let controler={
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.render(model.data,view.template);
            this.signIn_pageOff();
            this.signIn_submit();
            this.model.signIndata();
            this.creatAccount();
            window.eventHub.on('checkCookie',()=>{
            this.userCookie();
            })
        },

        userCookie(){
            if(this.getCookie()['username']!=undefined){
                window.location.href = "index-page.html";    
            }
        },

        signIn_pageOff(){
            $(view.el).find('.signIn-skip').click(()=>{
                window.location.href = "index-page.html";        
            });
            $(view.el).find('.signIn-back').click(()=>{
                window.eventHub.emmit('signIn-back');
            });
        },

        signIn_submit(){
            $(view.el).find('#signIn-submit').click(()=>{
                let input_username=$(view.el).find('#signIn-username').val();
                let input_password=$(view.el).find('#signIn-password').val();
                let signIn_flag=0;
                for(let i=0;i<model.data.userinfo.length;i++){
                    if(input_username===model.data.userinfo[i].username&&input_password===model.data.userinfo[i].password){
                            this.setCookie('username',input_username);
                            signIn_flag=1;
                            window.location.href = "index-page.html";
                            break;
                    }
                }
                if(signIn_flag===0){alert('用户名或密码不正确');}
            })
        },

        creatAccount(){
            $(view.el).find('#CreatAccount').click(()=>{
                view.render(model.data,view.template_up);
                this.signUp_pageoff();
                this.signUp_submit();
            }) 
        },

        signUp_pageoff(){
            $(view.el).find('#signUp-back').click(()=>{
                view.render(model.data,view.template);
                this.signIn_pageOff();
                this.signIn_submit();
                this.model.signIndata();
                this.creatAccount();
            }) 
        },
        pageOff(){
            view.render(model.data,view.template);
            this.signIn_pageOff();
            this.signIn_submit();
            this.model.signIndata();
            this.creatAccount();            
        },
        signUp_submit(){
            $(view.el).find('#signUp-submit').click(()=>{
                model.signIndata();
                model.data.newUserInfo.username = $(view.el).find('#signUp-username').val();
                model.data.newUserInfo.emailAdress = $(view.el).find('#signUp-email').val();
                model.data.newUserInfo.password = $(view.el).find('#signUp-password').val();            
                if(model.data.userinfo.filter((item)=>{return item.username === model.data.newUserInfo.username}).length === 0){
                    model.creatdata(model.data);
                }else{
                    console.log('用户名已存在');
                };
            })
        },
        
        setCookie(name,value){ 
            var exp = new Date(); 
            exp.setTime(exp.getTime() +24*60*60*1000); 
            document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
        },

        getCookie(){
            var cookie=document.cookie;
            var cookieArr=cookie.split(';');
            var finalObj={};
            for(var i=0;i<cookieArr.length;i++){
                var tempArr=cookieArr[i].trim().split('=');
                finalObj[tempArr[0]]=tempArr[1];
            }
            return finalObj;
        },

        delCookie(name){ 
            var exp = new Date(); 
            exp.setTime(exp.getTime() - 10000); 
            var cval=controller.getCookie()['username'];
            if(cval!=null) 
                document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
        },

    }
    
    controler.init(view,model);
}