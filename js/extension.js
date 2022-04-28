(function() {
    console.log("extension.js loaded")
    class sinopeOutTemp extends window.Extension{
        constructor(){
            super('sinope-out-temp');
            this.addMenuEntry('Sinope Outside Temperature');
            
            if(!window.Extension.prototype.hasOWnProperty('load')){
                this.load();
            }
        }

        load(){
            this.content = '';
            return fetch(`/extensions/${this.id}/views/content.html`)
            .then((res)=> res.text())
            .then((text) =>{
                this.content = text;
            })
            .catch((e) => console.error('Failed to fetch content:', e))
        }

        show(){
            this.view.innerHTML = this.content;
        }
    }

    
    new sinopeOutTemp();
})();