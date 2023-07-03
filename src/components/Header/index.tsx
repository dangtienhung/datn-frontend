import { Link } from 'react-router-dom';
import { Button, Search } from '..';
type Props = {};

const Header = (props: Props) => {
  return (
    <div className="bg-white flex items-center justify-between  w-full h-[50px] shadow-[0_2px_10px_0_rgba(0,0,0,0.06)] px-4">
      <div className="logo">
        <Link to="/">
          <img className="w-[150px] h-10 max-w-[150px]" src="/logo.png" alt="" />
        </Link>
      </div>
      <Search />

      <Button type="auth" size="small">
        Đăng nhập
      </Button>
    </div>
  );
};

export default Header;
