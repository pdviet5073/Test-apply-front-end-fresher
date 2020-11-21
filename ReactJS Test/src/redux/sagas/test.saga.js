import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  GET_USER_LIST,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAIL,
  GET_USER_DETAIL,
  GET_USER_DETAIL_SUCCESS,
  GET_USER_DETAIL_FAIL,
  GET_SOFT_LIST,
  GET_SOFT_LIST_SUCCESS,
  GET_SOFT_LIST_FAIL
} from "../constants";

const apiUrl = "https://jsonplaceholder.typicode.com";


function* getUserList(action){
  try {
    const { page, limit,userId,postId    } = action.payload;
    const response = yield axios({
      method: 'GET',
      url: `${apiUrl}/${userId  ? "todos" :(postId ? "comments" : "users")}`,
      params: {
        _page: page,
        _limit: limit,
        ...userId &&{userId:userId},
        ...postId &&{postId:postId}
      }
    });
    const data = response.data;
    yield put({
      type: GET_USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_USER_LIST_FAIL,
      payload: error,
    });
  }
}
function* getUserDetail(action){
  try {
    const { id } = action.payload;
    const responseUser = yield axios.get(`${apiUrl}/users?id=${id}`);
    const responseTodo = yield axios.get(`${apiUrl}/todos?userId=${id}`);
    const responsePhoto = yield axios.get(`${apiUrl}/photos?albumId=${id}`);
    const responseComment = yield axios.get(`${apiUrl}/comments?postId=${id}`);

    const dataUser = responseUser.data;
    const dataTodo = responseTodo.data;
    const dataPhoto = responsePhoto.data;
    const dataComment = responseComment.data;
    const data = [...dataUser,...dataTodo,...dataPhoto,...dataComment]

    yield put({
      type: GET_USER_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_USER_DETAIL_FAIL,
      payload: error,
    });
  }
}
function* getSoftList(action){
  try {
    const { status, id } = action.payload;
    const response = yield axios({
      method: 'GET',
      url: `${apiUrl}/todos`,
      params: {
        userId:id,
        completed:status
      }
    });

    const data = response.data;
 

    yield put({
      type: GET_SOFT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_SOFT_LIST_FAIL,
      payload: error,
    });
  }
}
export default function* testSaga() {
  yield takeEvery(GET_USER_LIST, getUserList);
  yield takeEvery(GET_USER_DETAIL, getUserDetail);
  yield takeEvery(GET_SOFT_LIST, getSoftList);


}
