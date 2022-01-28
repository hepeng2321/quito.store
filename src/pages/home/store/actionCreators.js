import * as actionTypes from './actionTypes';
import axios from "axios";
import {Timeout} from "../../../common/util/url";

const getCategory = (category) => ({
  type: actionTypes.GET_Category,
  category: category,
})

export const getCategoryAPI = () => {

  return (dispatch) => {

    const instance = axios.create({
      baseURL: '/v1/category',
      timeout: Timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return new Promise((resolve, reject) => {
      instance.get('')
        .then((res) => {
          console.log("getCategoryAPI", res)
          if (res.data.Code === 0) {
            dispatch(getCategory(res.data.Body.cats))
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
};

const getRecommendList = (recommendList) => ({
  type: actionTypes.GET_RecommendList,
  recommendList: recommendList
})

export const getRecommendAPI = () => {
  return (dispatch) => {
    const instance = axios.create({
      baseURL: '/v1/recommend',
      timeout: Timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return new Promise((resolve, reject) => {
      instance.get('')
        .then((res) => {
          console.log("getRecommendAPI", res)
          if (res.data.Code === 0) {
            dispatch(getRecommendList(res.data.Body.recommend))
          }
        })
        .catch((e) => {
          reject(e)
        })
    })

  }
};

const getSize = (size) => ({
  type: actionTypes.GET_Size,
  size: size,
})

export const getSizeAPI = () => {

  return (dispatch) => {

    const instance = axios.create({
      baseURL: '/v1/size',
      timeout: Timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return new Promise((resolve, reject) => {
      instance.get('')
        .then((res) => {
          console.log("getSizeAPI", res)
          if (res.data.Code === 0) {
            dispatch(getSize(res.data.Body.size))
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
};

const getCatSize = (sizeCat, catSize) => ({
  type: actionTypes.GET_CatSize,
  sizeCat: sizeCat,
  catSize: catSize,
})

export const getCatSizeAPI = (cat) => {

  return (dispatch) => {

    const instance = axios.create({
      baseURL: '/v1/cat_size/' + cat,
      timeout: Timeout,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return new Promise((resolve, reject) => {
      instance.get('')
        .then((res) => {
          console.log("getCatSizeAPI", res)
          if (res.data.Code === 0) {
            dispatch(getCatSize(cat, res.data.Body.size))
          }
        })
        .catch((e) => {
          reject(e)
        })
    })
  }
};