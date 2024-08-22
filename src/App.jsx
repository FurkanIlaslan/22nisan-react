import {useEffect, useState} from 'react';
import './App.css';
import City from './components/City';
import CLOUDS from "vanta/src/vanta.clouds"

function App() {

  const key = "2833d555dee3517850f7e12386dc9f3f";
  const [search, setSearch] = useState("");
  const [city, setCity] = useState({sehir : {}, filtre : []})

  const request = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${key}&units=metric&lang=tr`;

  useEffect(()=>{
    if(search.trim()){
      fetch(request)
      .then(function(response){
        return response.json();
      })
      .then((data)=>{
        console.log(data)
        const filtreliDurum = data.list.filter((saat)=>
          saat.dt_txt.includes("12:00:00")
        );
        setCity({sehir : data.city, filtre : filtreliDurum});
      })
      .catch((error)=>{
        console.error("Veri alınamadı", error)
      })
    }else{
      setCity({sehir : {}, filtre : []});
    }
  },[search])


  useEffect(()=> {
    CLOUDS({
      el: "body",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00
    })
  },[])

  return (
    <div className="App py-5">
      <input type="text" placeholder='Şehir arayınız...' className='text-input' onChange={(e)=> setSearch(e.target.value)}/>
      <City city = {city}/>
    </div>
  );
}

export default App;
