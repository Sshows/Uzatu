import { Cormorant_Garamond, Great_Vibes, Manrope } from "next/font/google";
import { siteContent } from "@/lib/site-content";
import "./globals.css";

// TODO: Қаріп жұбын осы жерден ауыстырыңыз. Қазақ әріптері толық көрінетін шрифт таңдаңыз.
const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-serif"
});

const sans = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-sans"
});

const script = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-script"
});

export const metadata = {
  title: siteContent.seo.title,
  description: siteContent.seo.description
};

export default function RootLayout({ children }) {
  return (
    <html lang="kk">
      <body className={`${serif.variable} ${sans.variable} ${script.variable}`}>{children}</body>
    </html>
  );
}
