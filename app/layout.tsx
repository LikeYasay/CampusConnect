import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Kumbh_Sans } from "next/font/google";

const kumbh = Kumbh_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Campus Connect",
  description: "Your all-in-one hub for lost & found and student forums.",
  icons: {
    icon: "/CIT_LOGO.png", 
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Kumbh Sans applied to whole app */}
      <body className={kumbh.className + " bg-white text-foreground"}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
