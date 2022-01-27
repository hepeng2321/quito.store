import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'

const defaultState = fromJS ({
  page: '',
  cat: '',
  catProduct: null,
  catListed: '',
  catProdListed: null,
});

const App = (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.PAGE:
      return state.set('page', action.page)
    case actionTypes.GET_CatProdListed:
      return state.merge({
        catListed: action.catListed,
        catProdListed: fromJS(action.catProdListed)
      })
    case actionTypes.GET_CatProduct:
      return state.merge({
        cat: action.cat,
        catProduct: fromJS(action.catProduct)
      })
    default:
      return state;
  }
}

export default App;
