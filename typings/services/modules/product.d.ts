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
    type DelPropertiesRes = boolean
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
    type ProductAddRes = boolean
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
  }
}
