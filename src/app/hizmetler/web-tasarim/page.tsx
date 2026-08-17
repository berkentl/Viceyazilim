import type { Metadata } from "next";
import { WebDesignExperience } from "@/components/services/WebDesignExperience";

export const metadata: Metadata = {
  title: "Web Tasarım — Vice Yazılım",
  description:
    "Markanızın karakterini yansıtan, her ekranda doğal hissettiren ve ilk izlenimi güçlü kılan web deneyimleri.",
};

export default function WebTasarimPage() {
  return (
    <main>
      <WebDesignExperience />
    </main>
  );
}
