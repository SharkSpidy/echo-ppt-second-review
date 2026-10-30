import type { LucideIcon } from "lucide-react";
import {
  Battery,
  Camera,
  Eye,
  Radio,
  Hand,
  Volume2,
  Headphones,
  Activity,
} from "lucide-react";

/* Everything in this file is taken from the ECHO Phase I deck:
 * Proposed System, Methodology, Architecture (Fig 4.1), Sequence (Fig 4.3),
 * Activity (Fig 4.4) and Modules slides. Nothing here is new content. */

export interface OverviewNode {
  id: string;
  icon: LucideIcon;
  stage: "INPUT" | "PROCESS" | "OUTPUT";
  title: string;
  detail: string;
  color: string;
}

export const OVERVIEW_NODES: Record<string, OverviewNode> = {
  sensing: {
    id: "sensing",
    icon: Camera,
    stage: "INPUT",
    title: "Sensing",
    detail: "Xbox 360 Kinect sends IR + depth frames over USB; battery pack powers it and the processor.",
    color: "var(--text-muted)",
  },
  vision: {
    id: "vision",
    icon: Eye,
    stage: "PROCESS",
    title: "Vision Agent",
    detail: "OpenCV point cloud → lightweight 2D occupancy grid.",
    color: "var(--accent-2)",
  },
  broker: {
    id: "broker",
    icon: Radio,
    stage: "PROCESS",
    title: "Local Message Broker",
    detail: "Receives the JSON spatial payload and fans it out to subscribers.",
    color: "var(--accent-2)",
  },
  haptic: {
    id: "haptic",
    icon: Activity,
    stage: "PROCESS",
    title: "Haptic Agent",
    detail: "Distance → PWM intensity → serial command frame.",
    color: "var(--accent-3)",
  },
  wristband: {
    id: "wristband",
    icon: Hand,
    stage: "OUTPUT",
    title: "Haptic Wristband",
    detail: "ESP32 motor controller drives the right motor; closer obstacle, stronger vibration.",
    color: "var(--accent-3)",
  },
  voice: {
    id: "voice",
    icon: Volume2,
    stage: "PROCESS",
    title: "Voice Agent",
    detail: "Hazard threshold filter → offline text-to-speech warning.",
    color: "var(--accent)",
  },
  inear: {
    id: "inear",
    icon: Headphones,
    stage: "OUTPUT",
    title: "In-ear Module",
    detail: "3D audio panner places the warning left or right of the user.",
    color: "var(--accent)",
  },
};

export const POWER_ICON = Battery;

/** The six swim-lanes of the Activity Diagram (Fig 4.4). */
export interface Lane {
  name: string;
  color: string;
  steps: string[];
  note?: string;
}

export const LANES: Lane[] = [
  {
    name: "User interaction",
    color: "var(--accent)",
    steps: ["Open the app", "Enter destination (voice or text)", "Start navigation"],
  },
  {
    name: "System initialisation",
    color: "var(--accent-2)",
    steps: ["Load pre-mapped environment", "Initialise Kinect & wristband", "Set indoor position", "Generate path"],
  },
  {
    name: "Navigation & guidance",
    color: "var(--accent)",
    steps: ["Next waypoint", "Generate & send instructions", "User moves forward"],
  },
  {
    name: "Obstacle detection",
    color: "var(--accent-3)",
    steps: ["Capture & process depth data", "Identify obstacles", "Compare with pre-mapped environment"],
    note: "runs in parallel",
  },
  {
    name: "Feedback to user",
    color: "var(--accent-3)",
    steps: ["Obstacle → audio warning + wristband vibration", "No obstacle → continue audio guidance"],
  },
  {
    name: "Monitoring & loop",
    color: "var(--accent-2)",
    steps: ["Update position", "Navigation still active?", "Recalculate path if needed, or end"],
  },
];

/** The two repeating loops while navigation is active. */
export interface LoopStep {
  label: string;
  who: string;
}

export const GUIDANCE_LOOP: LoopStep[] = [
  { who: "Navigation Engine", label: "Pick the next waypoint on the route" },
  { who: "Navigation Engine → Voice Assistant", label: "Generate instruction and speak it" },
  { who: "User", label: "Moves forward" },
  { who: "ECHO app", label: "Update indoor position" },
  { who: "ECHO app", label: "Navigation still active? Recalculate path if needed, or end" },
];

export const OBSTACLE_LOOP: LoopStep[] = [
  { who: "Kinect", label: "Capture depth frame" },
  { who: "Vision Agent", label: "Point cloud → occupancy grid; identify obstacles" },
  { who: "Message Broker", label: "Publish spatial payload to subscribers" },
  { who: "Haptic + Voice Agents", label: "Raise alert independently" },
  { who: "Wristband + In-ear", label: "Vibration and spoken warning reach the user" },
];
