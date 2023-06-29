import { useEffect } from 'react';

const useClickOutside = (
  setState: React.Dispatch<React.SetStateAction<boolean>>,
  classes: string[]
) => {
  useEffect(() => {
    const func = (e: MouseEvent) => {
      e.stopPropagation();

      const classListArr = [...(e.target as HTMLElement).classList];

      const hasClass =
        classListArr.some(className => classes.includes(className)) ||
        classListArr.length === 0;

      // length === 0 takes effect when choosing hue color in color picker element which has no class. so set the state to false and close color picker after picking hue color

      if (hasClass) {
        setState(true);
      } else {
        setState(false);
      }
    };

    document.addEventListener('click', func);

    return () => document.removeEventListener('click', func);
  }, [setState, classes]);
};

export default useClickOutside;
