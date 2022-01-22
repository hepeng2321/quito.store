import * as actionTypes from './actionTypes';
import p_1 from "./p_1.json"
import p_3 from "./p_3.json"

const getProduct = (pid, product) => ({
  type: actionTypes.GET_Product,
  pid: pid,
  product: product
})

export const getProductAPI = (id) => {
  return (dispatch) => {
    if (id === "1") {
      dispatch(getProduct(id, p_1.Body))
    } else if (id === "3") {
      dispatch(getProduct(id, p_3.Body))
    } else {
      dispatch(getProduct(id, p_1.Body))
    }
  }
};
