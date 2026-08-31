const host = "viceyazilim.com";
const key = "7addfa71a7e1b8ef6affef97de354fd8";
const paths = [
  "/",
  "/hizmetler/web-tasarim",
  "/hizmetler/ui-ux",
  "/hizmetler/web-yazilim",
  "/hizmetler/e-ticaret",
  "/hizmetler/seo",
  "/hizmetler/google-ads",
  "/referanslar",
  "/kurumsal/hakkimizda",
  "/iletisim",
];

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key,
    keyLocation: `https://${host}/${key}.txt`,
    urlList: paths.map((path) => `https://${host}${path}`),
  }),
});

if (!response.ok) {
  throw new Error(`IndexNow request failed: ${response.status} ${await response.text()}`);
}

console.log(`IndexNow accepted ${paths.length} URLs (${response.status}).`);
