import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './Layout.scss';

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
