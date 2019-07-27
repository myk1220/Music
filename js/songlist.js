{
    let view={
        el : 'main > .slide > .songlist',
        template : `
            <ul>
            </ul>
        `,
        render(data){          
            $(this.el).html(this.template);
            let liArr=data.join(" ");
            $(this.el+">ul").append(liArr);
        } 
    }

    let model={
        data:[],
    }

    let controler={
        init(view,model){
            this.view = view;
            this.model = model;
            this.view.render(this.model.data);
            window.eventHub.on('upload',(data)=>{
                console.log('songlist得到的数据');
                console.log(data);
            });
            window.eventHub.on('saveSong',(data)=>{
                console.log(data);
                let li='<li>'+data.songName+'</li>';
                this.model.data.push(li);
                this.view.render(this.model.data);
            })
            this.eventListener();
        },
        eventListener(){
            this.view = view;
            this.model = model;
            $(this.view.el).on('click','li',(e)=>{
                for(let i=0;i<e.currentTarget.parentNode.children.length;i++){
                    e.currentTarget.parentNode.children[i].classList.remove("active");
                }      
                e.currentTarget.classList.add("active");
                
            })
        }


    }

    controler.init(view,model);
}