import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {actionCreators} from "./store";
import {actionCreators as acHome} from "../home/store";
import ShopContent from "./content";

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

class AShop extends PureComponent {

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
      cat,
      catListed,
      catProdListed,
      recommendList,
      handleGetCatProdListedAPI,
      handleGetRecommendListAPI
    } = this.props

    console.log(0, "|", catListed, "|", cat, "|", catProdListed)
    if (!recommendList) {
      handleGetRecommendListAPI()
      return null
    }

    console.log(2, "|", catListed, "|", cat, "|", catProdListed)

    if (catListed !== cat) {
      console.log(3, "|", catListed, "|", cat, "|", catProdListed)
      handleGetCatProdListedAPI(cat)
      return null
    } else {
      console.log(5, "|", catListed, "|", cat, "|", catProdListed)
      let prodListed
      if (catProdListed) {
        prodListed = catProdListed.toJS()
      } else {
        prodListed = null
      }
      return (
        <React.Fragment>
          <ShopContent
            itemWidth={this.state.itemWidth}
            prodListed={prodListed}
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
    catListed: state.getIn(['shop', 'catListed']),
    catProdListed: state.getIn(['shop', 'catProdListed']),
    recommendList: state.getIn(['home', 'recommendList']),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleGetCatProdListedAPI(cat) {
      dispatch(actionCreators.getCatProdListedAPI(cat))
    },
    handleGetRecommendListAPI() {
      dispatch(acHome.getRecommendAPI())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AShop);