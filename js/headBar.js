{
    let view={
        el : 'body > .header',
        template : `
            <a href="#" class="xiami_icon"></a>
            <a href="#" class="xiami_download"></a>
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
            
        }


    }

    controler.init(view,model);
}
