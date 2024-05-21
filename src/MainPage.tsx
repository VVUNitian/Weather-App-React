import React, { useEffect, useState } from 'react'
import weatherData from "./Constdata";
import { WiCloudyGusts } from "react-icons/wi";
import { WiThermometerExterior } from "react-icons/wi";
import { WiThermometer } from "react-icons/wi";
import { WiRain } from "react-icons/wi";
import { WiCloudy } from "react-icons/wi";
import { WiHumidity } from "react-icons/wi";
import { WiDaySunny } from "react-icons/wi";
import { WiNightAltSnow } from "react-icons/wi";

const MainPage = () => {
    const [weather,setweather]=useState(weatherData);
    const [units,setunits]=useState("°C");
    const [city,setcity]=useState("Bhubaneswar"); 
    const [weatherbg,setweatherbg]=useState("./src/assets/hotsummer.jpg");
   
    useEffect(()=>{
        weatherdata(city,"imperial");
    },[]);

    useEffect(()=>{
        const threshold=units === 'imperial'? 20 : 80;
        console.log(`${threshold} and ${units}`);
        weather.humidity>80 ? 
            setweatherbg("./src/assets/Rainyday.jpg"):weather.temp < threshold ? setweatherbg("./src/assets/coldwinter.jpg"):
        setweatherbg("./src/assets/hotsummer.jpg");
      },[weather.humidity,weather.temp]);

     let Url="https://api.openweathermap.org/data/2.5/weather";
     let Apikey="a8cba1fe33e4d80a7b626c3713ffe026";
     let handlechange=(e: { target: { value: React.SetStateAction<string>; }; })=>{
        setcity(e.target.value);
        }

     let handleclick=(evt)=>{
        evt.preventDefault();
        weatherdata(city,"metric");
     }

     const unitconverison = (e) =>{
        e.preventDefault();
        if(e.target.innerText.slice(1)==="C"){
            setunits("°F");
            weatherdata(city,"metric");
            e.target.innerText=units;
        }
        else
           { setunits("°C");
             weatherdata(city,"imperial");
            e.target.innerText=units;}
     }

     let weatherdata= async (city,unit) => {
              let response= await fetch(`${Url}?q=${city}&appid=${Apikey}&units=${unit}`);
              let jsonresponse= await response.json();
              let result=
               {
                feels_like:jsonresponse.main.feels_like,
                humidity:jsonresponse.main.humidity,
                temp:jsonresponse.main.temp,
                pressure:jsonresponse.main.pressure,
                temp_max:jsonresponse.main.temp_max,
                temp_min:jsonresponse.main.temp_min,
                windspeed:jsonresponse.wind.speed,
                city:jsonresponse.name,
                description:jsonresponse.weather[0].description,
                main:jsonresponse.weather[0].main
               }
              setweather(result); 
          }

    let time=new Date().toLocaleTimeString();
    let date1=new Date().toLocaleDateString();
    const [ctime,setctime]=useState(time);
    const [date,setdate]=useState(date1);
        setInterval(() => {
            let currtime=new Date();
            setctime(currtime.toLocaleTimeString());
            setdate(currtime.toLocaleDateString());
        }, 1000);

  return (
    <div className='Container h-screen flex text-slate-50 lg:flex-row flex-col' style={{backgroundImage : `url(${weatherbg})`,backgroundSize:"cover" ,backgroundPosition:"center"}}>
        <div className='Left side component w-full h-2/5 lg:w-3/5 lg:h-full'>
            <h1 className=' Creator pl-6 pt-4 opacity-50 font-semibold xs:text-2xl md:text-4xl lg:text:4xl'>.Vibhuu</h1>
            <div className='flex items-center w-fit h-fit relative mx-auto top-[6rem] rounded-md bg-slate-950/50 lg:top-[23rem] xl:top-[25rem] 2xl:top-[27rem] 2xl:ml-32
            lg:bg-slate-950/0'>
                <span className='Temperature text-5xl p-3 pt-0 pr-1 sm:text-[3rem] md:text-[4rem] 2xl:text-[6rem]'>{Math.floor(weather.temp)}&deg;</span>
                <div className='mr-2'>
                    <h1 className='Cityname text-2xl sm:text-[2rem] md:text-[2.7rem] md:mb-3 md:pt-2'>{weather.city}</h1>
                    <span className='times text-xs sm:text-lg'>{ctime},</span>
                    <span className='dates text-xs sm:text-lg'>{date.slice(0,4)}</span>
                </div>
                <span className='Weathericon text-4xl sm:text-[3rem] 2xl:text-[4rem]'>{ weather.humidity>80 ? <WiCloudy/> :weather.temp < (units === 'metric'? 20 : 80) ?
                 <WiNightAltSnow/>:<WiDaySunny/>}</span>
            </div>
        </div>
        <div className='Right side component bg-slate-950/50 h-3/5 lg:h-full xs:border-t-2 lg:border-l-4 lg:w-2/5 w-full
         overflow-y-scroll'>
        <div className="inputinfo flex absolute top-4 left-[46%] sm:left-[70%] lg:left-[60%] 2xl:mt-6 2xl:ml-7">
        <form onSubmit={handleclick}>
            <input type="text" id='city' placeholder='Search...' className=' bg-slate-900/60 border-b-2 w-28 mr-2 lg:w-80 lg:ml-6 lg:bg-transparent 2xl:w-96
             2xl:bg-slate-950 2xl:ml-9' value={city} onChange={handlechange} />
        </form>
        <button className=' bg-slate-200/70 text-black rounded-md text-xl font-bold px-4 2xl:ml-6 2xl:bg-slate-200 2xl:px-8 2xl:text-2xl ' id='btnchange' onClick={(e) => unitconverison(e)}>{units}</button>
        </div>
            <h1 className=' text-lg ml-[35%] mt-3 sm:ml-[40%] sm:mt-5 sm:text-2xl lg:ml-6 lg:mt-16 2xl:ml-14 2xl:mt-28 xs:ml-[43%] md:ml-[45%]'>Weather Details</h1>
            <h1 className=' text-lg ml-[45%] mt-4 sm:ml-[47%] sm:mt-9 sm:text-2xl lg:ml-6 lg:mt-18 2xl:mt-10 2xl:ml-14 md:ml-[48%]'>{weather.description.toUpperCase()}</h1>
            <div className="datadisplay text-md mt-6 ml-5 xs:ml-[20%] sm:ml-[35%] lg:ml-6 2xl:text-xl">
                    <div className='feelslike flex mb-3 2xl:w-96 2xl:ml-8 2xl:mb-5'>
                        <span>Feels_Like</span>
                            <span className='ml-[10.3rem] lg:ml-[15rem] 2xl:ml-72'>{Math.floor(weather.feels_like)}&deg;</span><span className='text-xl ml-1 2xl:text-2xl
                             2xl:ml-2'><WiThermometer /></span>
                    </div>
                    <div className='feelslike flex mb-3 2xl:w-96 2xl:ml-8 2xl:mb-5'>
                        <span>Humidity</span>
                        <span  className='ml-[10.3rem] lg:ml-[15rem]  2xl:ml-72'>{weather.humidity}%</span><span className='text-xl ml-1 2xl:text-2xl
                             2xl:ml-2'><WiHumidity /></span>
                    </div>
                    <div className='feelslike flex mb-3 2xl:w-96 2xl:ml-8 2xl:mb-5'>
                        <span>Pressure</span>
                        <span  className='ml-[9rem] lg:ml-[14rem]  2xl:ml-[17.5rem]'>{weather.pressure}hPa</span><span className='text-xl ml-1 2xl:text-2xl
                             2xl:ml-2'><WiRain /></span>
                    </div>
                    <div className='feelslike flex mb-3 2xl:w-96 2xl:ml-8 2xl:mb-5'>
                        <span>Temp_max</span>
                        <span  className='ml-[10.3rem] lg:ml-[15rem]  2xl:ml-72'>{Math.floor(weather.temp_max)}&deg;</span><span className='text-xl ml-1 2xl:text-2xl
                             2xl:ml-2'><WiThermometer /></span>
                    </div>
                    <div className='feelslike flex mb-3 2xl:w-96 2xl:ml-8 2xl:mb-5'>
                        <span>Temp_min</span>
                        <span  className='ml-[10.3rem] lg:ml-[15rem]  2xl:ml-72'>{Math.floor(weather.temp_min)}&deg;</span><span className='text-xl ml-1 2xl:text-2xl
                             2xl:ml-2'><WiThermometerExterior/></span>
                    </div>
                    <div className='feelslike flex border-b-2 w-fit pb-8 2xl:pb-16 2xl:ml-8 2xl:mb-5'>
                        <span>Windspeed</span>
                        <span className='ml-[7.5rem] lg:ml-[12rem] 2xl:ml-[15.8rem]'>{weather.windspeed}km/h</span><span className='text-xl ml-1 2xl:text-2xl
                             2xl:ml-2'><WiCloudyGusts /></span>
                    </div>
            </div>
        </div>
    </div> 
  )
}

export default MainPage
