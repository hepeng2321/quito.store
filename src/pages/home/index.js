import React, { PureComponent } from 'react'

import {
  HomeWrapper
} from './style'

import ProductHero from "../../common/hero";
import ProductCategories from "../../common/category";
import Location from "../../common/location";
import AppFooter from "../../common/footer";

class Home extends PureComponent {

  render() {

    return (
      <HomeWrapper className={"home_wrapper"}>
        <ProductHero />
        <ProductCategories />
        <Location />
        <AppFooter />
      </HomeWrapper>
    )
  }

}

export default Home;