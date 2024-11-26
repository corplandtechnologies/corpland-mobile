import React from "react";

export interface TextProps {
  children: React.ReactNode;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  textAlign?: "auto" | "left" | "right" | "center";
}
