import { Core } from './types/core'

export const MODULE_METADATA = {
  IMPORTS: 'imports',
  PROVIDERS: 'providers',
  CONTROLLERS: 'controllers',
  EXPORTS: 'exports'
}

export const TYPE_METADATA = 'design:type'
export const PARAMTYPES_METADATA = 'design:paramtypes'
export const RETURNTYPE_METADATA = 'design:returntype'
export const INJECTABLE_WATERMARK = '__injectable__'
export const REQUEST_SERVICE = '__request__'

export const Type = (type: any): (target: Core.Constructor<any>) => void => Reflect.metadata(TYPE_METADATA, type)
export const ParamTypes = (...type: any): (target: Core.Constructor<any>) => void => Reflect.metadata(PARAMTYPES_METADATA, type)
export const ReturnType = (type: any): (target: Core.Constructor<any>) => void => Reflect.metadata(RETURNTYPE_METADATA, type)
