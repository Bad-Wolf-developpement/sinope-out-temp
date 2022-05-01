(function() {
    console.log("extension.js loaded");
    class sinopeOutTemp extends window.Extension {
        constructor(){
			function get_sinope_thermostat();
			function get_temp_property();
            console.log("extension.js class created");
            super('sinope-out-temp');
            this.addMenuEntry('Sinope');
			
			this.sinopeMacOUI = "500b914"

			this.sinope_thermostats = get_sinope_thermostat();
			console.log(this.sinope_thermostats)
			this.temperature_property = get_temp_property();
            
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
            let testDiv = 'extension-sinope-out-temp-test'
    		if(this.content == ''){
    			return;
    		}
    		else{
    			this.view.innerHTML = this.content;
    		}
			document.getElementById(testDiv).innerHTML =  this.sinope_thermostats// + '\r\n' + this.temperature_property
			
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

		get_sinope_thermostat(){
			console.log('get sinope thermostats')
			let sinope_theromstats = []
			API.getThings().then((things)=>{
				
				for (let key in things){
					if ((things[key]['@type'] == "Thermostat") && (things[key]['id']
					.indexOf(this.sinopeMacOUI) >= 0)){
						if (!sinope_theromstats.includes(things[key]['id'])){
							//console.log('thermostats id: ' + things[key]['id'])
							sinope_theromstats.push(things[key]['id']);
						}
					}
				}
				//console.log('sinope thermostats: '+ sinope_theromstats)
				
			})
			return sinope_theromstats;
			
		}

		get_temp_property(){
			let tempProperty = []
			API.getThings().then((things)=> {
				for (let thing in things){
					let thingID = things[thing]['id']
					for (let property in things[thing]['properties']){
							let propertyID = things[thing]['properties'][property]['id']
							if (things[thing]['properties'][property]['@type'] == "TemperatureProperty"){
								if (!tempProperty.includes([thingID, propertyID])){
									tempProperty.push([thingID, propertyID]);
								}
							}
					}
				}
				return tempProperty;
			})
		}
    }
    
    new sinopeOutTemp();
})();