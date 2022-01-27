import * as actionTypes from './actionTypes';
import axios from "axios";
import {Timeout} from "../../../common/util/url";

const getCategory = (category) => ({
  type: actionTypes.GET_CATEGORY,
  category: category,
})

export const getCategoryAPI = () => {

  return (dispatch) => {

    const instance = axios.create({
      baseURL: '/APIs/v1/category',
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
      baseURL: '/APIs/v1/recommend',
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