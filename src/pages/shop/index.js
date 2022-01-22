import React from 'react'
import {useParams} from "react-router-dom";
import AShop from "./aShop";

export default function Shop(props) {

  let { cat } = useParams();
  console.log(0, cat)
  if (!cat) {
    cat = "fashion"
  }
  console.log(1, cat)
  return (
    <AShop cat={cat} />
  )

}