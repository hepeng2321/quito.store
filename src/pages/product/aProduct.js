import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {actionCreators} from "./store";
import ProductContent from "./content";
import {actionCreators as acHome} from "../home/store";

function getWidth() {
  let width = Math.ceil(window.innerWidth - 40) / 2
  if (width < 150) {
    width = Math.ceil(window.innerWidth - 40)
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

  render() {
    const {
      id,
      pid,
      product,
      recommendList,
      handleGetProductAPI,
      handleGetRecommendListAPI
    } = this.props

    if (!recommendList) {
      handleGetRecommendListAPI()
      if (id !== pid || !product) {
        handleGetProductAPI(id)
      }
      return null
    }

    if (id !== pid || !product) {
      handleGetProductAPI(id)
      return null
    } else {
      return (
        <React.Fragment>
          <ProductContent
            itemWidth={this.state.itemWidth}
            product={product.toJS()}
            recommendList={recommendList.toJS()}
          />
        </React.Fragment>
      )
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize, true) //监听窗口大小改变
  }

  componentWillUnmount() { //一定要最后移除监听器，以防多个组件之间导致this的指向紊乱
    window.removeEventListener('resize', this.handleResize, true)
  }

}

const mapStateToProps = (state) => {
  return {
    pid: state.getIn(['product', 'pid']),
    product: state.getIn(['product', 'product']),
    recommendList: state.getIn(['home', 'recommendList']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetProductAPI(pid) {
      dispatch(actionCreators.getProductAPI(pid))
    },
    handleGetRecommendListAPI() {
      dispatch(acHome.getRecommendAPI())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AProduct);