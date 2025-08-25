"use client";

import React, { ReactNode } from "react";
import { OverlayProvider } from "./OverlayProvider";

export const providers: React.ComponentType<{ children: ReactNode }>[] = [
  OverlayProvider,
];
