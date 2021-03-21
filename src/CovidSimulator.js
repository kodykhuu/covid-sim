import React, {useState, useEffect} from 'react';
import './styles/covid-sim.css'
import App from './App'
import Map from './components/Map'

import PulseLoader from "react-spinners/PulseLoader";
import {Spring} from 'react-spring/renderprops'

function CovidSimulator() {
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [critters, setCritters] = useState([]);

    const A = <span style={{color:"red"}}>A</span>
    const AB = <span style={{color:"blue"}}>A</span>

    const createCritter = (x, y, speed, angle) => {
        return {
            x,
            y,
            speed,
            angle,
            selected: "Healthy",
            mask: 1,
            collisionTimer: 0
        }
    }

    useEffect(() =>{
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          let crits = []
          for (let i = 0; i < 30; i++){
                console.log(i)
                crits.push(createCritter((Math.random() * (window.innerWidth - 50)), (
                                            Math.random() * (window.innerHeight - 50)),
                                            Math.random() * 5,
                                            2 * Math.PI * Math.random()))
          }
          console.log(crits)
          setCritters(crits)
        }, 2000)
      }, [])

    return (
        <div className="covidsim">
            {loading ?
              <Spring config={{duration: 2000}} from={{opacity: 0.25}} to={{opacity: 1}}>
              {props => (
                <div style={props} class="loadingscreen">
                  <div>
                    <PulseLoader
                        size={75}
                        margin={64}
                        color={"rgba(39, 70, 144)"}
                        loading={loading}
                    />
                  </div>
                  <div style={{color: 'white', fontSize: '48px', textAlign: "center"}}>SC{AB}NNING FOR M{A}SKS</div>
                </div>
              )}
            </Spring>
             : 
                <div className="covidsim">
                    {page === 0 
                    ?
                    <div>
                        <div className="overlaySectionHeader"><p>COVID-19 SIMUL{A}TOR</p></div>
                        <div className="overlaySectionOne">
                            <p>
                                Wearing a M{A}SK is very important. Without one, you are more susceptible to catching COVID.
                                With rates growing rapidly, we need to be mindful for the people around us, and help slow down that rate.
                                Did you know that if you have COVID, the chances of someone catching it from you is over 70%!
                                Let's all be mindful and continue to wear a M{AB}SK when out in public!
                            </p>
                        </div>
                        <div className="overlaySectionTwo">
                            <p>
                                Spawn HE{AB}LTHY (blue) and UNHE{A}LTHY (red) crewmates with or without masks to see how a virus spreads! 
                                <br/><br/>Note: The map must be empty in order to change map size. Use the reset button to clear the map.
                            </p>
                        </div>
                        <button onClick={() => setPage(1)} className="overlayButton">START</button>

                        <Map selected={"Unhealthy"} mask={1} mapSize={1} critters={critters} setCritters={setCritters} bg={"rgba(0, 0, 0, 0)"} 
                             className="background"/>
                    </div>
                    :
                    <Spring
                        config={{duration: 2000}}
                        from={{opacity: 0}}
                        to={{opacity: 1}}>
                        {props => (
                            <div style={props}>
                                <App/>
                            </div>
                        )}
                    </Spring>
                    }
                </div>
            }
        </div>
    )
}

export default CovidSimulator;