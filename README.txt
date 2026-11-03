MAA KINJESWARI FAST FOOD - installable web app

Files (sab ek hi folder me, repo ke root me rakhein):
  index.html            - poora app (website + ordering + owner dashboard)
  manifest.webmanifest  - app ka naam, icon, colour
  sw.js                 - offline cache (service worker)
  icon-*.png            - app icons

GitHub par kaise chadhayein:
  1. Repo kholo -> "Add file" -> "Upload files"
  2. Ye saari 9 files ek saath upload karo (sab ek hi folder me, koi sub-folder nahi), index.html replace ho jayega
  3. 1-2 minute baad site kholo (Chrome me), URL ke saath reload karo

Phone me app ki tarah install karna (Android / Chrome):
  1. Site kholo
  2. Upar 3-dot menu -> "Install app" (ya "Add to Home screen")
  3. Home screen par MKFF icon aa jayega - tap karo, browser bar ke bina khulega

iPhone (Safari):
  Share button -> "Add to Home Screen"

Dhyan rakhein:
  - Site HTTPS par honi chahiye (GitHub Pages par hai) - tabhi install option aata hai
  - index.html update karne ke baad phone me app ek baar band karke dobara kholna
