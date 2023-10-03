declare namespace Service {
  namespace Product {
    interface PropertyItem {
      /**
       * @description 属性名
       * THUMBNAIL：缩略图
       * CAROUSEL_IMAGE：轮播图
       * DETAIL_IMAGE：详情图
       */
      name: import('~@/typings/enums/product').Enums.ImageType
      /**
       * @description 排序值
       */
      sortValue: number
      value: string
    }
    interface AddPropertiesReq extends PropertyItem {
      /**
       * @description 名称
       */
      name: string
      /**
       * @description 商品id
       */
      productId: number
    }
    type AddPropertiesRes = boolean
    interface DelPropertiesReq {
      id: number
    }
    interface UpdatePropertiesReq extends DelPropertiesReq {
      sortValue: number
    }
    type UpdatePropertiesRes = boolean
    type DelPropertiesRes = boolean
    interface ProductListReq extends Services.Common.Pagination {
      categoryId?: number
      groupId?: number
      name?: string
    }
    interface ProductListItem {
      categoryId?: number
      createAt?: null
      description?: string
      groupId?: number
      id?: number
      isDeleted?: string
      name?: string
      sortValue?: number
      updateAt?: string
    }
    interface ProductListRes extends Services.Common.Pagination {
      total: number
      offset: number
      item: PropertiesListItem[]
    }
    interface ProductAddReq {
      /**
       * @description 分类id
       */
      categoryId?: number
      /**
       * @description 描述
       */
      description: string
      /**
       * 分组id
       */
      groupId?: number
      /**
       * @description 商品名称
       */
      name: string
      properties: Property[]
      /**
       * @description 排序值
       */
      sortValue: number
    }
    type ProductUpdateReq = Omit<ProductAddReq, 'properties'> & ProductDeleteReq
    type ProductUpdateRes = boolean
    type ProductAddRes = boolean
    interface ProductDeleteReq {
      id: number
    }
    type ProductDeleteRes = boolean
    type ProductDetailReq = ProductDeleteReq
    type ProductDetailRes = ProductUpdateReq & {
      updateAt: string
      createAt: string
    }
    interface PropertiesListReq {
      productId: number
    }
    interface PropertiesListRes {
      [(K in 'THUMBNAIL') | 'CAROUSEL_IMAGE' | 'DETAIL_IMAGE']: Property[]
    }
    interface AddCategoryReq {
      /**
       * @description 分类名称
       */
      name: string
      /**
       * @description 描述信息
       */
      msg?: string
    }
    type AddCategoryRes = boolean
    interface UpdateCategoryReq extends AddCategoryReq {
      id: number
    }
    type CategoryListReq = Partial<Pick<AddCategoryReq, 'name'>> &
      Services.Common.Pagination
    type CategoryListRes = any
    type UpdateCategoryRes = boolean
    type DelCategoryReq = Pick<UpdateCategoryReq, 'id'>
    type DelCategoryRes = boolean
    interface AddGroupReq {
      name: string
      sortValue: number
    }
    type AddGroupRes = boolean
    interface UpdateGroupReq extends AddGroupReq {
      id: number
    }
    type UpdateGroupRes = boolean
    type DelGroupReq = Pick<UpdateGroupReq, 'id'>
    type DelGroupRes = boolean
    type GroupListReq = Partial<Pick<AddCategoryReq, 'name'>> &
      Services.Common.Pagination
    type GroupListRes = any
    interface AddSpceReq {
      /**
       * 原价, 单位：分
       */
      originalAmount: number
      /**
       * 规格父id
       */
      pid?: number
      /**
       * 商品id
       */
      productId: number
      /**
       * 上架库存
       */
      shelvesStock: number
      /**
       * 规格名称
       */
      specsName: string
      /**
       * 总库存
       */
      totalStock: number
    }
    type AddSpceRes = boolean
    interface UpdateSpceReq extends AddSpceReq {
      id: number
    }
    type UpdateSpceRes = boolean
    type DelSpceReq = Pick<UpdateSpceReq, 'id'>
    type DelSpceRes = boolean
    interface SpceListReq extends Services.Common.Pagination {
      groupId?: number
      name?: string
      categoryId?: number
    }
    interface SpceListItem {
      id: number
      categoryId: number
      groupId: number
      name: number
      description: string
      sortValue: number
      createAt: string
      updateAt: string
      specsList: SpceChildListItem[]
    }
    interface SpceListRes extends Services.Common.Pagination {
      total: number
      offset: number
      item: SpceListItem[]
    }
    interface SpceChildListItem {
      id: number
      skuId: string
      productId: number
      pid: number | null
      specsName: string
      originalAmount: number
      originalAmountStr: string
      totalStock: number
      shelvesStock: number
      sortValue: number
      isShelves: string
      isDeleted: string
      createAt: string
      updateAt: string
      children: SpceChildListItem[]
    }
    interface SpceShelveReq {
      id: number
    }
    type SpceOffShelveReq = SpceShelveReq
    type SpceOffShelveRes = boolean
    type SpceShelveRes = boolean
    type SpceOffShelveBatchReq = SpceShelveReq
    type SpceOffShelveBatchRes = boolean
    type SpceShelveBatchReq = SpceShelveReq
    type SpceShelveBatchRes = boolean
  }
}
