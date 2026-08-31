import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vice Yazılım",
    short_name: "VICE",
    description:
      "Web tasarım, özel yazılım, e-ticaret ve dijital büyüme çözümleri.",
    start_url: "/",
    display: "standalone",
    background_color: "#05070b",
    theme_color: "#05070b",
    lang: "tr-TR",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
