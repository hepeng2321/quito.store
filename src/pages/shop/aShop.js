import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {actionCreators} from "./store";
import ShopHeader from "../../common/shopHeader";
import ShopContent from "./content";
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

    console.log(2, cat, page)
    if (!recommendList) {
      console.log(3, cat, page)
      handleGetRecommendList()
      if (category !== cat || !prodList) {
        console.log(4, cat, page)
        handleGetProdList(cat)
      }
      return null
    }

    console.log(5, cat, page)

    if (category !== cat || !prodList) {
      console.log(6, cat, page)
      handleGetProdList(cat)
      return null
    } else {
      console.log(7, cat, page)
      return (
        <React.Fragment>
          <Hidden mdDown>
            <ShopHeader
              cat={cat}
              page={page}
              openPage={this.openPage}
            />
          </Hidden>
          <ShopContent
            itemWidth={this.state.itemWidth}
            prodList={prodList.toJS()}
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