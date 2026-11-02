# PanelPro Auto Spares — Part 3

## Project overview
This is the Part 3 update of the existing PanelPro Auto Spares website. The original pages and business content have been retained and enhanced with JavaScript functionality, forms, SEO improvements and deployment files.

## Pages
- `index.html` — home page, interactive FAQ accordion and clickable image lightbox.
- `about.html` — business story and mission.
- `services.html` — JavaScript-generated service highlight cards, services list with live search and alphabetical sorting.
- `contactus.html` — contact details, validated contact form and Johannesburg map.
- `enquiry.html` — product/service enquiry form with validation and email preparation.

## Folder structure
```text
PanelPro_Part3/
├── index.html
├── about.html
├── services.html
├── contactus.html
├── enquiry.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── _images/              # Put the existing project image files here
├── robots.txt
├── sitemap.xml
└── README.md
```

## How to run locally
1. Extract the project folder.
2. Copy your existing image files into `_images/`. Keep the filenames used in the HTML, including `logo.png`, `OIP.webp`, `1000_F_617261314_xTyqElz3wunGT6JPWCCNeLyfTO0t5FWx.jpg` and `engine.jpg`.
3. Open `index.html` in a browser. For the map and best local testing, use VS Code Live Server or another local web server.
4. Test all navigation links, service search/sort, FAQ buttons, image lightbox, and both forms.

## Form and email note
The forms validate required fields, email format, phone format, text length and quantity in the browser. On a valid submission, JavaScript compiles the information into a `mailto:` email addressed to `sales@panelpro.co.za`. The visitor must press Send in their email application. This static website does not have a server-side email service, database, or live stock/pricing connection. Therefore the enquiry response explains that the business must confirm current availability and quote. For automatic email delivery, connect a trusted form backend or server-side email service and configure it securely.

## Map note
The map uses Leaflet and OpenStreetMap tiles loaded from public CDNs. The marker is at Johannesburg city-centre coordinates only; it is not a verified pin for 28 Auto Way. Confirm and replace the coordinates with the real business location before presenting the map as an exact location. An internet connection is required for the map.

## SEO and deployment
- Each page has a unique page title, meta description and relevant keywords.
- Heading hierarchy, descriptive image alt text, mobile viewport and clean page filenames are retained or added.
- `robots.txt` allows normal crawling.
- `sitemap.xml` lists the five site pages.
- **Before deployment:** replace `YOUR-DOMAIN` in both `robots.txt` and `sitemap.xml` with the actual live domain.
- Submit the sitemap URL to Google Search Console after deployment.
- Off-page SEO is ongoing work: share the live website on official social media profiles and request relevant, genuine links from suppliers/partners. Do not buy spam backlinks.
- Test mobile layout and page speed after uploading the real image assets. Compress large images and use descriptive filenames.

## Part 3 changelog
### 2026-11-02 — Part 3 functionality and SEO
- Added unique SEO page titles, meta descriptions, keywords, author and social-sharing metadata to the existing pages.
- Added `enquiry.html` with fields for customer details, enquiry category, vehicle, required part, quantity and additional information.
- Added `contactus.html` form for general messages, including contact details and message category.
- Added client-side JavaScript validation and clear validation messages for both forms.
- Added JavaScript to compile validated form details into an email addressed to `sales@panelpro.co.za`.
- Added a clear enquiry response explaining that live stock and prices must be confirmed by the business; no stock or price values are invented.
- Added an interactive FAQ accordion on the home page.
- Added JavaScript-generated service highlight cards, service search and alphabetical sorting on the services page using JavaScript DOM manipulation.
- Added a clickable image lightbox to enlarge the home-page highlight images.
- Added an interactive Leaflet/OpenStreetMap map centred on Johannesburg. The marker is city-level and must be updated to the verified business coordinates.
- Added responsive CSS styling, visible keyboard focus, accessible labels, status/error areas and reduced-motion support.
- Added `robots.txt` and `sitemap.xml`; the live domain placeholder must be replaced before deployment.
- Added this README with setup instructions, deployment notes and a detailed changelog.

## Testing checklist
- [ ] All five pages open and navigation links work.
- [ ] Home-page FAQ expands and collapses.
- [ ] Home-page images open in a lightbox and close with the Close button or Escape.
- [ ] Services search filters the list and sorting changes its order.
- [ ] Empty/invalid contact form is blocked with a validation message.
- [ ] Valid contact form prepares an email to `sales@panelpro.co.za`.
- [ ] Empty/invalid enquiry form is blocked with a validation message.
- [ ] Valid enquiry form prepares an email to `sales@panelpro.co.za`.
- [ ] Map loads when internet access is available; exact coordinates are verified.
- [ ] Real image assets are copied into `_images/`.
- [ ] `YOUR-DOMAIN` is replaced in robots.txt and sitemap.xml before deployment.
- [ ] Website is deployed and checked on desktop and mobile.
