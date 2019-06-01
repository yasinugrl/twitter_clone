import {  ADD_TWEET_START,
    ADD_TWEET_SUCCESS,
    ADD_TWEET_FAILD,  
  
    GET_TWEET_START,
    GET_TWEET_SUCCESS,
    GET_TWEET_FAILD,

    GET_USER_TWEET_START,
    GET_USER_TWEET_SUCCESS,
    GET_USER_TWEET_FAILD
  } from '../actions/types'; 

const INITIAL_STATE = {
    loading: false,
    tweets: []
  };
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case ADD_TWEET_START, GET_TWEET_START, GET_USER_TWEET_START:
          return { ...state, loading: true
        };
        case ADD_TWEET_SUCCESS:
            return { ...state, loading: false, tweets: [action.payload, ...state.tweets]
          };
          case ADD_TWEET_FAILD, GET_TWEET_FAILD, GET_USER_TWEET_FAILD:
            return { ...state, loading: false
          };

          case GET_TWEET_SUCCESS:
            return { ...state, loading: false, tweets: action.payload
          };

          case GET_USER_TWEET_SUCCESS:
            return { ...state, loading: false, user_tweets: action.payload
          };
    default:
        return state;
    }
  };