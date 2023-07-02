import React from 'react';

type Props = {};

const SidebarCate = (props: Props) => {
  return (
    <div className="sidebar shrink-0 w-[300px] bg-[#fff] text-[14px]  rounded-sm mx-[16px] pb-[12px] h-fit">
      <div className="border border-transparent border-b-[#f1f1f1] uppercase px-4 py-2">
        Danh mục
      </div>
      <div className="px-[16px]">
        <div className="flex justify-between border border-transparent border-b-[#f1f1f1] py-[8px] last:border-none">
          <div className="cat-name ">Món nổi bật</div>
          <div className="cat-amount text-[#8a733f]">17</div>
        </div>
        <div className="flex justify-between border border-transparent border-b-[#f1f1f1] py-[8px] last:border-none">
          <div className="cat-name ">Trà sữa</div>
          <div className="cat-amount text-[#8a733f]">17</div>
        </div>
        <div className="flex justify-between border border-transparent border-b-[#f1f1f1] py-[8px] last:border-none">
          <div className="cat-name ">Trà tranh</div>
          <div className="cat-amount text-[#8a733f]">17</div>
        </div>
        <div className="flex justify-between border border-transparent border-b-[#f1f1f1] py-[8px] last:border-none">
          <div className="cat-name ">Sữa chua dẻo</div>
          <div className="cat-amount text-[#8a733f]">17</div>
        </div>
      </div>
    </div>
  );
};

export default SidebarCate;
