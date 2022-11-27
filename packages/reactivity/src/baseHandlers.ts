import { isObject, toRawType } from "@likai/utils";
import { track, trigget } from './index'
import { reactive, ReactiveFlags } from './reactive'

function createGetter(isShadow: Boolean) {
    return function get(target, key) {
        if(key === ReactiveFlags.IS_REACTIVE) {            
            return true
        }
        const val = Reflect.get(target, key)
        track(target, 'get', key)
        if(isObject(val)) {
            return isShadow ? val : reactive(val)
        }
        return val
    }
}

function set(target, key, newVal) {
    target[key] = newVal
    let res = Reflect.set(target, key, newVal)
    trigget(target, 'set', key)
    return res
}

function deleteProperty(target, key) {
    let res = Reflect.deleteProperty(target, key)
    trigget(target, 'delete', key)
    return res
}

export const baseHandlers = {
    get: createGetter(false),
    set,
    deleteProperty,
}

export const shadowHandlers = {
    get: createGetter(true),
    set,
    deleteProperty,
}