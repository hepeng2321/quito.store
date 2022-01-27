import { combineReducers } from "redux-immutable";
import { reducer as homeReducer } from '../pages/home/store'
import { reducer as headerReducer } from '../common/header/store'
import { reducer as shopReducer } from '../pages/shop/store'
import { reducer as productReducer } from '../pages/product/store'

const reducer = combineReducers({
  home: homeReducer,
  header: headerReducer,
  shop: shopReducer,
  product: productReducer,
});

export default reducer;