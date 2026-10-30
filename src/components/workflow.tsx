import type { CSSProperties } from "react";
import { ArrowDown, ArrowRight, CornerDownLeft, Radio, Square } from "lucide-react";
import { AGENTS } from "../data/agents";
import {
  GUIDANCE_LOOP,
  LANES,
  OBSTACLE_LOOP,
  OVERVIEW_NODES,
  POWER_ICON,
  type LoopStep,
  type OverviewNode,
} from "../data/workflow";

/** Pass CSS custom properties through React's style prop, typed. */
const vars = (v: Record<string, string | number>) => v as CSSProperties;

/* ------------------------------------------------------------------ 1. Overview */

function FlowNode({
  node,
  order,
  className,
  style,
}: {
  node: OverviewNode;
  order: number;
  className: string;
  style: CSSProperties;
}) {
  const Icon = node.icon;
  return (
    <div className={`wf-node wf-step ${className}`} style={{ ...style, ...vars({ "--c": node.color, "--i": order }) }}>
      <div className="wf-node-head">
        <span className="wf-node-icon">
          <Icon size={18} />
        </span>
        <span className="wf-node-stage">{node.stage}</span>
      </div>
      <div className="wf-node-title">{node.title}</div>
      <div className="wf-node-detail">{node.detail}</div>
    </div>
  );
}

export function WorkflowOverview() {
  const n = OVERVIEW_NODES;
  const Power = POWER_ICON;
  return (
    <>
      <p className="eyebrow">03 · System Workflow · Overview</p>
      <h2>From a Kinect frame to a buzz on the wrist</h2>

      <div className="wf-grid" role="group" aria-label="End-to-end data flow of ECHO">
        <FlowNode node={n.sensing} order={0} className="wf-out" style={{ gridColumn: 1, gridRow: "1 / span 2" }} />
        <FlowNode node={n.vision} order={1} className="wf-out" style={{ gridColumn: 2, gridRow: "1 / span 2" }} />
        <FlowNode node={n.broker} order={2} className="wf-out" style={{ gridColumn: 3, gridRow: "1 / span 2" }} />
        <FlowNode node={n.haptic} order={3} className="wf-in wf-out" style={{ gridColumn: 4, gridRow: 1 }} />
        <FlowNode node={n.wristband} order={4} className="wf-end" style={{ gridColumn: 5, gridRow: 1 }} />
        <FlowNode node={n.voice} order={3} className="wf-in wf-out" style={{ gridColumn: 4, gridRow: 2 }} />
        <FlowNode node={n.inear} order={4} className="wf-end" style={{ gridColumn: 5, gridRow: 2 }} />
      </div>

      <div className="wf-notes">
        <p className="wf-note wf-step" style={vars({ "--i": 5 })}>
          <Power size={15} /> <span><strong>All local.</strong> Everything runs on the Raspberry Pi inside the Xbox 360 S shell; indoor, no cloud dependency.</span>
        </p>
        <p className="wf-note wf-step" style={vars({ "--i": 6 })}>
          <Radio size={15} /> <span><strong>Two independent channels.</strong> Haptic and Voice each subscribe to the broker on their own, so one delay or failure does not block the other.</span>
        </p>
      </div>
    </>
  );
}

/* ---------------------------------------------------------------- 2. Swim-lanes */

