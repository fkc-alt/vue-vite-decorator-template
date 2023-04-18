/* eslint-disable @typescript-eslint/restrict-template-expressions */
/**
 * @module Controller
 * @param { string } prefix
 * @auther kaichao.feng
 * @description Request Controller
 */
export const Controller = (prefix = ''): ClassDecorator => {
  return function (target: any) {
    const currentRouteId = `${target.name}-Prefix`
    target.prototype[currentRouteId] = prefix
      ? prefix.replace(/^\//g, '') + '/'
      : ''
  }
}
