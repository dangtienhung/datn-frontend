import { ListProducts, MyCart, SidebarCate } from '../../components';
import { getAllCates, getOneCate } from '../../store/services/categories';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { RootState } from '../../store/store';
import { getAllProducts } from '../../store/services/product.service';
import { useEffect } from 'react';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const { category, products } = useAppSelector((state: RootState) => state.persistedReducer);
  useEffect(() => {
    dispatch(getAllCates());
    dispatch(getAllProducts());
  }, []);
  const handleCallApiCategory = async (id?: string) => {
    if (id) {
      dispatch(getOneCate(id));
    } else {
      dispatch(getAllProducts());
    }
  };
  return (
    <div>
      <div className="bg-[#fbfbfb]">
        <div className="container pt-3 mx-auto">
          <div className="content md:flex-row flex flex-col justify-between">
            <SidebarCate categories={category.categories} onClick={handleCallApiCategory} />
            <ListProducts categoryItem={category.category} products={products.products} />
            <MyCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