export function WorkflowLanes() {
  return (
    <>
      <p className="eyebrow">03 · System Workflow · A navigation session</p>
      <h2>One session, six lanes</h2>
      <p className="subtitle wf-lede">
        The Activity Diagram (Fig 4.4) divides a navigation session into six swim-lanes. Read each lane left to right; lanes 3–6 repeat
        until navigation ends.
      </p>

      <ol className="lane-list">
        {LANES.map((lane, i) => (
          <li className="lane wf-step" key={lane.name} style={vars({ "--c": lane.color, "--i": i })}>
            <div className="lane-label">
              <span className="lane-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="lane-name">{lane.name}</span>
              {lane.note && <span className="lane-note">{lane.note}</span>}
            </div>
            <div className="lane-steps">
              {lane.steps.map((step, j) => (
                <span className="lane-step-wrap" key={step}>
                  {j > 0 && <ArrowRight size={14} className="lane-arrow" />}
                  <span className="lane-step">{step}</span>
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}

/* ------------------------------------------------------- 3. Obstacle-to-alert path */

export function WorkflowPath() {
  return (
    <>
      <p className="eyebrow">03 · System Workflow · Obstacle to alert</p>
      <h2>Every agent runs Input → Process → Output</h2>

      <div className="path-head" aria-hidden="true">
        <span />
        <span>INPUT</span>
        <span>PROCESS</span>
        <span>PROCESS</span>
        <span>OUTPUT</span>
      </div>

      <div className="path-rows">
        {AGENTS.map((agent, r) => {
          const Icon = agent.icon;
          return (
            <div key={agent.key}>
              {r === 1 && (
                <div className="path-broker wf-step" style={vars({ "--i": 4 })}>
                  <ArrowDown size={14} />
                  <span>
                    <strong>Local Message Broker</strong> · Vision Agent publishes the occupancy grid; Haptic and Voice subscribe to it
                  </span>
                  <ArrowDown size={14} />
                </div>
              )}
              <div className="path-row wf-step" style={vars({ "--c": agent.color, "--i": r === 0 ? 0 : r + 3 })}>
                <div className="path-agent">
                  <span className="path-agent-icon">
                    <Icon size={18} />
                  </span>
                  <div>
                    <div className="path-agent-name">{agent.name}</div>
                    <div className="path-agent-io">
                      {agent.inputSource} → {agent.outputTarget}
                    </div>
                  </div>
                </div>
                {agent.pipeline.map((step) => {
                  const StepIcon = step.icon;
                  return (
                    <div className="path-step" key={step.title}>
                      <span className="path-step-title">
                        <StepIcon size={14} />
                        {step.title}
                      </span>
                      <span className="path-step-detail">{step.detail}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* -------------------------------------------------------------- 4. The two loops */

function LoopCard({ title, tag, color, steps, footer }: { title: string; tag: string; color: string; steps: LoopStep[]; footer: string }) {
  return (
    <div className="loop-card wf-step" style={vars({ "--c": color, "--i": 0 })}>
      <p className="loop-tag">{tag}</p>
      <h3>{title}</h3>
      <ol className="loop-steps">
        {steps.map((s, i) => (
          <li key={s.label} style={vars({ "--i": i + 1 })} className="wf-step">
            <span className="loop-dot">{i + 1}</span>
            <span>
              <span className="loop-who">{s.who}</span>
              <span className="loop-label">{s.label}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="loop-return">
        <CornerDownLeft size={14} /> {footer}
      </p>
    </div>
  );
}

export function WorkflowLoops() {
  return (
    <>
      <p className="eyebrow">03 · System Workflow · While navigating</p>
      <h2>Two loops run side by side</h2>

      <div className="loop-grid">
        <LoopCard
          title="Guidance loop"
          tag="Voice instructions"
          color="var(--accent)"
          steps={GUIDANCE_LOOP}
          footer="Still active → recalculate path if needed, then repeat from the next waypoint"
        />
        <LoopCard
          title="Obstacle loop"
          tag="Alerts · parallel"
          color="var(--accent-3)"
          steps={OBSTACLE_LOOP}
          footer="Repeats on every depth frame while navigation is active"
        />
      </div>

      <p className="banner wf-end-banner">
        <Square size={14} fill="currentColor" /> <span><strong>Stop navigation</strong> — the user ends the session and both loops end with it.</span>
      </p>
    </>
  );
}

/* ----------------------------------------------------------------- 5. Reference */

export function WorkflowReference() {
  return (
    <>
      <p className="eyebrow">03 · System Workflow · Source diagrams</p>
      <h2>The diagrams behind the workflow</h2>
      <div className="ref-pair">
        <figure className="figure">
          <div className="uml-diagram-frame">
            <img className="uml-diagram ref-img" src="/images/sequence.jpg" alt="Sequence diagram of ECHO" />
          </div>
          <figcaption>Fig 4.3 · Sequence diagram — who talks to whom, in order</figcaption>
        </figure>
        <figure className="figure">
          <div className="uml-diagram-frame">
            <img className="uml-diagram ref-img" src="/images/activity.jpg" alt="Activity diagram of ECHO" />
          </div>
          <figcaption>Fig 4.4 · Activity diagram — the six swim-lanes</figcaption>
        </figure>
      </div>
    </>
  );
}
