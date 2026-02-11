'use client';

import { useEffect, useRef } from 'react';

/**
 * Hook that integrates browser back button with modal/popup close behavior.
 * When `isOpen` becomes true, pushes a history state.
 * When the user presses browser back, calls `onClose` instead of navigating away.
 * When closed via UI (X button, backdrop), pops the history state cleanly.
 */
export function useBackButton(isOpen: boolean, onClose: () => void) {
  const isOpenRef = useRef(isOpen);
  const onCloseRef = useRef(onClose);
  const pushedRef = useRef(false);

  // Keep refs current
  onCloseRef.current = onClose;
  isOpenRef.current = isOpen;

  useEffect(() => {
    if (isOpen) {
      // Push a state marker so back button has something to pop
      window.history.pushState({ modal: true }, '');
      pushedRef.current = true;

      const handlePopState = () => {
        // Browser back was pressed — close the modal instead of navigating
        if (isOpenRef.current) {
          pushedRef.current = false;
          onCloseRef.current();
        }
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        window.removeEventListener('popstate', handlePopState);
        // If modal was closed via UI (not back button), pop the extra history entry
        if (pushedRef.current) {
          pushedRef.current = false;
          window.history.back();
        }
      };
    }
  }, [isOpen]);
}
