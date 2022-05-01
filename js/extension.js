(function() {
    console.log("extension.js loaded");
    class sinopeOutTemp extends window.Extension {
        constructor(){
            console.log("extension.js class created");
            super('sinope-out-temp');
            this.addMenuEntry('Sinope');
			
			this.sinopeMacOUI = "500b914"
		
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

        show = async () => {
			this.sinope_thermostats = await this.get_sinope_thermostat();
			this.temperature_property = await this.get_temp_property();
            let testDiv = 'extension-sinope-out-temp-test';
			
    		if(this.content == ''){
    			return;
    		}
    		else{
    			this.view.innerHTML = this.content;
    		}

			console.log(this.sinope_thermostats.length);
			if(this.sinope_thermostats.length < 1){
				document.getElementById('extension-sinope-out-temp-warning')
				.innerHTML = 'No sinope Thermostat found. Did you have any on the gateway?'
				return;
			}
			
			if(this.temperature_property.length < 1){
				document.getElementById('extension-sinope-out-temp-warning')
				.innerHTML = 'No Temperature Property found on other devices.'
			}
			document.getElementById(testDiv)
			.innerHTML = 'TEST'
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

		async get_sinope_thermostat(){
			console.log('get sinope thermostats')
			let sinopeTheromstats = []
			API.getThings().then((things)=>{
				
				for (let key in things){
					if ((things[key]['@type'] == "Thermostat") && (things[key]['id']
					.indexOf(this.sinopeMacOUI) >= 0)){
						if (!sinopeTheromstats.includes(things[key]['id'])){
							//console.log('thermostats id: ' + things[key]['id'])
							sinopeTheromstats.push(things[key]['id']);
						}
					}
				}
				//console.log('sinope thermostats: '+ sinope_theromstats)
				
			})
			return sinopeTheromstats;
		};

		async get_temp_property(){
			let tempProperty = []
			API.getThings().then((things)=> {
				for (let thing in things){
					let thingID = things[thing]['id']
					for (let property in things[thing]['properties']){
							let propertyTitle = things[thing]['properties'][property]['title']
							if (things[thing]['properties'][property]['@type'] == "TemperatureProperty"){
								if (!tempProperty.includes([thingID, propertyTitle])){
									if (thingID.indexOf(this.sinopeMacOUI) < 0){
										tempProperty.push([thingID, propertyTitle]);
									}
								}
							}
					}
				}	
			})
			return tempProperty;
		};
    }
    
    new sinopeOutTemp();
})();