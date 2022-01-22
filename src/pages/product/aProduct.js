import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {actionCreators as acShop} from "../shop/store";
import ShopHeader from "../../common/shopHeader";
import ProductContent from "./content";

class AProduct extends PureComponent {

  openPage = (page) => {
    this.props.setPage(page)  //设置激活页
  }

  render() {
    const {
      id,
      pid,
      product,
      recommendList,
      handleGetProduct,
      handleGetRecommendList
    } = this.props

    if (!recommendList) {
      handleGetRecommendList()
      if (id !== pid || !product) {
        handleGetProduct(id)
      }
      return null
    }

    if (id !== pid || !product) {
      handleGetProduct(id)
      return null
    } else {
      console.log(100, product.toJS())
      console.log(200, recommendList.toJS())
      return (
        <React.Fragment>
          <ShopHeader
            page={""}
            openPage={this.openPage}
          />
          <ProductContent
            product={product.toJS()}
            recommendList={recommendList.toJS()}
          />
        </React.Fragment>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    pid: state.getIn(['product', 'pid']),
    product: state.getIn(['product', 'product']),
    recommendList: state.getIn(['shop', 'recommendList']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetProduct(id) {
      dispatch(actionCreators.getProductAPI(id))
    },
    setPage(page) {
      dispatch(acShop.setPage(page))
    },
    handleGetRecommendList() {
      dispatch(acShop.getRecommendAPI())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AProduct);