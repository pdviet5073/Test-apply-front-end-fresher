import {
  GET_USER_LIST,
  GET_USER_DETAIL,
  GET_SOFT_LIST
} from '../constants';

export function getUserList(params) {
  return {
    type: GET_USER_LIST,
    payload: params,
  }
}
export function getUserDetail(params) {
  return {
    type: GET_USER_DETAIL,
    payload: params,
  }
}
export function getSoftList(params) {
  return {
    type: GET_SOFT_LIST,
    payload: params,
  }
}
