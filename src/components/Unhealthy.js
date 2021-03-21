import React from 'react';
import Unmasked from "../pictures/red.png";
import Masked from "../pictures/redmask.png"

const Unhealthy = ({x, y, speed, angle, mask}) => {
    return (
        <div style={{
            backgroundImage: `url(${(mask === 1 ? Masked : Unmasked)})`,
            backgroundSize: "cover",
            position: 'fixed',
            left: `${x}px`,
            top: `${y}px`,
            height: "50px",
            width: "50px",
        }}></div>
    )
}
export default Unhealthy