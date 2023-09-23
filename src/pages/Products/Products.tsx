import { ListProducts, MyCart, SidebarCate } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { RootState } from '../../store/store'
// import { getAllCates } from '../../store/services/categories'
import { useEffect } from 'react'
import useQueryConfig from '../../hook/useQueryConfig'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { useGetAllCategoryQuery } from '../../api/category'

const ProductsPage = () => {
  // const dispatch = useAppDispatch()
  const queryConfig = useQueryConfig()
  const navigate = useNavigate()
  // const {
  //   categories,
  //   error: errorCategories,
  //   isLoading: isLoadingCategories
  // } = useAppSelector((state: RootState) => state.persistedReducer.category)
  const { data: datacate, error: errorCategories, isLoading: isLoadingCategories } = useGetAllCategoryQuery()
  const categories = datacate?.docs
  const {
    products: ProductList,
    error: errorProduct,
    isLoading: isLoadingProduct
  } = useAppSelector((state: RootState) => state.persistedReducer.products)
  // useEffect(() => {
  //   dispatch(getAllCates({ _page: queryConfig._page, _limit: queryConfig.limit }))
  // }, [dispatch, queryConfig.limit, queryConfig._page])

  useEffect(() => {
    if (queryConfig.searchName != '' && ProductList?.docs?.length == 0) {
      const id = setTimeout(() => {
        navigate({
          pathname: '/products',
          search: createSearchParams({
            ...queryConfig,
            searchName: ''
          }).toString()
        })
      }, 1000)
      return () => {
        clearTimeout(id)
      }
    }
  })
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
