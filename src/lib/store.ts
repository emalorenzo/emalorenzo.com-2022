import create from 'zustand';

export const useStore = create(() => {
  return {
    dom: null,
    router: null,
  };
});
