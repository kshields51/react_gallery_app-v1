/* eslint-disable jsx-a11y/alt-text */
import React from 'react';

{/* This component renders each individual photo from the api pull. It uses props passed from the PhotoContainer component and string interpolation to render each image */}

const PhotoCard = (props) => {
    return ( 
        <li>
            <img src={`https://farm${props.farm}.staticflickr.com/${props.serverID}/${props.id}_${props.secret}.jpg`}/>
        </li>
    )
}

export default PhotoCard;