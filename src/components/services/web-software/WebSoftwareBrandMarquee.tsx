import type { ComponentType } from "react";
import {
  IconBrandAws,
  IconBrandCloudflare,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandGithub,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandStripe,
  IconBrandSupabase,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  type IconProps,
} from "@tabler/icons-react";
import styles from "./WebSoftwareBrandMarquee.module.css";

type Brand = {
  name: string;
  Icon: ComponentType<IconProps>;
};

const productBrands: Brand[] = [
  { name: "Next.js", Icon: IconBrandNextjs },
  { name: "React", Icon: IconBrandReact },
  { name: "TypeScript", Icon: IconBrandTypescript },
  { name: "Vercel", Icon: IconBrandVercel },
  { name: "Figma", Icon: IconBrandFigma },
  { name: "Tailwind CSS", Icon: IconBrandTailwind },
];

const infrastructureBrands: Brand[] = [
  { name: "Supabase", Icon: IconBrandSupabase },
  { name: "Cloudflare", Icon: IconBrandCloudflare },
  { name: "AWS", Icon: IconBrandAws },
  { name: "GitHub", Icon: IconBrandGithub },
  { name: "Docker", Icon: IconBrandDocker },
  { name: "Node.js", Icon: IconBrandNodejs },
  { name: "Stripe", Icon: IconBrandStripe },
];

function BrandGroup({ brands }: { brands: Brand[] }) {
  return (
    <div className={styles.group}>
      {brands.map(({ name, Icon }) => (
        <div className={styles.brand} key={name}>
          <Icon size={28} stroke={1.45} aria-hidden="true" />
          <span>{name}</span>
        </div>
      ))}
    </div>
  );
}

function BrandTrack({
  brands,
  reverse = false,
}: {
  brands: Brand[];
  reverse?: boolean;
}) {
  return (
    <div className={styles.viewport} aria-hidden="true">
      <div className={reverse ? styles.trackReverse : styles.track}>
        <BrandGroup brands={brands} />
        <BrandGroup brands={brands} />
      </div>
    </div>
  );
}

export function WebSoftwareBrandMarquee() {
  const allBrandNames = [...productBrands, ...infrastructureBrands]
    .map(({ name }) => name)
    .join(", ");

  return (
    <section
      className={styles.section}
      aria-label={`VICE Yazılım teknoloji ekosistemi: ${allBrandNames}`}
    >
      <h2 className={styles.srOnly}>VICE Yazılım teknoloji ekosistemi</h2>

      <div className={styles.frame}>
        <BrandTrack brands={productBrands} />
        <BrandTrack brands={infrastructureBrands} reverse />
      </div>
    </section>
  );
}
