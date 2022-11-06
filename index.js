const api_key = "791550d7268c458ae2e3d40881b7f913" ; 

async function getData(){ 

    // console.log(latitude,longitude)

    let city = document.getElementById("cityName").value ; 
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
    // let url = `https://api.openweathermap.org/data/2.5/onecall?lat={latitude}&lon={longitude}&exclude={hourly}&appid=${api_key}`
    try{
        let res = await fetch(url) ; 
        let users = await res.json() ; 
        // append(users.main)
        append(users)
        // liveLocation(users)
        getData2(users)
        // console.log(users)
    }catch(err){
        console.log(err)
    }
}
let getData2 = async (data) => {
    let lat = data.coord.lat ; 
    let lon = data.coord.lon ; 
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={hourly}&appid=${api_key}` ; 
    try{
        let res = await fetch(url) ; 
        let users = await res.json() ; 
        // append(users.main)
        // append(users)
        // liveLocation(users)
        // getData2(users) ; 
        // console.log(users)
        append2(users.daily) ; 
        // console.log(users)
    }catch(err){
        console.log(err)
    }
}

function append(data){
    // data.forEach(function (el,i){

        // console.log(data)
        let div = document.getElementById("container") ; 
        div.innerHTML = null ;

        // let h2 = document.createElement("h2") ; 
        // // h2.innerText =
        // console.log(data) ; 
        let h3 = document.createElement("h2") ; 
        h3.innerText = data.name ; 
        // console.log(h3) ; 
        // console.log(data.weather[0].main)
        let temp_P = document.createElement("p") ;
        temp_P.innerText = "Temprature - "+Math.floor(data.main.temp-273)+"° C" ; 
        // let humidity = 
        // if (temp)
        // if()
       
        let weather = document.createElement("p") ;
        // weather.innerText = data.weather[0].main ;
        if(data.weather[0].main=="Haze"){
            weather.innerHTML = data.weather[0].main+" " +`<span class="material-symbols-outlined">cloudy_snowing</span>` ;
        }
        else if(data.weather[0].main=="Clear"){
            weather.innerHTML =  data.weather[0].main+" "+" " +`<span class="material-symbols-outlined">sunny</span>` ; 
            // style.weather.color = "blue"
        }
        else if(data.weather[0].main==="Rain"){
            weather.innerHTML =  data.weather[0].main + " " +`<span class="material-symbols-sharp">rainy</span>` ; 
        }
        else if(data.weather[0].main==="Clouds"){
            weather.innerHTML =  data.weather[0].main + " " +`<span class="material-symbols-sharp">cloudy</span>` ; 
        }



        


        let temp_Min = document.createElement("p") ; 
        temp_Min.innerText = "Min. Temprature - "+Math.floor(data.main.temp_min-273)+"° C" ; 
        let temp_Max = document.createElement("p") ;
        temp_Max.innerText = "Max. Temprature - "+Math.floor(data.main.temp_max-273)+"° C" ; 
        let pressure = document.createElement("p") ; 
        pressure.innerText = "Pressure - "+data.main.pressure ; 
        // let
        div.append(h3,weather,temp_P,temp_Min,temp_Max,pressure)
        let iframe = document.querySelector("iframe") ; 
        iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

        // let map =  `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed` ; 
        // console.log(map)
        let laltitude = data.coord.lat ; 
        let longitude = data.coord.lon ; 

        // getData(laltitude,longitude)


        // console.log(data.coord.lat)
        // console.log(data.coord.lon)

    // })
    
}

let append2 = (data) =>{
    // console.log(data)
    let weeklyDiv = document.getElementById("weeklyDiv")
    weeklyDiv.innerHTML = null ; 
   data.forEach(function(el,i){
        //    console.log(data) ; 
    console.log(data)
        let day = new Date(el.dt*1000).toLocaleString("en-US",{weekday:"short"}) ;
        // console.log(date) ; 
        let div = document.createElement("div") ; 
        div.setAttribute("id","dayDiv") ; 
        let dayName = document.createElement("h3") ; 
        dayName.innerText = day ; 
        console.log(el.weather[0].main) ; 
        let icon = document.createElement("object") ; 
        if(el.weather[0].main=="Rain"){
            icon.data = "rainy-6.svg"
        }
        else if(el.weather[0].main=="Clouds"){
            icon.data = "cloudy-day-3.svg"
        }
        else if(el.weather[0].main=="Clear"){
            icon.data = "day.svg" ; 
        }
        else if(el.weather[0].main=="Snow"){
            icon.data = "snowy-6.svg" ; 
        }
        let min = document.createElement("p") ; 
        min.innerText = Math.floor(el.temp.min-273)+"° C"
        let max = document.createElement("p") ; 
        max.innerText = Math.floor(el.temp.max-273)+"° C"
        // console.log(Math.floor(el.temp.min-273)) ; 
        div.append(dayName , icon , min , max) ; 
        weeklyDiv.append(div)

   
   })
   

    





}





 // console.log(new Date(data.daily[0].dt*1000)) ; 
    // let date = new Date(data.daily[0].dt*1000) ; 
    // console.log(date.toLocaleString("en-US",{weekday:"short"})) ; 
