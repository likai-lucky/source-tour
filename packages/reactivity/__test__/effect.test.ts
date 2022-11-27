import { describe, it, expect, vi } from 'vitest'

import { effect, reactive, ref } from '../src/index'

describe('effect', () => {
    it('嵌套effect', () => {
        let data = {foo: 1, bar: 2}
        let obj = reactive(data)
        let temp1, temp2
        let fn1 = vi.fn(() => {
            console.log(13);
            
        }) // 可以知道fn1被调用了多少次
        let fn2 = vi.fn(() => {
            console.log(12);
            
        })
        effect(() => {
            fn1()
            effect(() => {
                console.log('执行我了');
                fn2()
                temp2 = obj.bar
            })
            temp1 = obj.foo
        })
        expect(fn1).toBeCalledTimes(1)
        expect(fn2).toBeCalledTimes(1)
        expect(temp1).toBe(1)
        expect(temp2).toBe(2)

        // 这里还有问题，执行外层effect会触发里层effect？
        obj.foo = 3
        // obj.bar = 4
        expect(fn1).toBeCalledTimes(2)
        // expect(fn2).toBeCalledTimes(1)
    })

    
})