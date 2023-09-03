import { useEffect } from "react";
export function useKey(keyEvent, eventKeyName, func) {
  useEffect(
    function () {
      function callback(e) {
        if (e.key.toLowerCase() === eventKeyName.toLowerCase()) {
          func();
        }
      }

      document.addEventListener(keyEvent, callback);

      return function () {
        document.removeEventListener(keyEvent, callback);
      };
    },
    [func, keyEvent, eventKeyName]
  );
}
