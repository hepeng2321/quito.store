import React, { PureComponent } from 'react'

import {
  HomeWrapper
} from './style'

import ProductHero from "../../common/hero";
import ProductCategories from "../../common/category";
import Location from "../../common/location";
import AppFooter from "../../common/footer";
import {connect} from "react-redux";
import {actionCreators} from "./store";

class Home extends PureComponent {

  render() {

    const {
      category,
      recommendList,
      handleGetCategoryAPI,
      handleGetRecommendListAPI
    } = this.props

    if (!recommendList) {
      handleGetRecommendListAPI()
      return null
    }

    if (!category) {
      handleGetCategoryAPI()
      return null
    }

    return (
      <HomeWrapper className={"home_wrapper"}>
        <ProductHero />
        <ProductCategories category={category} />
        <Location />
        <AppFooter />
      </HomeWrapper>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    category: state.getIn(['home', 'category']),
    recommendList: state.getIn(['home', 'recommendList']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCategoryAPI() {
      dispatch(actionCreators.getCategoryAPI())
    },
    handleGetRecommendListAPI() {
      dispatch(actionCreators.getRecommendAPI())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);