import About from '../../components/About';
import ButtonDelivery from '../../components/Button-Delivery';
import FooterHomePage from '../../components/Footer-HomePage';
import HeaderHomePage from '../../components/Header-HomePage';
import NewProducts from '../../components/New-Products';
import News from '../../components/News';
import Popup from '../../components/Popup';
import Sliders from '../../components/Slider';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <HeaderHomePage />
      <Sliders />
      <main className="p-8 md:p-5">
        <NewProducts />
        <About />
        <News />
      </main>
      <FooterHomePage />
      <ButtonDelivery />
      <Popup />
    </>
  );
};

export default HomePage;
