(function() {
    console.log("extension.js loaded");
    class sinopeOutTemp extends window.Extension {
        constructor(){
            console.log("extension.js class created");
            super('sinope-out-temp');
            this.addMenuEntry('Sinope');

			this.sinope_thermostats = [];
            
            this.content = '';
			fetch(`/extensions/${this.id}/views/content.html`)
			.then((res) => res.text())
			.then((text) => {
				this.content = text;
				if( document.location.href.endsWith("sinope-out-temp") ){
					this.show();
				}
			})
			.catch((e) => console.error('Failed to fetch content:', e));
        }

        show(){
            
    		if(this.content == ''){
    			return;
    		}
    		else{
    			this.view.innerHTML = this.content;
    		}
			API.getThings().then((things)=>{
				content = ""
				for (let key in things){
					for (let property in things[key])
					content = content + things[key][property] + '\r\n';
				}
				document.write(content);
				/*document.getElementById("extension-sinope-out-temp-test").innerHTML = content + '\r\n';*/
				
			})
            /*
			window.API.postJson(
				`/extensions/${this.id}]/api/init`,
				{'action':'init' }
			).then((body) => { 
				console.log("init response: ");
				console.log(body);
                
				if( body['state'] != true ){
					console.log("response was OK");
				}
                else{
                    console.log("response was not OK");
                }

			}).catch((e) => {
				alert("connection error");
			});*/
            
        }
    }
    
    new sinopeOutTemp();
})();