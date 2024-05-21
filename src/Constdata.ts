interface data {
    feels_like:number,
    humidity:number,
    pressure:number,
    temp:number,
    temp_max:number,
    temp_min:number,
    windspeed:number,
    description:string,
    city:string,
    main:string 
}

const weatherData:data={
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    windspeed: 0,
    city:"",
    description: "",
    main: ""
}

 export default weatherData;
