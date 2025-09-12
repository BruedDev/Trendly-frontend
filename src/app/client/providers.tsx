"use client";

import { Provider } from "react-redux";
import store from "@/store";
import { StatusMessageProvider } from "@/contexts/StatusMessageContext";
import ContextProvider from "@/contexts/index";
import SuspenseWrapper from "@/components/Suspense";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <StatusMessageProvider>
        <ContextProvider>
          <SuspenseWrapper>{children}</SuspenseWrapper>
        </ContextProvider>
      </StatusMessageProvider>
    </Provider>
  );
}
