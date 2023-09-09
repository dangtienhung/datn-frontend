import { MyCart, SidebarCate } from '../../components'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { RootState } from '../../store/store'
import { getAllCates } from '../../store/services/categories'
import { useEffect } from 'react'

const ProductsPage = () => {
  const dispatch = useAppDispatch()

  const {
    categories,
    error: errorCategories,
    isLoading: isLoadingCategories
  } = useAppSelector((state: RootState) => state.persistedReducer.category)
  useEffect(() => {
    dispatch(getAllCates({ _page: 1, _limit: 10 }))
  }, [dispatch])
  return (
    <div>
      <div className='bg-[#fbfbfb]'>
        <div className='container pt-3 mx-auto'>
          <div className='content md:flex-row flex flex-col justify-between'>
            <SidebarCate categories={categories} error={errorCategories} isLoading={isLoadingCategories} />
            {/*<ListProducts categoryName={category.nameCate} products={products.products} /> */}
            <MyCart />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
