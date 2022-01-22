import React from 'react'
import {useParams} from "react-router-dom";
import AProduct from "./aProduct";

export default function Product(props) {

  let { id } = useParams();

  if (!id) {
    id = "1"
  }

  return (
    <AProduct
      id={id}
    />
  )

}