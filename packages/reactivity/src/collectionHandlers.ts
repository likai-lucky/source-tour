import { isObject, toRawType } from "@likai/utils";
import { track, trigget } from './index'
import { ReactiveFlags, COL_KEY } from './reactive'

export const collectionHandlers = {
    get(target, key) {
        console.log('进这里了', target, key);
        // 获取原始值
        if (key === ReactiveFlags.RAW) return target

        if (key === 'size') {
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