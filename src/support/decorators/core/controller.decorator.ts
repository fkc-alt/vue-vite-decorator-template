/**
 * @module Controller
 * @param { string }
 * @auther kaichao.feng
 * @description Request Controller
 */
export const Controller = (prefix = ''): ClassDecorator => {
  return function (target: any) {
    target.prototype.prefix = prefix ? prefix.replace(/^\//g, '') + '/' : ''
  }
}
