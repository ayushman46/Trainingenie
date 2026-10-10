// Notifies IndexNow search engines (Bing, which powers ChatGPT search and Copilot, plus Yandex, Seznam, Naver) about every URL in the live sitemap.
// Run after a production deploy: npm run indexnow
// The key is public by design; it must match public/<key>.txt on the live site.
const SITE_URL = "https://www.trainingenie.com";
const KEY = "d7b7d0639496e5bdec0617c0eb36a68c";

const sitemap = await fetch(`${SITE_URL}/sitemap.xml`).then((response) => {
  if (!response.ok) throw new Error(`Could not fetch sitemap: HTTP ${response.status}`);
  return response.text();
});
const urlList = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
if (urlList.length === 0) throw new Error("Sitemap contained no URLs.");

const keyCheck = await fetch(`${SITE_URL}/${KEY}.txt`);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) throw new Error(`Key file ${SITE_URL}/${KEY}.txt is not live yet. Deploy first.`);

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(SITE_URL).host, key: KEY, keyLocation: `${SITE_URL}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow responded HTTP ${response.status} for ${urlList.length} URLs.`);
if (response.status >= 400) process.exit(1);
