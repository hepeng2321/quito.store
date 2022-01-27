import React from 'react'
import {useParams} from "react-router-dom";
import AShop from "./aShop";

function Shop(props) {

  let { cat } = useParams();

  if (!cat) {
    cat = "fashion"
  }

  return (
    <React.Fragment>
      <AShop cat={cat} />
    </React.Fragment>
  )

}

export default Shop;