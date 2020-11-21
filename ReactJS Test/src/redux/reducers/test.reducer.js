import {
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAIL,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAIL,
  GET_SOFT_LIST_SUCCESS,
  GET_SOFT_LIST_FAIL

} from '../constants';

const initialState = {
  userList: [],
  userDetail:[],
  softList:[]
};

export default function testReducer(state = initialState, action) {
 
  switch (action.type) {
    case GET_USER_LIST_SUCCESS: {
      return {
        ...state,
        userList: [
          ...action.payload,
        ],
      }
    }
    case GET_USER_LIST_FAIL: {
      return state;
    }
    case GET_USER_DETAIL_SUCCESS: {
      return {
        ...state,
        userDetail: [
          ...action.payload,
        ],
      }
    }
    case GET_USER_DETAIL_FAIL: {
      return state;
    }
    case GET_SOFT_LIST_SUCCESS: {
      return {
        ...state,
        softList: [
          ...action.payload,
        ],
      }
    }
    case GET_SOFT_LIST_FAIL: {
      return state;
    }
    default: {
      return state;
    }
}
}
