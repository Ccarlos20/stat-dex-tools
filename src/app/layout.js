
import "@/styles/globals.css";

export const metadata = {
  title: "Stat Dex Tools",
  description: "Calculadoras y utilidades estadísticas para juegos basados en Pokémon",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
