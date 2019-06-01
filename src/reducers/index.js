import { combineReducers } from 'redux';
import AuthReducers from './AuthReducers';
import TweetReducers from './TweetReducers';

export default combineReducers({
    authResponse: AuthReducers,
    tweetsResponse: TweetReducers
});