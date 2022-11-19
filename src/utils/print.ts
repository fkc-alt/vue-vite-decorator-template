/**
 * 打印网页指定DOM方法
 * @module print
 * @author Feng kaichao
 * @method open
 * @param { Object } options 设置打印的功能
 * @returns { File }
 */

/**
  * @param { el } String 要打印的dom元素 默认为空
  * @param { stylesheet } String 外部样式表的URL地址 默认为空  使用时需要 require 引入
  * @param { landscape } Boolean 横纵向打印 默认纵向打印
  * @param { noPrintSelector } String 不想打印的元素的类选择器  默认为.no-print
  * @param { append } String 将内容添加到打印内容的后面  默认为空
  * @param { prepend } String 将内容添加到打印内容的前面 默认为空
  * @param { hidden } Boolean 隐藏页头页脚  默认隐藏
  */
const defaults = {
  el: '',
  stylesheet: '',
  landscape: false,
  noPrintSelector: '.no-print',
  append: '',
  prepend: '',
  hidden: false
}
type defaultsType = Partial<Omit<typeof defaults, 'el'> & Pick<typeof defaults, 'el'>>
export const open = (options: defaultsType): void => {
  options = Object.assign(defaults, options)
  if ((options.el as string).length === 0) return
  // 获取打印区域的dom
  const el = document.getElementById(options.el as string)
  // 创建iframe
  const iframe = document.createElement('IFRAME') as HTMLIFrameElement
  iframe.id = 'print-iframe'
  iframe.setAttribute('style', 'display:none;width:100%;')
  document.body.appendChild(iframe)
  let styleStr = `
      <style media="print">
        @page {
            size: ${options.landscape as boolean ? 'landscape' : 'portrait'};
            ${options.hidden as boolean ? '' : 'margin:5mm'};
        }
        ${options.noPrintSelector as string} {
            display:none;
        }
      </style>
    `
  // 获取style样式
  const styles = document.querySelectorAll('style, link')
  styles.forEach(el => {
    styleStr += el.outerHTML
  })
  // 写入iframe
  const contentWindow = iframe.contentWindow as WindowProxy
  const doc = contentWindow.document
  if ((options.stylesheet as string).length > 0) doc.write(`<link rel="stylesheet" href="${options.stylesheet as string}" />`)
  doc.write(`
      <html>
        <head>
          ${styleStr}
        </head>
        <body>
          ${options.prepend as string}
          <div>${(el as HTMLElement).innerHTML}</div>
          ${options.append as string}
        </body>
      </html>
    `)
  doc.close()
  contentWindow.focus()
  contentWindow.print()
  document.body.removeChild(iframe)
}
