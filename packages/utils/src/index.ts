export function isObject(val: any) {
  return typeof val === 'object' && val !== null
}
export function isOn(key: string) {
  return key[0] === 'o' && key[1] === 'n'
}
export function toRawType(key: any) {
  return Object.prototype.toString.call(key).slice(8,-1)
}
