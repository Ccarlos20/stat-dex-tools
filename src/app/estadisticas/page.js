"use client";

import stylesHome from "@/styles/page.module.css";
import styles from "@/styles/estadisticas.module.css";

import TopNav from "@/components/TopNav";
import EstadisticasTable from "./EstadisticasTable";

export default function EstadisticasPage() {
    return (
        <div className={stylesHome.page}>
            <TopNav paginaActiva="estadisticas" />

            <main className={stylesHome.main}>
                <h3 className={styles.title}>Estadísticas Pokémon</h3>
                <EstadisticasTable />
            </main>
        </div>
    );
}
