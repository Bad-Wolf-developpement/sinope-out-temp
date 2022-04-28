(function() {
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
        }
    }


    new sinopeOutTemp();
})();