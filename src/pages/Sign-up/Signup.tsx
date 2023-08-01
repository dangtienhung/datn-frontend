import { Link } from 'react-router-dom';
import { Button, Input } from '../../components';

type Props = {};

const Signup = (props: Props) => {
  return (
    <div className="background-container">
      <div className="h-full flex justify-center items-center">
        <div className="content background-content bg-white w-[90vw] md:w-[500px] h-[600px] px-6 md:px-[100px] py-6 flex justify-center items-center flex-col rounded">
          <div className="logo">
            <img src="/logo.png" alt="" className="w-[200px] mb-5" />
          </div>
          <form action="" className="flex flex-col">
            <Input inputType="text" type="auth" placeholder="Nhập username của bạn" />

            <Input inputType="text" type="auth" placeholder="Nhập email của bạn" />

            <Input inputType="password" type="auth" placeholder="Nhập mật khẩu của bạn" />

            <Input inputType="password" type="auth" placeholder="Nhập lại mật khẩu của bạn" />

            <Button type="auth" size="large" shape="circle">
              Đăng kí
            </Button>
            <div className="flex gap-x-2 justify-center items-center my-5 text-sm">
              <div>Bạn đã có tài khoản?</div>
              <div className="font-semibold text-[#d4b774]">
                <Link to="/signin">Đăng nhập</Link>
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

export default Signup;
