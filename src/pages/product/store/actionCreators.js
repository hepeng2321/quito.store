import * as actionTypes from './actionTypes';
import axios from "axios";
import {Timeout} from "../../../common/util/url";

const getProduct = (pid, product) => ({
  type: actionTypes.GET_Product,
  pid: pid,
  product: product
})

export const getProductAPI = (pid) => {
  return (dispatch) => {
    const instance = axios.create({
      baseURL: '/v1/product/' + pid,
      timeout: Timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return new Promise((resolve, reject) => {
      instance.get('')
        .then((res) => {
          console.log("getProductAPI", res)
          if (res.data.Code === 0) {
            dispatch(getProduct(pid, res.data.Body.product))
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
};

const getInbound = (pid, inbound) => ({
  type: actionTypes.GET_Inbound,
  inboundPid: pid,
  inbound: inbound
})

export const getInboundAPI = (pid) => {
  return (dispatch) => {
    const instance = axios.create({
      baseURL: '/v1/inbound/' + pid,
      timeout: Timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return new Promise((resolve, reject) => {
      instance.get('')
        .then((res) => {
          console.log("getInboundAPI", res)
          if (res.data.Code === 0) {
            dispatch(getInbound(pid, res.data.Body.inbound))
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
};