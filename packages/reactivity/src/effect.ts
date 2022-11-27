let weakMap = new WeakMap()
let activeEffect
let effectStack = []

export function effect(fn) {
    activeEffect = fn
    effectStack.push(activeEffect)
    fn()
    effectStack.pop()
    activeEffect = effectStack[effectStack.length - 1]
}

// let weakMap = { 
//     targetWeakMap: {
//         text: []
//     } 
// }
export function track(target, type, key) {
    if(!activeEffect) return
    let targetWeakMap = weakMap.get(target)
    if(!targetWeakMap) {
        weakMap.set(target, (targetWeakMap = new Map()))
    }

    let depsMap = targetWeakMap.get(key)
    if(!depsMap) {
        targetWeakMap.set(key, (depsMap = new Set()))
    }
    depsMap.add(activeEffect)
}

export function trigget(target, type, key) {
    let depsMap = weakMap.get(target)
    if(!depsMap) return
    let deps = depsMap.get(key)    
    deps && deps.forEach(fn => fn())
}