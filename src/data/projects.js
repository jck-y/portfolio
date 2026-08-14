/**
 * Projects — screenshot showcase data.
 *
 * Cara menambahkan screenshot:
 * 1. Letakkan file gambar di `public/projects/<slug>/` (mis. `public/projects/manado-post/1.png`).
 * 2. Daftarkan path-nya di `images`, misalnya:
 *      images: ["/projects/manado-post/1.png", "/projects/manado-post/2.png", "/projects/manado-post/3.png"],
 *    Minimal 3 screenshot per project agar carousel-nya terasa lengkap.
 * 3. `device: "mobile"` menampilkan frame HP, `device: "desktop"` menampilkan frame browser.
 *
 * Selama `images` masih kosong, carousel menampilkan 3 slot placeholder.
 */

export const projects = [
  {
    name: "Manado Post App & AI Chatbot",
    desc: "React Native news app with an integrated LLM chatbot, debugged and optimized for 10,000+ active downloads on Google Play. (React Native, AI Integration, Web Scraping)",
    device: "mobile",
    slug: "manado-post",
    images: [
      "/projects/manado-post/1.webp",
      "/projects/manado-post/2.webp",
      "/projects/manado-post/3.webp",
      "/projects/manado-post/4.webp",
    ],
  },
  {
    name: "Stunting Case Monitoring App",
    desc: "Data-driven mobile application tracking and visualizing stunting cases across North Minahasa to directly support health evaluations. (React Native, Data Visualization)",
    device: "mobile",
    slug: "stunting-app",
    images: [
      "/projects/stunting-app/1.webp",
      "/projects/stunting-app/2.webp",
      "/projects/stunting-app/3.webp",
    ],
  },
  {
    name: "Digital Graduation Invitation Platform",
    desc: "Responsive platform streamlining 12th-grade graduation registration with online RSVP, guest management, and automated Google Sheets data collection. (React, Google Apps Script, Fetch API)",
    device: "mobile",
    slug: "digital-graduation",
    images: [
      "/projects/digital-graduation/1.webp",
      "/projects/digital-graduation/2.webp",
      "/projects/digital-graduation/3.webp",
      "/projects/digital-graduation/4.webp",
      "/projects/digital-graduation/5.webp",
      "/projects/digital-graduation/6.webp",
    ],
  },
  {
    name: "Student Council (OSIS) E-Voting System",
    desc: "Secure, fast, and transparent web application to facilitate a streamlined student council election process. (React, Firebase Auth)",
    device: "desktop",
    slug: "student-council",
    images: [
      "/projects/student-council/1.webp",
      "/projects/student-council/2.webp",
      "/projects/student-council/3.webp",
    ],
  },
  {
    name: "Student Fitness Tracking Platform",
    desc: "Strava-inspired dashboard tracking 80 students' physical activities, successfully reducing teachers' manual monitoring time by 8 hours/week. (React, Supabase, Geolocation)",
    device: "mobile",
    slug: "student-fitness",
    images: [
      "/projects/student-fitness/1.webp",
      "/projects/student-fitness/2.webp",
      "/projects/student-fitness/3.webp",
      "/projects/student-fitness/4.webp",
      "/projects/student-fitness/5.webp",
    ],
  },
];
