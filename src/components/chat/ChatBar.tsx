'use client';

import {useRef, useState, useEffect, useCallback} from 'react';
import {gsap} from '@/lib/gsap';
import {useChatStore} from '@/stores/useChatStore';
import {abortCurrentStream} from '@/services/chat';
import {ChatPanel} from './ChatPanel';
import {ChatInput} from './ChatInput';

/**
 * Always-visible floating glassmorphism chat bar at the bottom center of the viewport.
 *
 * The input is always visible. When the user sends a message, the ChatPanel
 * slides up above the bar with GSAP animation and delayed unmount pattern.
 *
 * Mounted at layout level so it persists across page navigation.
 */
export function ChatBar() {
  const isOpen = useChatStore((s) => s.isOpen);
  const messages = useChatStore((s) => s.messages);

  const showPanel = isOpen && messages.length > 0;
  const [shouldRender, setShouldRender] = useState(false);
  const panelWrapperRef = useRef<HTMLDivElement>(null);

  // Delayed unmount: when showPanel goes false, animate out then unmount
  useEffect(() => {
    if (showPanel) {
      setShouldRender(true);
    } else if (shouldRender && panelWrapperRef.current) {
      // Exit animation before unmount
      gsap.to(panelWrapperRef.current, {
        y: 20, opacity: 0, duration: 0.3, ease: 'power2.in',
        onComplete: () => setShouldRender(false),
      });
    }
  }, [showPanel, shouldRender]);

  const handleCollapse = useCallback(() => {
    useChatStore.getState().setOpen(false);
    abortCurrentStream();
  }, []);

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex flex-col items-center pb-[env(safe-area-inset-bottom)]">
      {/* Chat panel (above bar) - wrapped for exit animation */}
      {shouldRender && (
        <div ref={panelWrapperRef}>
          <ChatPanel onClose={handleCollapse} />
        </div>
      )}

      {/* Always-visible floating input bar */}
      <div className="w-full px-4 pb-4 md:w-[500px] md:px-0">
        <div className="rounded-full bg-white/60 backdrop-blur-md border border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.05)]">
          <ChatInput />
        </div>
      </div>
    </div>
  );
}
