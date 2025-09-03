"use client";

import React, { ReactNode } from "react";
import { OverlayProvider } from "./OverlayContext";
import { CartProvider } from "./CartContext";
import { UserProvider } from "./UserContext";

export const providers: React.ComponentType<{ children: ReactNode }>[] = [
  OverlayProvider,
  CartProvider,
  UserProvider,
];
