import styles from "@/styles/nav.module.css";

export default function TopNav({ paginaActiva }) {
    return (
        <nav className={styles.nav}>
            <a href="/" className={styles.navTitle}>
                Stat Dex Tools
            </a>

            <ul className={styles.navList}>
                <li>
                    <a
                        href="/efectividades"
                        className={paginaActiva === "efectividades" ? styles.active : ""}
                    >
                        Verificar Efectividades
                    </a>
                </li>

                <li>
                    <a
                        href="/estadisticas"
                        className={paginaActiva === "estadisticas" ? styles.active : ""}
                    >
                        Calcular Estadísticas
                    </a>
                </li>

                <li>
                    <a
                        href="/aleatorio"
                        className={paginaActiva === "aleatorio" ? styles.active : ""}
                    >
                        Generar Número Aleatorio
                    </a>
                </li>
            </ul>
        </nav>
    );
}
