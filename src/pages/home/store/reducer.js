import * as actionTypes from './actionTypes'
import { fromJS } from 'immutable'

const defaultState = fromJS ({
  category: null,
  recommendList: null,
  size: null,
  sizeCat: "",
  catSize: null
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
    if (cat.Parent === "home" && (cat.Brother === "" || cat.Brother === "home")) {
      cats.push(cat)
      break
    }
  }

  for (let i=0; i<category.length; i++) {
    let ccc = catOrderBro(category, cats[cats.length-1].Cat)
    if (ccc) {
      cats.push(ccc)
    } else {
      for (const c1 of category) {
        let found = false
        for (const c2 of cats) {
          if (c1.Cat === c2.Cat) {
            found = true
          }
        }
        if (!found) {
          cats.push(c1)
        }
      }
      return cats
    }
  }

}

const App = (state = defaultState, action) => {

  switch (action.type) {
    case actionTypes.GET_Category:
      let cats = []
      if (action.category.length > 0) {
        cats = catOrder(action.category)
      }
      return state.set('category', fromJS(cats))
    case actionTypes.GET_RecommendList:
      return state.set('recommendList', fromJS(action.recommendList))
    case actionTypes.GET_Size:
      return state.set('size', fromJS(action.size))
    case actionTypes.GET_CatSize:
      return state.merge({
        sizeCat: action.sizeCat,
        catSize: fromJS(action.catSize)
      })
    default:
      return state;
  }
}

export default App;
