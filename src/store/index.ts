/* eslint-disable no-underscore-dangle */
import { useMemo } from 'react'
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'

let store:any
const isActiveReduxDevTools = typeof window !== 'undefined' && (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
const composeEnhancers = isActiveReduxDevTools ? (window as any)?.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose
const storeEnhancers = composeEnhancers(applyMiddleware(thunkMiddleware))

function initStore(initialState:any) {
  return createStore(reducers, initialState, storeEnhancers)
}

export const initializeStore = (preloadedState:any) => {
  let _store = store ?? initStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState:any) {
  const currentStore = useMemo(() => initializeStore(initialState), [initialState])
  return currentStore
}
