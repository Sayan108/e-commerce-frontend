// utils/navigateService.js
let navigateFn: any = null;

export const setNavigator = (navigator: any) => {
  navigateFn = navigator;
};

export const navigate = (...args: any) => {
  if (navigateFn) {
    navigateFn(...args);
  } else {
    console.warn("Navigator not set yet.");
  }
};
