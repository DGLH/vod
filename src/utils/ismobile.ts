import MobileDetect from 'mobile-detect';

const mb = new MobileDetect(window.navigator.userAgent);

export const isMobile = () => mb.mobile();
