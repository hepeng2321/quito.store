import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'

const defaultState = fromJS ({
  category: null,
  recommendList: null
});

function catOrderBro(category, brother) {
  for (const cat of category) {
    if (cat.Parent === "home" && cat.Brother === brother) {
      return cat
    }
  }
  return null
}

function catOrder(category) {
  let cats = []
  for (const cat of category) {
    if (cat.Parent === "home" && cat.Brother === "") {
      cats.push(cat)
      break
    }
  }

  for (let i=0; i<category.length; i++) {
    let ccc = catOrderBro(category, cats[cats.length-1].Cat)
    if (ccc) {
      cats.push(ccc)
    } else {
      return cats
    }
  }

}

const App = (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.GET_CATEGORY:
      let cats = []
      if (action.category.length > 0) {
        cats = catOrder(action.category)
      }
      return state.set('category', fromJS(cats))
    case actionTypes.GET_RecommendList:
      return state.set('recommendList', fromJS(action.recommendList))
    default:
      return state;
  }
}

export default App;
