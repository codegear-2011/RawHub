# RawHub – GitHub Raw Link Generator

একটা স্ট্যাটিক ওয়েবসাইট (HTML + CSS + JS, কোনো বিল্ড স্টেপ বা ফ্রেমওয়ার্ক নেই)। যেকোনো হোস্টিংয়ে চলে।

## ফাইল স্ট্রাকচার
```
index.html            মূল পেজ (SEO meta, JSON-LD, সেমান্টিক HTML)
404.html              noindex 404 পেজ
assets/style.css      স্টাইল ও অ্যানিমেশন
assets/app.js         কনভার্টার, থিম সুইচ, তারা/উল্কা, স্ক্রল অ্যানিমেশন
robots.txt            ক্রলার নিয়ম + sitemap লিংক
sitemap.xml           সাইটম্যাপ
manifest.webmanifest  PWA/মোবাইল আইকন তথ্য
favicon.svg/.ico, icon-192/512.png, apple-touch-icon.png, og-image.png (1200x630)
_headers              Netlify / Cloudflare Pages হেডার ও ক্যাশ
.htaccess             Apache / cPanel (HTTPS redirect, gzip, ক্যাশ, হেডার)
vercel.json           Vercel হেডার
set_domain.py         ডোমেইন বসানোর স্ক্রিপ্ট
```

## ১. আগে ডোমেইন বসান (জরুরি)
ফাইলগুলোতে এখন `https://raw-hub.vercel.app` বসানো আছে (canonical, og:url, sitemap, robots সব এখান থেকে আসে)। পরে নিজের ডোমেইন নিলে বদলাতে:
```
python3 set_domain.py https://আপনার-ডোমেইন.com
```
(Termux-এও চলবে।) ডোমেইন বদলালে এটা চালাতে ভুলবেন না, নইলে গুগল ভুল canonical পাবে।

## ২. ডিপ্লয় (যেকোনো একটা)
- **Cloudflare Pages / Netlify:** ফোল্ডার ড্র্যাগ-ড্রপ বা GitHub রিপো কানেক্ট। Build command খালি, output directory `/`।
- **GitHub Pages:** রিপোতে আপলোড, Settings > Pages > main branch। `_headers` ওখানে কাজ করে না (হেডার ছাড়াই সাইট চলে)।
- **Vercel:** রিপো ইমপোর্ট, framework "Other"।
- **Apache/cPanel:** `public_html`-এ সব ফাইল আপলোড (`.htaccess` সহ)।

## ৩. ডিপ্লয়ের পরে (গুগলে আনার ধাপ)
1. Google Search Console-এ প্রপার্টি যোগ করুন (Domain প্রপার্টি ভালো) এবং মালিকানা যাচাই করুন।
2. Sitemaps থেকে `https://আপনার-ডোমেইন.com/sitemap.xml` সাবমিট করুন।
3. URL Inspection-এ হোমপেজ দিয়ে "Request indexing" চাপুন।
4. Bing Webmaster Tools-এও একই কাজ করুন (Search Console থেকে import করা যায়)।
5. যাচাই টুল: Rich Results Test (FAQ/WebApplication স্কিমা), PageSpeed Insights (Core Web Vitals), Mobile-Friendly পরীক্ষা।

## ৪. র‍্যাঙ্কিং বাড়ানোর কাজ (কোডের বাইরে)
- **ব্যাকলিংক:** GitHub README-তে টুলের লিংক, Dev.to / Hashnode / Medium-এ "How to get raw link of a GitHub file" লেখা, Reddit (r/github, r/webdev), Product Hunt, Hacker News (Show HN), বাংলা টেক ব্লগ।
- **কনটেন্ট:** `/blog` বা আলাদা পেজে long-tail কিওয়ার্ড লিখুন: "github raw link generator", "convert github url to raw", "gist raw link", "github raw not working", "raw.githubusercontent.com cors"। প্রতি পেজে আলাদা title, description, canonical যোগ করুন এবং sitemap-এ তুলুন।
- নতুন পেজ বানালে `sitemap.xml` আপডেট করুন এবং `lastmod` বদলান (`set_domain.py` চালালেও আজকের তারিখ বসে)।
- নিজের ডোমেইন ব্যবহার করুন। `*.github.io` বা `*.netlify.app` সাবডোমেইনে র‍্যাঙ্ক করা কঠিন।

## SEO যা আগে থেকেই করা আছে
- সিঙ্গেল `<h1>`, `<main>`, `<header>`, `<footer>`, সঠিক হেডিং ক্রম, skip link
- Title (৬০+ অক্ষরের কিওয়ার্ডসহ), meta description, canonical, hreflang, robots (max-snippet ইত্যাদি)
- Open Graph + Twitter Card + 1200x630 শেয়ার ইমেজ
- JSON-LD: WebApplication, WebSite, FAQPage (দৃশ্যমান FAQ থেকে হুবহু তৈরি), BreadcrumbList
- robots.txt, sitemap.xml, 404 (noindex), manifest, favicon সেট
- দ্রুত লোড: বাইরের ফন্ট/লাইব্রেরি নেই, মোট ~৪০ KB, JS `defer`
- নিরাপত্তা হেডার (CSP, HSTS, nosniff, frame-ancestors)
- `prefers-reduced-motion`, কীবোর্ড ফোকাস ও aria লেবেল (অ্যাক্সেসিবিলিটি)

## সততার কথা
কোনো কোড বা এসইও সেটআপ গুগলে ১ নম্বরে আসার নিশ্চয়তা দিতে পারে না। র‍্যাঙ্কিং নির্ভর করে ডোমেইনের বয়স, ব্যাকলিংক ও প্রতিযোগিতার ওপর। "github raw link generator" জাতীয় কিওয়ার্ডে আগে থেকেই অনেক টুল আছে, তাই নতুন সাইটের জন্য কয়েক সপ্তাহ থেকে কয়েক মাস লাগতে পারে। এই প্রজেক্ট টেকনিক্যাল দিকটা পুরো ঠিক রাখে, বাকিটা ব্যাকলিংক আর কনটেন্ট দিয়ে হবে।

নামের নোট: পাবলিশের আগে গুগলে "RawHub" সার্চ করে দেখুন একই নামে বড় কোনো সার্ভিস বা ট্রেডমার্ক আছে কিনা। "GitHub" একটা ট্রেডমার্ক, তাই ফুটারের "Not affiliated with GitHub" লাইনটা রেখে দিন।
