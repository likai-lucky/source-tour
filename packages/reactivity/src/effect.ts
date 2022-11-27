let weakMap = new WeakMap()
let activeEffect
let effectStack = []

function cleanup(activeEffect) {
    for (let i = 0; i < activeEffect.deps.length; i++) {
        activeEffect.deps[i].delete(activeEffect);
    }
    activeEffect.deps.length = 0
}

// effect函数依赖的key
// key依赖的effect
export function effect(fn) {
    const effectFn = () => {
        try {
            activeEffect = effectFn
            effectStack.push(activeEffect)
            cleanup(activeEffect)
            fn()
        } finally {
            effectStack.pop()
            activeEffect = effectStack[effectStack.length - 1]
        }
    }
    effectFn.deps = []
    effectFn()
    return effectFn
}

// let weakMap = { 
//     targetWeakMap: {
//         text: []
//     } 
// }
export function track(target, type, key) {
    if (!activeEffect) return
    let targetWeakMap = weakMap.get(target)
    if (!targetWeakMap) {
        weakMap.set(target, (targetWeakMap = new Map()))
    }

    let depsMap = targetWeakMap.get(key)
    if (!depsMap) {
        targetWeakMap.set(key, (depsMap = new Set()))
    }
    depsMap.add(activeEffect)
    activeEffect.deps.push(depsMap)
}

export function trigget(target, type, key) {
    let depsMap = weakMap.get(target)
    if (!depsMap) return
    let deps = depsMap.get(key)
    // deps && deps.forEach(fn => fn())
    if(deps) {
        const depsToRun = new Set(deps)
        depsToRun.forEach(effect => effect())
    }
}