import { isObject } from '@likai/utils'

const res = isObject({})
console.log(res)

export { effect, track, trigget } from "./effect";
export { reactive } from "./reactive";
export { ref } from "./ref";
