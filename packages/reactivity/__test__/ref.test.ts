import { describe, it, expect } from 'vitest'

import { effect, ref } from '../src/index'

describe('响应式', () => {
    it('ref', () => {
        let num = ref(1)        
        let val
        effect(() => {
            val = num.value
        })
        expect(val).toBe(1)
        num.value++
        expect(val).toBe(2)
    })

    it('ref支持复杂数据类型', () => {
        let num = ref({count: 1})        
        let val
        effect(() => {
            val = num.value.count
        })
        expect(val).toBe(1)
        num.value.count++
        expect(val).toBe(2)
    })
    
})