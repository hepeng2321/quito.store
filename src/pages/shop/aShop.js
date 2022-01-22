import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {actionCreators} from "./store";
import ShopHeader from "../../common/shopHeader";
import ShopContent from "./content";

class AShop extends PureComponent {

  openPage = (page) => {
    this.props.setPage(page)  //设置激活页
  }

  render() {
    const {
      cat,
      page,
      category,
      prodList,
      recommendList,
      handleGetProdList,
      handleGetRecommendList
    } = this.props

    if (!recommendList) {
      handleGetRecommendList()
      if (category !== cat || !prodList) {
        handleGetProdList(cat)
      }
      return null
    }

    if (category !== cat || !prodList) {
      handleGetProdList(cat)
      return null
    } else {
      return (
        <React.Fragment>
          <ShopHeader
            cat={cat}
            page={page}
            openPage={this.openPage}
          />
          <ShopContent
            prodList={prodList.toJS()}
            recommendList={recommendList.toJS()}
          />
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.getIn(['shop', 'page']),
    category: state.getIn(['shop', 'category']),
    prodList: state.getIn(['shop', 'prodList']),
    recommendList: state.getIn(['shop', 'recommendList']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPage(page) {
      dispatch(actionCreators.setPage(page))
    },
    handleGetProdList(cat) {
      dispatch(actionCreators.getProdListAPI(cat))
    },
    handleGetRecommendList() {
      dispatch(actionCreators.getRecommendAPI())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AShop);