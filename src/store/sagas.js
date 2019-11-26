import { all } from "redux-saga/effects";
import customSaga from "./custom/sagas";

export default function* rootSaga() {
    console.log("customSaga 2", customSaga);
    yield all([...customSaga]);
}