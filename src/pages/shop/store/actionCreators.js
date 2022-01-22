import * as actionTypes from './actionTypes';
import p1 from "./plFashion.json"
import p3 from "./plShoes.json"
import p5 from "./plCosmetic.json"
import rec from "./plRecommend.json"

export const setPage = (page) => ({
  type: actionTypes.PAGE,
  page: page,
})

const getProdList = (category, prodList) => ({
  type: actionTypes.GET_ProdList,
  category: category,
  prodList: prodList
})

export const getProdListAPI = (cat) => {
  return (dispatch) => {
    if (cat === "fashion") {
      dispatch(getProdList(cat, p1.Body))
    } else if (cat === "shoes") {
      dispatch(getProdList(cat, p3.Body))
    } else if (cat === "cosmetic") {
      dispatch(getProdList(cat, p5.Body))
    } else {
      dispatch(getProdList(cat, p1.Body))
    }
  }
};

const getRecommendList = (recommendList) => ({
  type: actionTypes.GET_RecommendList,
  recommendList: recommendList
})

export const getRecommendAPI = () => {
  return (dispatch) => {
    dispatch(getRecommendList(rec.Body))
  }
};