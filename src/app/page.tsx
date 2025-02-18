"use client";

import { Suspense } from "react";
import { SearchParamsComponent } from "./components/checkout.wrapper";

export default function Home() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchParamsComponent />
    </Suspense>
  );
}
