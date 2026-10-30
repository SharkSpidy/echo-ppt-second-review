interface NavControlsProps {
  titles: string[];
  current: number;
  onGoTo: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Fixed prev/next buttons plus the dot indicator. Predictable
 * disabled-at-the-ends behavior (rather than looping) and visible
 * focus states are deliberate accessibility choices for a deck about
 * assistive technology.
 */
export function NavControls({ titles, current, onGoTo, onPrev, onNext }: NavControlsProps) {
  return (
    <nav className="nav-controls" aria-label="Slide navigation">
      <button
        className="nav-btn"
        aria-label="Previous slide"
        disabled={current === 0}
        onClick={onPrev}
      >
        &#8592;
      </button>

      <div className="dots" role="tablist" aria-label="Slides">
        {titles.map((title, i) => (
          <button
            key={title + i}
            className={"dot" + (i === current ? " is-active" : "")}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}: ${title}`}
            onClick={() => onGoTo(i)}
          />
        ))}
      </div>

      <button
        className="nav-btn"
        aria-label="Next slide"
        disabled={current === titles.length - 1}
        onClick={onNext}
      >
        &#8594;
      </button>
    </nav>
  );
}
