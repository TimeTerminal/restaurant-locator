import { createStore } from 'redux';
import rootReducer from './rootReducer';

export default function configureStore(initialState) {
  const store = createStore(rootReducer);

  /* eslint-disable no-undef */
  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      /* eslint-enable no-undef */
      const nextRootReducer = require('./rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  
  return store;
}
