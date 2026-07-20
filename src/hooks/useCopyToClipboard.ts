'use client';

import { useEffect, useState, useCallback } from 'react';

interface UseCopyToClipboardOptions {
  timeout?: number;
}

export const useCopyToClipboard = (options: UseCopyToClipboardOptions = {}) => {
  const { timeout = 2000 } = options;
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    async (text: string) => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), timeout);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    },
    [timeout],
  );

  return { isCopied, copy };
};
