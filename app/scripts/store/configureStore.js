import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import App from '../reducers/reducer';


const createStoreWithMiddleware = applyMiddleware(
	thunk
)(createStore)

const store = createStoreWithMiddleware(App);

export default store