"use client";

import React, { ReactNode } from "react";
import { providers } from "./providers";

export default function ContextProvider({ children }: { children: ReactNode }) {
  return providers.reduceRight(
    (acc, Provider) => <Provider>{acc}</Provider>,
    <>{children}</>
  );
}
