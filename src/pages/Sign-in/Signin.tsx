import { Button, Input } from '../../components';
import { Link } from 'react-router-dom';
type Props = {};

const Signin = (props: Props) => {
  return (
    <div className="background-container">
      <div className="h-full flex justify-center items-center">
        <div className="content background-content bg-white w-[500px] h-[600px] px-[100px] py-6 flex justify-center items-center flex-col rounded">
          <div className="logo">
            <img src="/logo.png" alt="" className="w-[200px] mb-5" />
          </div>
          <form action="" className="flex flex-col">
            <Input type="auth" placeholder="Nhập số điện thoại của bạn" />
            <Input type="auth" placeholder="Nhập mật khẩu của bạn" />
            <div className="text-right mt-4 font-bold text-[#d4b774] text-sm">Quên mật khẩu?</div>
            <Button type="auth" size="large" shape="circle">
              Đăng nhập
            </Button>
            <div className="flex gap-x-2 justify-center items-center my-5 text-sm">
              <div>Bạn chưa có tài khoản?</div>
              <div className="font-semibold text-[#d4b774]">
                <Link to="/signup">Tạo tài khoản</Link>
              </div>
            </div>
          </form>
          <div>
            <Link to="/" className="text-sm text-[#007bff] hover:underline">
              Quay lại màn hình chính
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
