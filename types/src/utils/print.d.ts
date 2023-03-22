/**
 * 打印网页指定DOM方法
 * @module print
 * @author Feng kaichao
 * @method open
 * @param { Object } options 设置打印的功能
 * @returns { File }
 */
/**
  * @param { String } el 要打印的dom元素 默认为空
  * @param { String } stylesheet 外部样式表的URL地址 默认为空  使用时需要 require 引入
  * @param { Boolean } landscape 横纵向打印 默认纵向打印
  * @param { String } noPrintSelector 不想打印的元素的类选择器  默认为.no-print
  * @param { String } append 将内容添加到打印内容的后面  默认为空
  * @param { String } prepend 将内容添加到打印内容的前面 默认为空
  * @param { Boolean } hidden 隐藏页头页脚  默认隐藏
  */
declare const defaults: {
  el: string
  stylesheet: string
  landscape: boolean
  noPrintSelector: string
  append: string
  prepend: string
  hidden: boolean
}
export declare const customPrint: (options: Partial<typeof defaults>) => void
export {}
