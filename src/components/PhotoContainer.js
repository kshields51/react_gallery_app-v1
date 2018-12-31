/* eslint-disable no-lone-blocks */
import React from 'react';
import NotFound from './NotFound';
import PhotoCard from './PhotoCard';
import {withRouter} from 'react-router-dom';

const PhotoContainer = ({data, match}) => {
  let name = match.params.name;
    return (
        <div className="photo-container">
        <h2>Results</h2>
        <h2>{name}</h2>
        <ul>
          {/*the photos */}
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
          
          {/* NOT FOUND */}
          <NotFound />
        </ul>
      </div>
    )
}

export default withRouter(PhotoContainer);

{/*
<li>
            <img src="https://farm5.staticflickr.com/4334/37032996241_4c16a9b530.jpg" alt="" />
          </li>
          <li>
            <img src="https://farm5.staticflickr.com/4342/36338751244_316b6ee54b.jpg" alt="" />
          </li>
          <li>
            <img src="https://farm5.staticflickr.com/4343/37175099045_0d3a249629.jpg" alt="" />
          </li>
          <li>
            <img src="https://farm5.staticflickr.com/4425/36337012384_ba3365621e.jpg" alt="" />
          </li>



*/}