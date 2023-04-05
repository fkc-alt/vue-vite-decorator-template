import { MetadataKey } from '../../types/enums'
/**
 *
 * @param type
 * @returns
 */
export const Type = (type: any): ((target: Core.Constructor<any>) => void) =>
  Reflect.metadata(MetadataKey.TYPE_METADATA, type)
export const ParamTypes = (
  ...type: any
): ((target: Core.Constructor<any>) => void) =>
  Reflect.metadata(MetadataKey.PARAMTYPES_METADATA, type)
export const ReturnType = (
  type: any
): ((target: Core.Constructor<any>) => void) =>
  Reflect.metadata(MetadataKey.RETURNTYPE_METADATA, type)
