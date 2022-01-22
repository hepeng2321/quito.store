import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'

const defaultState = fromJS ({
  pid: "",
  product: null,
});

const App = (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.GET_Product:
      return state.merge({
        pid: action.pid,
        product: fromJS(action.product)
      })
    default:
      return state;
  }
}

export default App;
