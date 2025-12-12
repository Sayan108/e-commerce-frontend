let navigatorFn: ((path: string) => void) | null = null;

export const setNavigator = (fn: (path: string) => void) => {
  navigatorFn = fn;
};

export const navigate = (path: string) => {
  if (!navigatorFn) {
    console.warn("Navigator not set yet");
    return;
  }
  navigatorFn(path);
};
