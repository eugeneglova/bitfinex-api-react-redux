import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

const middlewareEnhancer = applyMiddleware(thunkMiddleware)
const composedEnhancers = composeWithDevTools(middlewareEnhancer)

const store = createStore(rootReducer, undefined, composedEnhancers)

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
}

export default store
