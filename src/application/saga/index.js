import { sagaRouter } from './router.saga';

export default function* rootSaga() {
    yield [
        sagaRouter()
    ]
}