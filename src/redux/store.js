import { createStore } from 'redux';
import reducer from './reducers'

//create store
const store = createStore(reducer);
export default store