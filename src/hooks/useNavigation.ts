let navigator: ((path: string) => void) | null = null;

export const setNavigator = (fn: (path: string) => void) => {
  navigator = fn;
};

export const navigate = (path: string) => {
  if (!navigator) {
    console.warn("Navigator not initialized yet");
    return;
  }
  navigator(path);
};
