import { isObject } from '@likai/utils'

const res = isObject({})
console.log(res)

export { effect, track, trigget } from "./effect";
export { reactive, shadowReactive, isReactive } from "./reactive";
export { ref, isRef } from "./ref";
