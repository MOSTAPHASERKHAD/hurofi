import { useSyncExternalStore } from 'react';

const PREMIUM_KEY = 'hurofi_premium_status';
const ACTIVATION_CODE = 'HUROFI-VIP-2026'; // كود التفعيل السري السهل للتجربة

// Subscriber pattern لكي يتم تحديث كل الشاشات عند تفعيل التطبيق
let listeners: Array<() => void> = [];
function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}

export const premiumStore = {
  isPremium() {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(PREMIUM_KEY) === 'true';
  },
  activate(code: string) {
    // يمكنك هنا وضع لوجيك معقد أو اتصال بسيرفر، 
    // لكن للتطبيقات المنفصلة (Offline) نستخدم كود ثابت أو مولد أكواد
    if (code.trim().toUpperCase() === ACTIVATION_CODE) {
      localStorage.setItem(PREMIUM_KEY, 'true');
      emitChange();
      return true;
    }
    return false;
  },
  subscribe(listener: () => void) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot() {
    return premiumStore.isPremium();
  },
  getServerSnapshot() {
    return false;
  }
};

export function usePremium() {
  const isPremium = useSyncExternalStore(
    premiumStore.subscribe,
    premiumStore.getSnapshot,
    premiumStore.getServerSnapshot
  );

  return {
    isPremium,
    activate: premiumStore.activate
  };
}
