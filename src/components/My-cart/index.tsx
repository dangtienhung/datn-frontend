import CardOrder from '../Card-Order';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useAppSelector } from '../../store/hooks';
import { formatCurrency } from '../../utils/formatCurrency';
import { v4 as uuidv4 } from 'uuid';

const MyCart = () => {
  const { items, total } = useAppSelector((state: RootState) => state.persistedReducer.cart);
  return (
    <div className="sidebar shrink-0 w-[300px] bg-[#fff] text-[14px] rounded-sm mx-[16px] pb-[12px] h-fit hidden lg:block">
      <div className="border border-transparent border-b-[#f1f1f1]  px-4 py-2 flex justify-between items-center">
        <div className="uppercase">Giỏ hàng của tôi</div>
        <div className="text-[11px] cursor-pointer ">Xoá tất cả</div>
      </div>

      <div className="mx-[16px]">
        {items.length > 0 && items.map((item) => <CardOrder key={uuidv4()} product={item} />)}
        <div className="cart ">
          <div className="flex items-center justify-start my-5 cart-ss2">
            <img className="img-toco h-[40px] pr-2" src="/icon-glass-tea.png" />
            <span className="pr-2 cart-ss2-one">x</span>
            <span className="cart-ss2-two pr-2 text-[#8a733f]">1</span>
            <span className="pr-2 cart-ss2-three">=</span>
            <span className="cart-ss2-four text-[#8a733f]">{formatCurrency(total)}</span>
          </div>
          <div className="cart-ss3">
            <Link to="checkout">
              <button className="bg-[#d8b979] text-white text-center rounded-xl py-1 w-full">
                Thanh toán
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;
