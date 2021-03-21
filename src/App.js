import './App.css';
import React, {useState} from 'react';
import Map from './components/Map';

import Bar from './pictures/bar.jpg'
import Office from './pictures/office.jpg'
import Restaurant from './pictures/restaurant.jpg'
import Gym from './pictures/gym.jpg'
import Supermarket from './pictures/supermarket.jpg'
import Mall from './pictures/cocoMall.png'

function App() {
  const [currentSelection,setCurrentSelection] = useState("Healthy");
  const [mask, setMask] = useState(-1)
  const [mapSize, setMapSize] = useState(.50)

  const [critters, setCritters] = useState([])

  const [mapName, setMapName] = useState("Supermarket")
  const [m,setM] = useState(Supermarket)

  const handleCheckClick = () => {
    setMask(mask * -1)
  }

  const getMapType = (value) => {
    if(value < .2){
      setMapName("Bar")
      setM(Bar)
    }
    else if(.2 <= value && value < .3){
      setMapName("Office")
      setM(Office)
    }
    else if(.3 <= value && value < .4){
      setMapName("Restaurant")
      setM(Restaurant)
    }
    else if(.4 <= value && value < .5){
      setMapName("Gym")
      setM(Gym)
    }
    else if(.5 <= value && value < .6){
      setMapName("Supermarket")
      setM(Supermarket)
    }
    else if(.6 <= value && value < .8){
      setMapName("Mall")
      setM(Mall)
    }
  }

  const b = [...critters].filter(c => c.selected === "Healthy").length
  const r = [...critters].filter(c => c.selected === "Unhealthy").length

  return (
    <div className="App">
      <div className="topBar">

        <div className="buttons">
          <button disabled={currentSelection === "Healthy"} onClick={() => setCurrentSelection("Healthy")}>Healthy</button>
          <button disabled={currentSelection === "Unhealthy"} onClick={() => setCurrentSelection("Unhealthy")}>Unhealthy</button>
          <button onClick={() => setCritters([])}>Reset</button>
        </div>

        <div className="maskSelection">
          <input type="checkbox" name="mask" onChange={handleCheckClick}/>
          <label for="mask">Mask</label>
        </div>
        
        <p className="middle">{mapName} </p> 

        <p className="stats">Population: {critters.length}</p>    
        <div className="scroller">
          <input
            name="size"
            type="range"
            max=".80"
            min=".15"
            defaultValue=".50"
            step=".01"
            disabled={critters.length !== 0}
            onChange={(e) =>{
              setMapSize(e.target.value)
              getMapType(e.target.value)
            }
            }
          /> 
          <p style={{alignItems: "center"}}>Map size: {mapSize}</p>            
        </div>        
         
      </div>

      <div style={{backgroundImage: `url(${m})`, backgroundSize: "cover", backgroundRepeat:"no-repeat", backgroundPosition:"center center", height:"80vh", width: "100%"}} className="playground">
        <Map selected={currentSelection} mask={mask} mapSize={mapSize} critters={critters} setCritters={setCritters} bg={"#b3b3b394"}/>
      </div>
      <div class="bottomBar">
      <div style={{width: `${(critters.length === 0 ? 100 : (b/critters.length) * 100)}%`, height: "100%", backgroundColor: "#2edce8"}}>{b}</div>
      <div style={{width: `${(critters.length === 0 ? 0 : (r/critters.length) * 100)}%`, height: "100%", backgroundColor: "#db1d00"}}>{r}</div>
      </div>
    </div>
  );
}

export default App;