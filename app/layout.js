import { Montserrat, Playfair_Display } from "next/font/google";
import RevealInit from "@/components/reveal-init";
import { siteContent } from "@/lib/site-content";
import "./globals.css";

const serif = Playfair_Display({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
  variable: "--font-serif"
});

const sans = Montserrat({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans"
});

const themeBootstrapScript = `
(() => {
  const root = document.documentElement;
  const storageKey = "wedding-theme";
  try {
    const saved = window.localStorage.getItem(storageKey);
    const theme = saved === "dark" ? "dark" : "light";
    root.dataset.theme = theme;
    root.style.colorScheme = theme === "dark" ? "dark" : "light";
  } catch (error) {
    root.dataset.theme = "light";
    root.style.colorScheme = "light";
  }
})();
`;

export const metadata = {
  title: siteContent.seo.title,
  description: siteContent.seo.description
};

export default function RootLayout({ children }) {
  return (
    <html lang="kk" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body className={`${serif.variable} ${sans.variable}`}>
        <RevealInit />
        {children}
      </body>
    </html>
  );
}
