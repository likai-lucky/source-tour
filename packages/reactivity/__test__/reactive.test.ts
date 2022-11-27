import { describe, it, expect } from 'vitest'

import { effect, reactive, shadowReactive } from '../src/index'


describe('响应式', () => {
    it('基本功能测试', () => {
        let obj = reactive({age: 1})
        let val
        effect(() => {
            val = obj.age
        })
        expect(val).toBe(1)
        obj.age++
        expect(val).toBe(2)
    })

    it('reactive支持嵌套', () => {
        let obj = reactive({age: 1, info: {name: 'lk'}})
        let val
        effect(() => {
            val = obj.info.name
        })
        expect(val).toBe('lk')
        obj.info.name = 'hello world'
        expect(val).toBe('hello world')
    })

    it('删除属性的响应式', () => {
        let obj = reactive({name: 'lk'})
        let val
        effect(() => {
            val = obj.name
        })
        expect(val).toBe('lk')
        delete obj.name
        expect(val).toBeUndefined()
    })
})

describe('浅层响应式', () => {
    it('浅层shadowReactive', () => {
        let obj = shadowReactive({age: 1, info: {name: 'lk'}})
        let val1
        let val2
        effect(() => {
            val1 = obj.age
        })
        effect(() => {
            val2 = obj.info.name
        })
        expect(val1).toBe(1)
        expect(val2).toBe('lk')
        obj.age++
        obj.info.name = 'James-harden'
        expect(val1).toBe(2)
        expect(val2).toBe('lk')
    })
})

describe('支持Set/Map', () => {
    it('Set', () => {
        let set = reactive(new Set([1]))
        let val
        effect(() => {
            val = set.size
        })
        expect(val).toBe(1)
        set.add(2)
        expect(val).toBe(2)
    })

    it('Set的delete', () => {
        let set = reactive(new Set([1, 2, 3]))
        let val
        effect(() => {
            val = set.size
        })
        expect(val).toBe(3)
        set.delete(2)
        expect(val).toBe(2)
    })

    it('Set的has', () => {
        let set = reactive(new Set([1, 2, 3]))
        expect(set.has(1)).toBe(true)
        set.delete(1)
        expect(set.has(1)).toBe(false)
    })
})