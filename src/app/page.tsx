"use client";
import { Cinzel } from "next/font/google";
import Image from "next/image";
import { useState, ChangeEvent, FormEvent } from "react";

interface WeatherData{
  temperature :number;
  region :string;
  name:string;
  country:string;
  unit:string;


}

export default function Home() {
  const[location,setLocation]=useState<string>("")
  const[weatherData,setWeatherData]=useState<WeatherData>();

  const fetchData=async()=>{
    
    const city:string=location.trim();
    if(city==""){
      console.log("City not found");
    }
    console.log("cityName : "+city)
    const data=await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.API} &q=${city}`)
    console.log(data);
    if (!data.ok) {
      console.log("City not found");
    }
    else{
      console.log("city found")
    }
    const response=await data.json();
    const t:number=response.location.temp_c
    // {console.log("temperature in celcuis : "+ response.current.temp_c )}
 
    const weatherData:WeatherData={
      temperature:response.current.temp_c,
      region:response.location.region,
      name:response.location.name,
      country:response.location.country,
      unit:"C",

    }
    setWeatherData(weatherData);

  }


  return (
    <div>
    <div className="flex flex-col  h-30 bg-blue-500 rounded-md mx-10 mt-2 items-center  justify-center ">
      <h1 className="font-bold">Weather App</h1>

     <div className="flex flex-row justify-between ">
     <input type="text" placeholder="Enter Location" value={location} onChange={
                (e: ChangeEvent<HTMLInputElement>) =>
                  setLocation(e.target.value) 
              }
              />
     <button className="bg-neutral-100  items-center rounded-md p-1  ml-3" type="button" onClick={fetchData } >Search</button>
     </div>
     
     
     
   
     


      
    </div >
    
<div className="flex flex-row items-center justify-center">

<div className="flex flex-col items-start ">

<p>CityName: </p>
<p>State: </p>
<p>Country: </p>
<p>Temperature: </p>
<p>Unit: </p>

</div>

<div className="flex flex-col items-start">

<p>{weatherData?.name}</p>
<p>{weatherData?.region}</p>
<p>{weatherData?.country}</p>
<p>{weatherData?.temperature}</p>
<p>{weatherData?.unit}</p>



</div>



</div>
 

   
    
</div>
    
  );
}
