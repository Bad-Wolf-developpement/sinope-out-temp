(function() {
    class sinopeOutTemp extends window.Extension{
        constructor(){
            super('sinope-out-temp');
            this.addMenuEntry('Sinope Outside Temperature')
        }
    }


    new sinopeOutTemp();
})();