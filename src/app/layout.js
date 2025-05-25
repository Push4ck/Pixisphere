import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pixisphere - Find Your Photographer",
  description:
    "Find the best photographers for maternity, newborn, birthday, and other special shoots.",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
        </body>
      </html>
    </>
  );
}
