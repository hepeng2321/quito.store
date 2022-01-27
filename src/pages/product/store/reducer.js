import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'

const defaultState = fromJS ({
  pid: 0,
  product: null,
  inboundPid: 0,
  inbound: null,
});

const App = (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.GET_Product:
      return state.merge({
        pid: action.pid,
        product: fromJS(action.product)
      })
    case actionTypes.GET_Inbound:
      return state.merge({
        inboundPid: action.inboundPid,
        inbound: fromJS(action.inbound)
      })
    default:
      return state;
  }
}

export default App;
