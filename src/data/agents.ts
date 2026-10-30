import type { LucideIcon } from "lucide-react";
import {
  Eye,
  Volume2,
  Radio,
  Hand,
  Zap,
  AlertTriangle,
  LayoutGrid,
  Box,
  Send,
  Code2,
  Camera,
  Headphones,
} from "lucide-react";

export type AgentKey = "vision" | "haptic" | "voice";
export type PipelineStage = "INPUT" | "PROCESS" | "OUTPUT";

export interface PipelineStep {
  stage: PipelineStage;
  icon: LucideIcon;
  title: string;
  detail: string;
}

export interface AgentInfo {
  key: AgentKey;
  /** Display title for the agent. */
  slideTitle: string;
  name: string;
  icon: LucideIcon;
  /** A CSS custom property reference, e.g. "var(--accent-2)". */
  color: string;
  tagline: string;
  inputSource: string;
  outputTarget: string;
  pipeline: PipelineStep[];
}

// Reuses the deck's existing semantic tokens rather than inventing new
// colors: --accent-2 (cyan) is already "computer vision / VPR" and
// --accent (amber) is already "voice guidance" in index.css. --accent-3
// (soft violet) is added alongside them for the Haptic Agent.
export const AGENTS: AgentInfo[] = [
  {
    key: "vision",
    slideTitle: "Vision Agent",
    name: "Vision Agent",
    icon: Eye,
    color: "var(--accent-2)",
    tagline: "Converts Kinect depth into a 2D occupancy map",
    inputSource: "Xbox 360 Kinect Sensor",
    outputTarget: "Local Message Broker",
    pipeline: [
      {
        stage: "INPUT",
        icon: Camera,
        title: "Raw IR & Depth Array",
        detail: "Infrared and depth frames received from the Kinect over USB.",
      },
      {
        stage: "PROCESS",
        icon: Box,
        title: "OpenCV Point Cloud Generator",
        detail: "Converts each depth frame into a 3D point cloud of the forward scene.",
      },
      {
        stage: "PROCESS",
        icon: LayoutGrid,
        title: "2D Occupancy Grid Converter",
        detail: "Reduces the point cloud to a lightweight 2D grid suitable for real-time processing on the Raspberry Pi.",
      },
      {
        stage: "OUTPUT",
        icon: Send,
        title: "JSON Spatial Payload Publisher",
        detail: "Publishes the occupancy grid through the Message Broker to the Haptic and Voice Agents.",
      },
    ],
  },
  {
    key: "haptic",
    slideTitle: "Haptic Agent",
    name: "Haptic Agent",
    icon: Hand,
    color: "var(--accent-3)",
    tagline: "Turns nearby obstacles into wristband vibration",
    inputSource: "Local Message Broker",
    outputTarget: "Haptic wristband (ESP32)",
    pipeline: [
      {
        stage: "INPUT",
        icon: Radio,
        title: "Spatial Data Subscriber",
        detail: "Subscribes to the occupancy grid published by the Vision Agent.",
      },
      {
        stage: "PROCESS",
        icon: Zap,
        title: "Distance-to-PWM Mapping",
        detail: "Maps obstacle proximity to vibration intensity, so closer obstacles vibrate more strongly.",
      },
      {
        stage: "PROCESS",
        icon: Code2,
        title: "Serial Protocol Formatter",
        detail: "Combines motor intensity and position into a serial command frame.",
      },
      {
        stage: "OUTPUT",
        icon: Hand,
        title: "Serial Out to ESP32",
        detail: "Sends the serial command to the ESP32 motor controller, which drives the correct motor.",
      },
    ],
  },
  {
    key: "voice",
    slideTitle: "Voice Agent",
    name: "Voice Agent",
    icon: Volume2,
    color: "var(--accent)",
    tagline: "Converts a real hazard ahead into a spoken warning",
    inputSource: "Local Message Broker",
    outputTarget: "In-ear module",
    pipeline: [
      {
        stage: "INPUT",
        icon: Radio,
        title: "Spatial Data Subscriber",
        detail: "Subscribes to the occupancy grid published by the Vision Agent.",
      },
      {
        stage: "PROCESS",
        icon: AlertTriangle,
        title: "Hazard Threshold Filter",
        detail: "Ignores routine clutter so that only drop-offs and head-level hazards trigger a warning.",
      },
      {
        stage: "PROCESS",
        icon: Volume2,
        title: "Offline TTS Engine",
        detail: "Produces a short spoken warning using offline, local text-to-speech.",
      },
      {
        stage: "OUTPUT",
        icon: Headphones,
        title: "3D Audio Panner",
        detail: "Pans the audio left or right to match the obstacle's position.",
      },
    ],
  },
];

export const getAgent = (key: AgentKey): AgentInfo => {
  const agent = AGENTS.find((a) => a.key === key);
  if (!agent) throw new Error(`Unknown agent key: ${key}`);
  return agent;
};
