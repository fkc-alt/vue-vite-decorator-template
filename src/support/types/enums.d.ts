export enum ModuleMetadata {
  IMPORTS = 'imports',
  PROVIDERS = 'providers',
  CONTROLLERS = 'controllers',
  EXPORTS = 'exports'
}

export enum MetadataKey {
  TYPE_METADATA = 'design:type',
  PARAMTYPES_METADATA = 'design:paramtypes',
  RETURNTYPE_METADATA = 'design:returntype',
  INJECTABLE_WATERMARK = '__injectable__',
  REQUEST_SERVICE = '__request__',
  GLOBAL = '__global__',
  ROUTE_ARGS_METADATA = '__routeArguments__',
  PARSE_INT_PIPE = '__parseIntPipe__',
  DEFAULT_VALUE_PIPE = '__defaultValuePipe__'
}

export enum Method {
  get = 'get',
  post = 'post',
  delete = 'delete',
  put = 'put',
  head = 'head',
  options = 'options',
  patch = 'patch',
  link = 'link',
  unlink = 'unlink',
  GET = 'GET',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'patch',
  PURGE = 'PURGE',
  LINK = 'LINK',
  UNLINK = 'UNLINK',
  HEAD = 'HEAD'
}

export enum RouteParamtypes {
  REQUEST,
  RESPONSE,
  NEXT,
  BODY,
  QUERY,
  PARAM,
  HEADERS,
  SESSION,
  FILE,
  FILES,
  HOST,
  IP
}
