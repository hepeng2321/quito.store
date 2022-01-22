import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'
import {fashion} from "../../../common/util/category";

const defaultState = fromJS ({
  page: fashion,
  category: fashion,
  prodList: null,
  recommendList: null
});

const App = (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.PAGE:
      return state.set('page', action.page)
    case actionTypes.GET_ProdList:
      return state.merge({
        category: action.category,
        prodList: fromJS(action.prodList)
      })
    case actionTypes.GET_RecommendList:
      return state.set('recommendList', fromJS(action.recommendList))
    default:
      return state;
  }
}

export default App;
