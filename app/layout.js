import "./globals.css";
import Navbar from "@/components/navbar";
import { Provider } from "@/provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script src="https://unpkg.com/@phosphor-icons/web"></script>
      </head>
      <body>
        <Provider>
          <Navbar />
          <main>
            {children}
          </main>
        </Provider>
      </body>

    </html>
  );
}
