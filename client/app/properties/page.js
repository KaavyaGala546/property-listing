// app/properties/page.js
import { Suspense } from "react";
import PropertiesClient from "../components/PropertiesClient";

export default function PropertiesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PropertiesClient />
    </Suspense>
  );
}
