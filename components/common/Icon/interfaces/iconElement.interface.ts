import { Ionicons } from "@expo/vector-icons";

export interface IconElementProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
}
