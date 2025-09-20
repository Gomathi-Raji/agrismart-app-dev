declare global {
  interface Window {
    eapps: {
      init: () => void;
    };
  }
}