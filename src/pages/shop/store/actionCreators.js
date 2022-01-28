import * as actionTypes from './actionTypes';
import axios from "axios";
import {Timeout} from "../../../common/util/url";

export const setPage = (page) => ({
  type: actionTypes.PAGE,
  page: page,
})

const getCatProdListed = (cat, catProdListed) => ({
  type: actionTypes.GET_CatProdListed,
  catListed: cat,
  catProdListed: catProdListed
})

export const getCatProdListedAPI = (cat) => {
  return (dispatch) => {
    const instance = axios.create({
      baseURL: '/v1/category_product_listed/' + cat,
      timeout: Timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return new Promise((resolve, reject) => {
      instance.get('')
        .then((res) => {
          console.log("getCatProdListedAPI", res)
          if (res.data.Code === 0) {
            dispatch(getCatProdListed(cat, res.data.Body.catProducts))
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
};

const getCatProduct = (cat, catProduct) => ({
  type: actionTypes.GET_CatProduct,
  cat: cat,
  catProduct: catProduct
})

export const getCatProductAPI = (cat) => {
  return (dispatch) => {
    const instance = axios.create({
      baseURL: '/v1/category_product/' + cat,
      timeout: Timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return new Promise((resolve, reject) => {
      instance.get('')
        .then((res) => {
          console.log("getCatProductAPI", res)
          if (res.data.Code === 0) {
            dispatch(getCatProduct(cat, res.data.Body.catProducts))
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
};
