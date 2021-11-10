import { isMobile } from 'src/utils/ismobile';
import { NavbarWeb, NavbarMobile } from './navbar';
import { ContainerWeb, ContainerMobile } from './body-container';
import { ShowMobile, ShowWeb } from './showlist';
import { ClassListMobile, ClassListWeb } from './class-list';

const mobile = isMobile();

export const Navbar = mobile ? NavbarMobile : NavbarWeb;

export const BodyContainer = mobile ? ContainerMobile : ContainerWeb;

export const Show = mobile ? ShowMobile : ShowWeb;

export const ClassList = mobile ? ClassListMobile : ClassListWeb;
