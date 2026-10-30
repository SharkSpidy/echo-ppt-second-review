import type { SlideData } from "../types";
import { WorkflowLanes, WorkflowLoops, WorkflowOverview, WorkflowPath, WorkflowReference } from "../components/workflow";

/**
 * ECHO — Problem Statement, Methodology and System Workflow.
 *
 * Slides 1–2 are carried over unchanged from the ECHO Phase I second-review
 * deck (only the section numbers were updated). Slides 3–7 are new and explain
 * the whole system workflow using that deck's content only.
 */

export const slides: SlideData[] = [
  // ------------------------------------------------------- 01 Problem Statement
  {
    title: "Problem Statement",
    content: (
      <>
        <p className="eyebrow">01 · Problem Statement</p>
        <span className="problem-flag">The gap in mobility today</span>
        <h2>Traditional aids can't tell you what's around you.</h2>
        <ul className="list-clean">
          <li>Unfamiliar indoor spaces create major mobility barriers for visually impaired people.</li>
          <li>
            White canes and guide dogs depend on obstacle contact: limited scene understanding, limited detection of upper-body
            obstacles and little landmark awareness.
          </li>
          <li>Limited spatial context increases anxiety and reduces independent mobility.</li>
        </ul>
      </>
    ),
  },

  // ------------------------------------------------------------ 02 Methodology
  {
    title: "Methodology",
    content: (
      <>
        <p className="eyebrow">02 · Methodology</p>
        <h2>Methodology</h2>
        <p>All agents follow a shared pipeline: Input → Process → Output.</p>
        <div className="card-grid">
          <div className="card">
            <h3>Input</h3>
            <p>Local Message Broker or raw sensor stream · Current spatial state</p>
          </div>
          <div className="card">
            <h3>Process</h3>
            <p>Point cloud → occupancy grid · Distance → vibration · Hazard → speech</p>
          </div>
          <div className="card">
            <h3>Output</h3>
            <p>Motor driver · In-ear audio panner · Message Broker</p>
          </div>
        </div>
      </>
    ),
  },

  // ------------------------------------------------------------ 03 System Workflow
  { title: "Workflow Overview", className: "slide--wide", content: <WorkflowOverview /> },
  { title: "Workflow: A Navigation Session", className: "slide--wide", content: <WorkflowLanes /> },
  { title: "Workflow: Obstacle to Alert", className: "slide--wide", content: <WorkflowPath /> },
  { title: "Workflow: Two Loops", className: "slide--wide", content: <WorkflowLoops /> },
  { title: "Workflow: Source Diagrams", className: "slide--wide", content: <WorkflowReference /> },
];
