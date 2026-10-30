import { useEffect } from "react";
import { Slide } from "./components/Slide";
import { NavControls } from "./components/NavControls";
import { useSlideshow } from "./hooks/useSlideshow";
import { slides } from "./data/slides";

const titles = slides.map((s) => s.title);
const pad = (n: number) => String(n).padStart(2, "0");

function App() {
  const { current, exiting, goToSlide, goNext, goPrev, clearExiting } = useSlideshow(slides.length);
  const total = slides.length;

  // Keep the browser-tab title in sync with the active slide.
  useEffect(() => {
    document.title = `ECHO — ${slides[current].title}`;
  }, [current]);

  return (
    <>
      <div className="kicker-brand">
        <span>ECHO</span> · navigation for the blind
      </div>

      <div className="slide-counter" aria-hidden="true">
        {pad(current + 1)} / {pad(total)}
      </div>

      <div className="sr-only" aria-live="polite">
        {`Slide ${current + 1} of ${total}: ${slides[current].title}`}
      </div>

      <main className="stage">
        {slides.map((slide, i) => (
          <Slide
            key={slide.title}
            title={slide.title}
            isActive={i === current}
            exitDirection={exiting && exiting.index === i ? exiting.direction : null}
            onExitTransitionEnd={() => clearExiting(i)}
            className={slide.className}
          >
            {slide.content}
          </Slide>
        ))}
      </main>

      <NavControls titles={titles} current={current} onGoTo={goToSlide} onPrev={goPrev} onNext={goNext} />
    </>
  );
}

export default App;
