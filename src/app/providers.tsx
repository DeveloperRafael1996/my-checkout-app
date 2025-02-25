"use client";

import { ReactQueryProvider } from "@/components/providers/react-query-provider";

export const Providers = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <ReactQueryProvider>{children}</ReactQueryProvider>;
};
