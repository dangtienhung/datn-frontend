import { ICategory } from '../../interfaces/category.type';

interface SidebarCateProps {
  categories: ICategory[];
  onClick: (id: string) => void;
}

const SidebarCate = ({ categories, onClick }: SidebarCateProps) => {
  return (
    <div className="sidebar shrink-0 w-[300px] bg-[#fff] text-[14px] rounded-sm mx-[16px] pb-[12px] h-fit hidden lg:block">
      <div className="border border-transparent border-b-[#f1f1f1] uppercase px-4 py-2">
        Danh mục
      </div>
      <div className="px-[16px]">
        {categories &&
          categories?.length > 0 &&
          categories?.map((category: ICategory) => (
            <div
              onClick={() => onClick(category._id)}
              key={category._id}
              className="cursor-pointer hover: flex justify-between border border-transparent border-b-[#f1f1f1] py-[8px] last:border-none"
            >
              <div className="cat-name capitalize">{category.name}</div>
              <div className="cat-amount text-[#8a733f]">{category.products.length}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SidebarCate;
