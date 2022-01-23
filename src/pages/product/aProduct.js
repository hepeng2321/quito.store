import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {actionCreators as acShop} from "../shop/store";
import ShopHeader from "../../common/shopHeader";
import ProductContent from "./content";
import {Hidden} from "@mui/material";

function getWidth() {
  let width = Math.ceil(window.innerWidth - 30) / 2
  if (width < 150) {
    width = Math.ceil(window.innerWidth - 30)
    if (width < 150) {
      width = 150
    }
  }
  if (width > 210) {
    width = 210
  }
  return width
}

class AProduct extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      itemWidth: getWidth()
    }
    this.handleResize = this.handleResize.bind(this)
  }

  handleResize = () => {
    let itemWidth = getWidth()
    if (itemWidth !== this.state.itemWidth) {
      this.setState({
        itemWidth: itemWidth
      })
    }
  }

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
      return (
        <React.Fragment>
          <Hidden mdDown>
            <ShopHeader
              page={""}
              openPage={this.openPage}
            />
          </Hidden>
          <ProductContent
            itemWidth={this.state.itemWidth}
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