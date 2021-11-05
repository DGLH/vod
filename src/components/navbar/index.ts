import { isMobile } from 'src/utils/ismobile';
import { NavbarWeb, NavbarMobile } from './navbar';

const Navbar = isMobile() ? NavbarMobile : NavbarWeb;

export default Navbar;
