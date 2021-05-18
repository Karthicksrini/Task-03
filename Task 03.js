// XML HTTP request
// create an xml http instance(object)
var request= new XMLHttpRequest();
//initate a new connection
//http methods consist of get, put,  
request.open('GET','https://restcountries.eu/rest/v2/all',true);
//sending the request to server
request.send();
//if server responded successfully, we need to retrive the data
request.onload=function(){
    var data=JSON.parse(this.response)
//loop it for 250 times bcz of data is 250 countries
    
    for(var i in data){
        try{
        var name = data[i].name;
        var lang= data[i].latlng;
        if(lang.length===0)throw new Error("Longitude not found")
        weatherdata(name,...lang);
        
    }catch(x){
        console.log("some coordinates are invalid "+name+""+x.message)
    }
}
}

var weatherdata=function(name,lat,lang){
    //console.log(name+" "+lat+" "+lang)
    var request= new XMLHttpRequest();
    var url='https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lang+'&appid=5fd8a9fe7594c6b8bb9b269ed1e76220';
    request.open('GET',url,true);
    request.send();
    request.onload=function(){
        try{
        var data= JSON.parse(this.response);
        console.log(`${name}:${data.main.temp}`);
        }catch(e){
            console.log('Undefined response'+name);

        }
    }
}

