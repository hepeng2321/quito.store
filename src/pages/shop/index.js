import React from 'react'
import {useParams} from "react-router-dom";
import AShop from "./aShop";

export default function Shop(props) {

  let { cat } = useParams();

  if (!cat) {
    cat = "fashion"
  }

  return (
    <AShop cat={cat} />
  )

}