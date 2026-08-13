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
    desc: "React Native news app with an integrated LLM chatbot, debugged and optimized in production.",
    device: "mobile",
    slug: "manado-post",
    images: [],
  },
  {
    name: "Stunting Case Monitoring App",
    desc: "React Native app tracking and visualizing stunting cases across North Minahasa.",
    device: "mobile",
    slug: "stunting-app",
    images: [],
  },
  {
    name: "Digital Graduation Invitation Platform",
    desc: "Responsive React platform streamlining 12th-grade graduation registration.",
    device: "mobile",
    slug: "digital-graduation",
    images: [],
  },
  {
    name: "Student Council (OSIS) E-Voting System",
    desc: "Secure, transparent React web app for streamlined student council elections.",
    device: "desktop",
    slug: "student-council",
    images: [],
  },
  {
    name: "Student Fitness Tracking Platform",
    desc: "Strava-inspired React dashboard for teachers to monitor student activity (PE class).",
    device: "desktop",
    slug: "student-fitness",
    images: [],
  },
];
