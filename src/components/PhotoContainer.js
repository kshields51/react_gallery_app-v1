/* eslint-disable no-lone-blocks */
import React from 'react';
import PhotoCard from './PhotoCard';
import {withRouter} from 'react-router-dom';

{/* this component holds all of the individual photos */}
const PhotoContainer = ({data, match}) => {
  let name = match.params.name; // a param that is used to dynamcally display a title for the results
    return (
        <div className="photo-container">
        <h2>{name}</h2>
        <ul>
          {/*the photos are created here using the map funtion to iterate over the array of photos passing the correct information as props to each photo */}
          {data.map( pic =>
            <PhotoCard 
              farm={pic.farm}
              serverID={pic.server}
              id={pic.id}
              secret={pic.secret}
              key={pic.id}
           />
          )
          }
        </ul>
      </div>
    )
}

export default withRouter(PhotoContainer);

