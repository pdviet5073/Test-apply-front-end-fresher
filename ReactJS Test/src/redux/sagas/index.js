import { fork } from 'redux-saga/effects';

import testSaga from './test.saga';



export default function* mySaga() {
  yield fork(testSaga);
  
}
