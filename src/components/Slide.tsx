import type { ReactNode } from "react";

interface SlideProps {
  title: string;
  isActive: boolean;
  exitDirection: "left" | "right" | null;
  onExitTransitionEnd: () => void;
  className?: string;
  children: ReactNode;
  /** Content rendered as a sibling of `.slide-inner`, outside its
   * centered/max-width column — e.g. the title slide's absolutely
   * positioned EchoPing hero graphic. */
  decoration?: ReactNode;
}

/**
 * Renders one slide's outer <section>. Class state is driven entirely
 * by props from useSlideshow: `is-active` when current, `exit-left` /
 * `exit-right` while animating out, and nothing once the exit
 * transition has finished (handled via onTransitionEnd).
 */
export function Slide({
  title,
  isActive,
  exitDirection,
  onExitTransitionEnd,
  className,
  children,
  decoration,
}: SlideProps) {
  const classes = ["slide"];
  if (isActive) classes.push("is-active");
  if (exitDirection) classes.push(exitDirection === "left" ? "exit-left" : "exit-right");
  if (className) classes.push(className);

  return (
    <section
      className={classes.join(" ")}
      data-title={title}
      onTransitionEnd={exitDirection ? onExitTransitionEnd : undefined}
    >
      <div className="slide-inner">{children}</div>
      {decoration}
    </section>
  );
}
