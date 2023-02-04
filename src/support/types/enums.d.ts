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
  ROUTE_ARGS_METADATA = '__routeArguments__'
}

export enum Method {
  get = 'get',
  post = 'post',
  delete = 'delete',
  put = 'put',
  head = 'head',
  options = 'options',
  patch = 'patch',
  patch = 'patch',
  link = 'link',
  unlink = 'unlink',
  GET = 'GET',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PUT = 'PUT',
  PURGE = 'PURGE',
  LINK = 'LINK',
  UNLINK = 'UNLINK',
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
  IP,
}
