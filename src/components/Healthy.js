import React from 'react';
import Unmasked from "../pictures/blue.png";
import Masked from "../pictures/bluemask.png"

const Healthy = ({x, y, speed, angle, mask}) => {

    return (
        <div style={{
            backgroundImage: `url(${(mask === 1 ? Masked : Unmasked)})`,
            backgroundSize: "cover",
            position: 'fixed',
            left: `${x}px`,
            top: `${y}px`,
            height: `${mask === -1 ? "50px" : "40px"}`,
            width: `${mask === -1 ? "50px" : "40px"}`,
        }}></div>
    )
}
export default Healthy