import {makeObservable} from "mobx";

class _AppStore {
    constructor() {
        makeObservable(this)
    }
}

const AppStore = new _AppStore()
export default AppStore
