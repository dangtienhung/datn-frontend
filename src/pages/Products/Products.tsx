import { ListProducts, MyCart, SidebarCate } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { RootState } from '../../store/store'
import { getAllCates } from '../../store/services/categories'
import { useEffect } from 'react'
import useQueryConfig from '../../hook/useQueryConfig'

const ProductsPage = () => {
  const dispatch = useAppDispatch()
  const queryConfig = useQueryConfig()

  const {
    categories,
    error: errorCategories,
    isLoading: isLoadingCategories
  } = useAppSelector((state: RootState) => state.persistedReducer.category)
  const {
    products: ProductList,
    error: errorProduct,
    isLoading: isLoadingProduct
  } = useAppSelector((state: RootState) => state.persistedReducer.products)
  useEffect(() => {
    dispatch(getAllCates({ _page: queryConfig._page, _limit: queryConfig.limit }))
  }, [dispatch, queryConfig.limit, queryConfig._page])
  return (
    <div>
      <div className='bg-[#fbfbfb]'>
        <div className='container pt-3 mx-auto'>
          <div className='content md:flex-row flex flex-col justify-between'>
            <SidebarCate
              queryConfig={queryConfig}
              categories={categories}
              error={errorCategories}
              isLoading={isLoadingCategories}
            />
            <ListProducts
              queryConfig={queryConfig}
              products={ProductList}
              error={errorProduct}
              isLoading={isLoadingProduct}
            />
            <MyCart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
