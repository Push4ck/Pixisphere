"use client";

import { AppProvider } from "../context/AppContext";
import NProgressWrapper from "./NProgressWrapper";

export default function Providers({ children }) {
  return (
    <AppProvider>
      <NProgressWrapper />
      {children}
    </AppProvider>
  );
}
