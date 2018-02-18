import { sagaRouter } from './router.saga';
import { handleFilterUpdate } from './filter.saga'

export default function* rootSaga() {
    yield [
        sagaRouter(),
        handleFilterUpdate()
    ]
}