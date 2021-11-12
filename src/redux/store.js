import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/authReducer';
import thunk from 'redux-thunk';
import { channelVideosReducer, homeVideosReducer, relatedVideosReducer, searchVideosReducer, selectedVideoReducer } from './reducers/videoReducer';
import { channelDetailsReducer } from './reducers/channelReducer';
import { commentsListReducer } from './reducers/commentsReducer';
import { subscribedChannelsReducer } from './reducers/subscriptionsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    homeVideos: homeVideosReducer,
    selectedVideo: selectedVideoReducer,
    channelDetails: channelDetailsReducer,
    commentsList: commentsListReducer,
    relatedVideos: relatedVideosReducer,
    searchVideos: searchVideosReducer,
    subscribedChannels: subscribedChannelsReducer,
    channelVideos: channelVideosReducer
});

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunk)));

export default store;