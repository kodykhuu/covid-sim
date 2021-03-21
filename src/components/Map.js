import React, {useState, useEffect} from 'react'
import '../styles/Map.css'
import Healthy from './Healthy.js'
import Unhealthy from './Unhealthy.js'

const Map = ({selected, mask, mapSize, critters, setCritters, bg}) => {

    const [upperBound, setUpperBound] = useState(window.innerHeight * (.50 - mapSize / 2));
    const [lowerBound, setLowerBound] = useState(window.innerHeight * (.50 + mapSize / 2));
    const [leftBound, setLeftBound] = useState(window.innerWidth * (.50 - mapSize / 2));
    const [rightBound, setRightBound] = useState(window.innerWidth * (.50 + mapSize / 2));

    const [h, setH] = useState(window.innerHeight)
    const [w, setW] = useState(window.innerWidth)


    useEffect(() => {
        let handle = setInterval(updateCritters, 50);  
        let checkResize = setInterval(updateWindow, 50);

        return () => {
          clearInterval(handle);
          clearInterval(checkResize);
        }
      });

    const updateWindow = () => {
        if (window.innerHeight !== h || window.innerWidth !== w){
            for (let i = 0 ; i < critters.length ; i++){
                critters[i].x = (critters[i].x / w) * window.innerWidth
                critters[i].y = (critters[i].y / h) * window.innerHeight
            }
            setH(window.innerHeight)
            setW(window.innerWidth)
        }
        setUpperBound(window.innerHeight * (.50 - mapSize / 2))
        setLowerBound(window.innerHeight * (.50 + mapSize / 2))
        setLeftBound(window.innerWidth * (.50 - mapSize / 2))
        setRightBound(window.innerWidth * (.50 + mapSize / 2))
    }

    const createCritter = (x, y, speed, angle) => {
        return {
            x,
            y,
            speed,
            angle,
            selected,
            mask,
            collisionTimer: 0
        }
    }

    const updateCritters = () => {
        let newCritters = [...critters]
        for (let i = 0; i < newCritters.length; i++) {
            newCritters[i].x += newCritters[i].speed * Math.cos(newCritters[i].angle)
            newCritters[i].y += newCritters[i].speed * Math.sin(newCritters[i].angle)

            if (newCritters[i].x + 10 < leftBound){
                newCritters[i].angle = 2 * Math.PI/2 - newCritters[i].angle
            }
            else if (newCritters[i].x + 45 > rightBound){
                newCritters[i].angle = 2 * Math.PI/2 - newCritters[i].angle
            }
            else if (newCritters[i].y + 15 < upperBound) {
                newCritters[i].angle = -newCritters[i].angle
            }
            
            else if (newCritters[i].y + 45 > lowerBound) {
                newCritters[i].angle = -newCritters[i].angle
            }

            for (let j = 0; j < newCritters.length; j++) {
                if (j === i) {
                    continue;
                }
                if (Math.abs(newCritters[i].x - newCritters[j].x) < 15 && Math.abs(newCritters[i].y - newCritters[j].y) < 15){
                    if(!(newCritters[i].selected === "Healthy" && newCritters[j].selected === "Healthy")){
                        // let p1mask = (newCritters[i].mask === 1 ? true : false)
                        // let p2mask = (newCritters[j].mask === 1 ? true : false)
                        let p1healthy = (newCritters[i].selected === "Healthy" ? true : false)
                        let p2healthy = (newCritters[j].selected === "Healthy" ? true : false)

                        let chance = 1

                        if (!p1healthy && !p2healthy){
                            //Nothing. They are both sick
                        }
                        // If Person 1 is sick
                        else if (!p1healthy && p2healthy){
                            if (newCritters[i].mask === 1 && newCritters[j].mask === 1){
                                chance = 0.015
                            }
                            else if (newCritters[i].mask === 1 && newCritters[j].mask === -1) {
                                chance = 0.05
                            }
                            else if (newCritters[i].mask === -1 && newCritters[j].mask === 1){
                                chance = 0.70
                            }
                        }
                        // If Person 2 is sick
                        else if (p1healthy && !p2healthy){
                            if (newCritters[j].mask === 1 && newCritters[i].mask === 1){
                                chance = 0.015
                            }
                            else if (newCritters[j].mask === 1 && newCritters[i].mask === -1) {
                                chance = 0.05
                            }
                            else if (newCritters[j].mask === -1 && newCritters[i].mask === 1){
                                chance = 0.70
                            }
                        }

                        if (Math.random() < chance) {
                            console.log(newCritters[i].collisionTimer)
                            console.log(newCritters[j].collisionTimer)
                            if (newCritters[i].collisionTimer === 0){
                                console.log(chance)
                                newCritters[i].selected = "Unhealthy"
                                newCritters[i].collisionTimer = 20
                            }
                            if (newCritters[j].collisionTimer === 0){
                                console.log(chance)
                                newCritters[j].selected = "Unhealthy"
                                newCritters[j].collisionTimer = 20
                            }
                        }
                    }
                }
                // If timer is 0
                if (newCritters[i].collisionTimer > 0){
                    newCritters[i].collisionTimer -= 1
                }
            }
        }
        setCritters(newCritters)
        
    }

    function spawnItem (e) {

        let newCritters = []

        if(e.clientX < leftBound + 30){
            if(e.clientY < upperBound + 30){

                newCritters = critters.concat(
                    createCritter(e.clientX, e.clientY + 15,
                                Math.random() * 5,
                                2 * Math.PI * Math.random()))
            }
            else if (e.clientY > lowerBound - 30){

                newCritters = critters.concat(
                    createCritter(e.clientX, e.clientY - 50,
                                Math.random() * 5,
                                2 * Math.PI * Math.random()))
            } else {
                newCritters = critters.concat(
                    createCritter(e.clientX, e.clientY - 15,
                                Math.random() * 5,
                                2 * Math.PI * Math.random()))
            }

        }

        else if(e.clientX > rightBound - 30){
            if(e.clientY < upperBound + 30){

                newCritters = critters.concat(
                    createCritter(e.clientX - 60, e.clientY + 15,
                                Math.random() * 5,
                                2 * Math.PI * Math.random()))
            }
            else if (e.clientY > lowerBound - 30){

                newCritters = critters.concat(
                    createCritter(e.clientX - 60, e.clientY - 50,
                                Math.random() * 5,
                                2 * Math.PI * Math.random()))
            } else {
                newCritters = critters.concat(
                    createCritter(e.clientX - 60, e.clientY - 15,
                                Math.random() * 5,
                                2 * Math.PI * Math.random()))
            }
        }

        else if(e.clientX < leftBound + 30 || e.clientY < upperBound + 30){
            newCritters = critters.concat(
                createCritter(e.clientX - 25, e.clientY,
                            Math.random() * 5,
                            2 * Math.PI * Math.random()))
            
            
        } else if (e.clientX > rightBound - 30 || e.clientY > lowerBound - 30) {

            newCritters = critters.concat(
                createCritter(e.clientX - 25, e.clientY - 50,
                            Math.random() * 5,
                            2 * Math.PI * Math.random()))
        } else {
            newCritters = critters.concat(
                createCritter(e.clientX - 25, e.clientY - 25,
                            Math.random() * 5,
                            2 * Math.PI * Math.random()))
        }

        setCritters(newCritters)

    }

    const renderCritters = () => {
        return critters.map((critter) => (
            critter.selected === "Healthy" 
            ? (<Healthy x={critter.x} y={critter.y} speed={critter.speed} angle={critter.angle} mask={critter.mask} />)
            : (<Unhealthy x={critter.x} y={critter.y} speed={critter.speed} angle={critter.angle} mask={critter.mask}/>)
          ))
    }

    const style = {
        height: `${mapSize*100}%`,
        width: `${mapSize*100}%`,
        maxHeight: 'inherit',
        maxWidth: 'inherit',
        position: "absolute",
        border: "3px solid black",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        margin: "auto",
        backgroundColor: `${bg}`
    }

    return (
        <div style={style} onClick={spawnItem}>{renderCritters()}</div>
    )
}

export default Map