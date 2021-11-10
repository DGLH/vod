import { isMobile } from 'src/utils/ismobile';
import { NavbarMobile, NavbarWeb } from './navbar';
import { ContainerMobile, ContainerWeb } from './body-container';
import { ShowMobile, ShowWeb } from './showlist';
import { ClassListMobile, ClassListWeb } from './class-list';
import { SearchListMobile, SearchListWeb } from './searchlist';

const mobile = isMobile();

export const Navbar = mobile ? NavbarMobile : NavbarWeb;

export const BodyContainer = mobile ? ContainerMobile : ContainerWeb;

export const Show = mobile ? ShowMobile : ShowWeb;

export const ClassList = mobile ? ClassListMobile : ClassListWeb;

export const SearchList = mobile ? SearchListMobile : SearchListWeb;
