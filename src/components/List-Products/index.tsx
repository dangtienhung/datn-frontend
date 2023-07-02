import React from 'react'
import { FaAngleDown } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineLine } from 'react-icons/ai';
type Props = {}

const ListProducts = (props: Props) => {
  return (
    <div className="grow rounded-sm ">
              <div className="category ">
                <div className="category-name flex items-center justify-between px-[20px] py-[16px]">
                  <div className="">Món nổi bật</div>
                  <div className="right">
                    <FaAngleDown />
                  </div>
                </div>

                <div className="list-product flex justify-between pb-[100px] flex-wrap">

                  <div className="product relative sidebar bg-[#fff] w-[32%] p-[15px] tracking-tight text-[14px]">
                    <img
                      className="align-middle w-[138px]"
                      src="https://tocotocotea.com/wp-content/uploads/2023/05/O-Long-Man-Chanh-Leo.jpg"
                      alt=""
                    />
                    <div className="product-name  mt-[20px] mb-[10px]">
                      Ô Long Mận Moc Chau Thach Hoa Que
                    </div>
                    <div className="product-price ">
                      <p className="product-origin-price text-[#8a733f] mb-[20px]">25,000đ</p>
                    </div>
                    <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white absolute right-[15px] bottom-[15px] flex justify-around items-center">
                      <AiOutlinePlus />
                    </div>
                  </div>

                  <div className="product relative sidebar bg-[#fff] w-[32%] p-[15px] tracking-tight text-[14px]">
                    <img
                      className="align-middle w-[138px]"
                      src="https://tocotocotea.com/wp-content/uploads/2023/05/O-Long-Man-Chanh-Leo.jpg"
                      alt=""
                    />
                    <div className="product-name  mt-[20px] mb-[10px]">
                      Ô Long Mận Moc Chau Thach Hoa Que
                    </div>
                    <div className="product-price ">
                      <p className="product-origin-price text-[#8a733f] mb-[20px]">25,000đ</p>
                    </div>
                    <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white absolute right-[15px] bottom-[15px] flex justify-around items-center">
                      <AiOutlinePlus />
                    </div>
                  </div>
                  
                  <div className="product relative sidebar bg-[#fff] w-[32%] p-[15px] tracking-tight text-[14px]">
                    <img
                      className="align-middle w-[138px]"
                      src="https://tocotocotea.com/wp-content/uploads/2023/05/O-Long-Man-Chanh-Leo.jpg"
                      alt=""
                    />
                    <div className="product-name  mt-[20px] mb-[10px]">
                      Ô Long Mận Moc Chau Thach Hoa Que
                    </div>
                    <div className="product-price ">
                      <p className="product-origin-price text-[#8a733f] mb-[20px]">25,000đ</p>
                    </div>
                    <div className="quantity w-[20px] h-[20px] bg-[#799dd9] rounded-full text-white absolute right-[15px] bottom-[15px] flex justify-around items-center">
                      <AiOutlinePlus />
                    </div>
                  </div>

                </div>
              </div>
            </div>
  )
}

export default ListProducts