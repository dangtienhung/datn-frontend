import { ListProducts, MyCart, SidebarCate } from '../../components';
import { useEffect, useState } from 'react';

import { ICategory } from '../../interfaces/category.type';
import http from '../../api/instance';

const ProductsPage = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [products, setProducts] = useState<ICategory>({} as ICategory);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        /* gọi api categories */
        const response = await http.get('/categories?_page=1');
        const categories = response.data;
        /* set categories thành 1 mảng */
        setCategories(categories.docs);
        /* khi người dùng chưa click vào danh mục thì sẽ sét mặc định cho nó là category 0 */
        setProducts(categories.docs[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCategories();
  }, []);
  /* onCLick */
  const handleCallApiCategory = async (id: string) => {
    try {
      /* gọi api categories theo id */
      const response = await http.get(`/category/${id}`);
      const categories = response.data;
      setProducts(categories.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {/* <Header /> */}
      <div className="bg-[#fbfbfb]">
        <div className="container pt-3 mx-auto">
          <div className="content md:flex-row flex flex-col justify-between">
            <SidebarCate categories={categories} onClick={handleCallApiCategory} />
            <ListProducts products={products} />
            <MyCart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
