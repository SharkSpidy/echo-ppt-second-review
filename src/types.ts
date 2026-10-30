import type { ReactNode } from "react";

/** One slide in the deck. `content` renders inside the standard
 * `.slide-inner` wrapper. */
export interface SlideData {
  /** Used for the accessible label on nav dots, the aria-live
   * announcer and the browser-tab title. */
  title: string;
  content: ReactNode;
  /** Extra className appended to the <section class="slide">. */
  className?: string;
}
