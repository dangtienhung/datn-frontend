import React from 'react';
import { Link } from 'react-router-dom';
import { FaAngleDown, FaPhoneAlt, FaMapMarkerAlt, FaStickyNote, FaStore } from 'react-icons/fa';
import { BiSolidUser } from 'react-icons/bi';
import { Button, Input } from '../../components';
import CheckoutItem from '../../components/Checkout-Item';
import styles from './Checkout.module.scss';

type Props = {};

const Checkout = (props: Props) => {
  return (
    <div className="w-auto lg:w-[1200px] max-w-[1200px] my-0 mx-auto">
      <div className="detail flex justify-between mt-6 flex-col gap-y-10 lg:gap-y-0  lg:flex-row">
        <div className="left w-full lg:w-[60%]">
          <div className="title flex justify-between items-center px-5 mb-[7px] ">
            <div>
              <h2 className="font-bold text-sm">Thông tin giao hàng</h2>
            </div>
            <div className="text-[#adaeae]">
              <FaAngleDown />
            </div>
          </div>
          <div className="content shadow-[0_3px_10px_0_rgba(0,0,0,0.1)] px-5">
            <div className="py-[10px]">
              <Input prefix={<BiSolidUser />} placeholder="Tên người nhận" />
            </div>
            <div className="py-[10px]">
              <Input prefix={<FaPhoneAlt />} placeholder="Số điện thoại người nhận" />
            </div>
            <div className="location">
              <div className="title pt-[10px] text-sm">
                <h2>Giao đến</h2>
              </div>
              <div className="py-[10px]">
                <Input prefix={<FaMapMarkerAlt />} placeholder="Địa chỉ người nhận" />
              </div>
            </div>
            <div className="py-[10px]">
              <Input prefix={<FaStickyNote />} placeholder="Ghi chú địa chỉ..." />
            </div>
          </div>
          <div className=" mt-8">
            <div className="title mb-[7px] px-5">
              <h2 className="font-semibold text-sm">Phương thức thanh toán</h2>
            </div>
            <div className="shadow-[0_3px_10px_0_rgba(0,0,0,0.1)] bg-white p-5">
              <label className={` ${styles.container_radio} cod-payment block group`}>
                <span className="text-sm">Thanh toán khi nhận hàng</span>
                <input
                  className="opacity-0 absolute"
                  checked
                  type="radio"
                  name="type"
                  value="cold"
                />
                <span className={`${styles.checkmark_radio} group-hover:bg-[#ccc]`}></span>
              </label>
              <label className={` ${styles.container_radio} momo-payment block group`}>
                <span className="text-sm">Thanh toán qua Ví MoMo</span>
                <input className="opacity-0 absolute" type="radio" name="type" value="momo" />
                <span className={`${styles.checkmark_radio} group-hover:bg-[#ccc]`}></span>
              </label>
            </div>
          </div>
        </div>
        <div className="right w-full lg:w-[40%] lg:pl-4">
          <div className="title flex justify-between items-center px-5 mb-[7px] ">
            <div>
              <h2 className="font-bold text-sm">Thông tin đơn hàng</h2>
            </div>
            <div className="text-[#adaeae]">
              <FaAngleDown />
            </div>
          </div>
          <div className="content shadow-[0_3px_10px_0_rgba(0,0,0,0.1)] px-5 py-5">
            <div className="store pt-[14px] pb-[10px] border-transparent border border-b-[#f1f1f1]">
              <h3 className="text-sm">Chọn cửa hàng</h3>
              <div className="flex items-center justify-between cursor-pointer ">
                <div className="flex items-center gap-x-2">
                  <FaStore />
                  <span className="text-sm">Tocotoco - 93 Hoàng Công</span>
                </div>
                <div className="flex items-center gap-x-2">
                  <span className="text-sm">20.45km</span>
                  <FaAngleDown className="text-[#adaeae]" />
                </div>
              </div>
            </div>
            <div className="list">
              <CheckoutItem />
              <CheckoutItem />
            </div>
            <div className="pt-[10px] pb-[15px] flex items-center justify-between border-transparent border border-b-[#f1f1f1]">
              <div className="flex items-center  gap-x-4">
                <img className="w-[24px] max-w-[24px]" src="/icon-promotion.png" alt="" />
                <span className="text-sm">Mã khuyến mại</span>
              </div>
              <div className="">
                <Button size="medium" shape="circle">
                  Thêm khuyến mại
                </Button>
              </div>
            </div>
            <div className="py-[6px] border-transparent border border-b-[#f1f1f1]">
              <div className=" flex items-center justify-between">
                <div className="text-sm">
                  <p>
                    Số lượng cốc: <span className="font-bold">1</span> cốc
                  </p>
                </div>
                <div className="flex items-center text-sm py-1">
                  <span>Tổng: </span>
                  <span className="font-bold w-[80px] text-right">25.0000đ</span>
                </div>
              </div>
              <div className="flex justify-end text-sm py-1">
                <span>Phí vận chuyển: </span>
                <span className="w-[80px] text-right">117.000đ</span>
              </div>
              <div className="flex justify-end text-sm py-1">
                <span>Khuyến mãi: </span>
                <span className="w-[80px] text-right">0đ</span>
              </div>
              <div className="flex justify-end text-sm py-1">
                <span className="font-bold">Tổng cộng: </span>
                <span className="w-[80px] text-right text-[#86744e] font-bold">142.000đ</span>
              </div>
            </div>
            <div className="note">
              <textarea
                name=""
                id=""
                placeholder="Thêm ghi chú..."
                className="outline-none border-none text-sm w-full"
              ></textarea>
            </div>
            <div className="">
              <Button type="checkout" size="large" shape="circle">
                Đặt hàng
              </Button>
              <Link to="/">
                <Button type="keep-buying" size="large" shape="circle">
                  Tiếp tục mua hàng
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
