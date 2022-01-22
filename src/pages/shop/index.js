import React from 'react'
import {useParams} from "react-router-dom";
import AShop from "./aShop";
import {connect} from "react-redux";

function Shop(props) {

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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);