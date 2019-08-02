window.eventHub = {
    events:{},
    //发布
    emmit(eventname,data){
        for(let key in this.events){
            if(key === eventname){
                this.events[key].map((fn)=>{
                    fn.call(undefined,data);
                })
            }
        }
    },
    //订阅
    on(eventname,fn){
        if(this.events[eventname]===undefined){
            this.events[eventname]=[fn];        
        }else{
            for(let key in this.events){
                if(key===eventname){
                    this.events[key].push(fn);
                }
            }
        }
        
    },
}