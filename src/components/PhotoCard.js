/* eslint-disable jsx-a11y/alt-text */
import React from 'react';



const PhotoCard = (props) => {
    return ( 
        <li>
            <img src={`https://farm${props.farm}.staticflickr.com/${props.serverID}/${props.id}_${props.secret}.jpg`}/>
        </li>
    )
}

export default PhotoCard;