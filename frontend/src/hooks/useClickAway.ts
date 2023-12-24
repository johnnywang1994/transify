import { RefObject, useEffect, useRef } from 'react';

const defaultEvents = ['mousedown', 'touchstart'];
const useClickAway = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: unknown) => void,
  events: string[] = defaultEvents
) => {
  const savedCallback = useRef(onClickAway);
  useEffect(() => {
    savedCallback.current = onClickAway;
  }, [onClickAway]);
  useEffect(() => {
    const handler: Parameters<HTMLElement['addEventListener']>['1'] = (
      event
    ) => {
      const { current: el } = ref;
      if (el && !el.contains(event.target as Node)) {
        savedCallback.current(event);
      }
    };
    events.forEach((eventName) => {
      window.addEventListener(eventName as keyof WindowEventMap, handler);
    });
    return () => {
      events.forEach((eventName) => {
        window.removeEventListener(eventName as keyof WindowEventMap, handler);
      });
    };
  }, [events, ref]);
};
export default useClickAway;
