"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * False during server render and the first client render, true afterwards.
 *
 * `useSyncExternalStore` is the intended tool for this: it takes an explicit
 * server snapshot, so React knows the two renders differ by design rather than
 * flagging a hydration mismatch — and it avoids the setState-in-effect pattern.
 */
export const useHydrated = () => useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
