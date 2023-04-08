import { flattenErrorList } from '@/support/helper'
import { ValidationError } from 'class-validator'
import { ElMessage } from 'element-plus'

export const validationErrorMessage = (validationError: ValidationError[]) => {
  const messages = flattenErrorList(validationError)
  console.log(validationError, 'validationError', messages)
  ElMessage.error({
    dangerouslyUseHTMLString: true,
    message: `Customer validationError Message<br/>
        ${messages.map(message => `${message}<br/>`).join('')}`,
    duration: 5 * 1000
  })
  return validationError
}
