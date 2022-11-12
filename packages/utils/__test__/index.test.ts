import { describe, expect, it } from 'vitest'
import { isObject, isOn } from '../src'

describe('测试工具库', () => {
  it('测试isObject', () => {
    expect(1 + 1).toBe(2)
    expect(isObject({})).toBe(true)
    expect(isObject(1)).toBe(false)
    expect(isObject(null)).toBe(false)
  })
  it('测试isOn', () => {
    expect(isOn('onClick')).toBe(true)
    expect(isOn('click')).toBe(false)
  })
})
