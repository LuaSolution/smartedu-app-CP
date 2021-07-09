import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'

const middlewares = []

export const configureStore = initialState => {
  const store = createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares))
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}