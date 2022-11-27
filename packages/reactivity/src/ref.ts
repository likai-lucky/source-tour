import { isObject } from "@likai/utils";
import { track, trigget } from './effect'
import { reactive, ReactiveFlags } from './reactive'

export function isRef(val: any) {
    return val.isRef
}

export function ref(val) {
    return new RefImpl(val)
}

class RefImpl {
    isRef: boolean
    _val: any
    constructor(val) {
        this.isRef = true
        this._val = convert(val)
    }
    get value() {
        track(this, 'ref-get', 'value')
        return this._val
    }
    set value(newVal) {
        if(newVal !== this._val) {
            this._val = newVal
            trigget(this, 'ref-set', 'value')
        }
    }
}

// let a = new RefImpl()
// a.value   会触发get函数

function convert(val) {
    return isObject(val) ? reactive(val) : val
}