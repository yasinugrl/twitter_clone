import { combineReducers } from 'redux';
import PostsReducers from './PostsReducers';

export default combineReducers({
    postsResponse: PostsReducers
});