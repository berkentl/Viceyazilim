import type { Metadata } from "next";
import { UiUxExperience } from "@/components/services/UiUxExperience";

export const metadata: Metadata = {
  title: "UI ve UX Tasarım | Vice Yazılım",
  description:
    "Kullanıcı araştırmasından prototipe, markanıza ait sade, erişilebilir ve dönüşüm odaklı dijital deneyimler tasarlıyoruz.",
};

export default function UiUxPage() {
  return <main><UiUxExperience /></main>;
}
