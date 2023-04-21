import { v4 as uuidv4 } from 'uuid'
import ContentTypeService from '@/service/common/providers/contentType.service'
import {
  Catch,
  Header,
  Post,
  UseInterceptorsReq,
  applyDecorators
} from '@/support/core'
import { RouteChildren } from '../..'
import { catchCallback } from '../catch/catch-callback'
import { validationErrorMessage } from '../validation/validate'

export const GetArticleListApplyDecorators = () => {
  return applyDecorators(
    Catch(catchCallback),
    Header('RequestId', () => uuidv4()),
    Header('Content-Type', ContentTypeService.JSON),
    Post(RouteChildren.GETARTICLELIST, validationErrorMessage),
    UseInterceptorsReq(
      configure => {
        configure.headers &&
          (configure.headers['Route-Path'] = 'GetArticleList')
        return configure
      },
      configure => {
        console.log(configure, 'last')
        return configure
      }
    )
  )
}

export const GetTableDataApplyDecorators = () => {
  return applyDecorators(
    Header('RequestId', () => uuidv4()),
    Header(RouteChildren.TABLEDATA, RouteChildren.TABLEDATA),
    Catch(catchCallback),
    Post(RouteChildren.TABLEDATA)
  )
}
