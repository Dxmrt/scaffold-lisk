"use client";

import * as Dash from "~~/components/Dashboard";

export default function PanelPage() {

  const Cmp = (Dash as any).default ?? (Dash as any).Dashboard;

  if (!Cmp) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-semibold">
          Dashboard no encontrado. Revisa:
        </p>
        <ul className="list-disc ml-6">
          <li>La ruta del import en <code>app/panel/page.tsx</code></li>
          <li>Si el archivo exporta <code>export default</code> o <code>export const Dashboard</code></li>
        </ul>
      </div>
    );
  }

  return <Cmp />;
}
