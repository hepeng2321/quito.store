import React, { PureComponent } from 'react'

import {
  AdminContentWrapper,
  AdminMenuWrapper,
  AdminWrapper
} from './style'

import {connect} from "react-redux";
import {actionCreators} from "./store";
import AdminMenu from "./menu";
import AdminCategory from "./category";
import AdminSize from "./size";
import AdminProduct from "./product";
import AdminInbound from "./inbound";

class Admin extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      menu: ""
    }
    this.cRef = React.createRef()
  }

  handleChangeMenu = (menu) => {
    this.setState({
      menu: menu
    })
  }

  render() {

    const {
      handleOpenPic,
    } = this.props
    //
    // if (!recommendList) {
    //   handleGetRecommendListAPI()
    //   return null
    // }
    //
    // if (!category) {
    //   handleGetCategoryAPI()
    //   return null
    // }

    const {
      menu
    } = this.state

    return (
      <AdminWrapper className={"AdminWrapper"} style={{height: window.innerHeight-48}}>
        <AdminMenuWrapper>
          <AdminMenu handleChangeMenu={this.handleChangeMenu}/>
        </AdminMenuWrapper>
        <AdminContentWrapper ref={this.cRef}>
          {
            menu === 'Category' ?
              <AdminCategory cRef={this.cRef}/> :
            menu === 'Size' ?
              <AdminSize cRef={this.cRef}/> :
            menu === 'Product' ?
              <AdminProduct cRef={this.cRef} handleOpenPic={handleOpenPic}/> :
            menu === 'Inbound' ?
              <AdminInbound cRef={this.cRef}/> :
              undefined
          }
        </AdminContentWrapper>
      </AdminWrapper>
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

export default connect(mapStateToProps, mapDispatchToProps)(Admin);