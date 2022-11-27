import { isObject, toRawType } from "@likai/utils";
import { track, trigget } from './index'

export const COL_KEY = Symbol('collection')

const enum TargetType {
    INVALID = 0,
    COMMON = 1, // 普通对象
    COLLECTION = 2, // set map
}

export const ReactiveFlags = {
    RAW: "__v_raw"
}

function targetTypeMap(type: string) {
    switch (type) {
        case 'Object':
        case 'Array':
            return TargetType.COMMON
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return TargetType.COLLECTION
        default:
            return TargetType.INVALID
    }
}

const baseHandlers = {
    get(target, key) {
        // let val = target[key]
        const val = Reflect.get(target, key)
        track(target, 'get', key)
        return isObject(val) ? reactive(val) : val
    },
    set(target, key, newVal) {
        target[key] = newVal
        let res = Reflect.set(target, key, newVal)
        trigget(target, 'set', key)
        // return true
        return res
    },
    deleteProperty(target, key) {
        let res = Reflect.deleteProperty(target, key)
        // delete target.key
        trigget(target, 'delete', key)
        return res
    },
}

const collectionHandlers = {
    get(target, key) {
        console.log('进这里了', target, key);
        // 获取原始值
        if(key === ReactiveFlags.RAW) return target

        if(key === 'size') {
            track(target, 'collection-size', COL_KEY)
            return Reflect.get(target, key)
        }


        return collectionActions[key]
    }
}

const collectionActions = {
    add(val) {
        const target = this[ReactiveFlags.RAW]
        const res = target.add(val)
        trigget(target, 'collection-add', COL_KEY)
        return res
    },
    delete(val) {
        const target = this[ReactiveFlags.RAW]
        const res = target.delete(val)
        trigget(target, 'collection-delete', COL_KEY)
        return res
    },
    has(val) {
        const target = this[ReactiveFlags.RAW]
        const res = target.has(val)
        trigget(target, 'collection-has', COL_KEY)
        return res
    }
}

export function reactive(obj: any) {
    const handlers = targetTypeMap(toRawType(obj)) === TargetType.COMMON ? baseHandlers : collectionHandlers
    return new Proxy(obj, handlers)
}