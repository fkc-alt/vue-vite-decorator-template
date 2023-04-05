/**
 * @module Controller
 * @param { string }
 * @auther kaichao.feng
 * @description Request Controller
 */
export const Controller = (prifix = ''): ClassDecorator => {
  return function (target: any) {
    target.prototype.prifix = prifix ? prifix.replace(/^\//g, '') + '/' : ''
  }
}
