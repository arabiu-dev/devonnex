import "./globals.css";
import { Urbanist, Roboto } from "next/font/google";
import AuthProvider from "@/contexts/authContexts";
import ChatProvider from "@/contexts/chatContext";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Wrapper from "../utils/queryClient";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Devonnex - The global talent marketplace",
  description: "Get more done with Devonnex - the global talent marketplace.",
  keywords:
    "Freelance developer, Hire freelance developers, Developer freelancing services,\
    Top freelance developers, Remote developer jobs, Freelance coding projects,\
    Developer gig marketplace, Best freelance platforms for developers, Hire skilled developers,\
    Custom software development freelancers, Web development freelancers, Mobile app development freelancers,\
    Software engineering freelancers, Freelance API integration, E- commerce development freelancers",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={urbanist.className}
        id="top"
      >
        <link rel="icon" href="/favicon.svg" sizes="any" />
        <Wrapper>
          <AuthProvider>
            <ChatProvider>
              <Header />
              {children}
              <Footer />
            </ChatProvider>
            <ReactQueryDevtools />
          </AuthProvider>
        </Wrapper>
        <div className="body-bg-shape"></div>
      </body>
    </html>
  );
}
