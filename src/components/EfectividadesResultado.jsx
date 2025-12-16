import { JUEGOS } from "@/config/juegos";
import { EFECTIVIDADES_POR_JUEGO } from "@/config/efectividades";
import { calcularEfectividadEquipo } from "@/logic/calcularEfectividad";

import styles from "@/styles/efectividades.module.css"

export default function EfectividadesResultado({ juego, tiposEquipo }) {
    if (!juego) {
        return <p>Selecciona un juego para comenzar.</p>;
    }

    const configJuego = JUEGOS[juego];
    const tablaEfectividades = EFECTIVIDADES_POR_JUEGO[juego];

    if (!configJuego || !tablaEfectividades) {
        return <p>Juego no soportado.</p>;
    }

    const resultado = calcularEfectividadEquipo(
        tiposEquipo,
        configJuego.tipos,
        tablaEfectividades
    );

    if (resultado.length === 0) {
        return <p>Selecciona al menos un tipo.</p>;
    }

    return (
        <div className={styles.grid}>
            {resultado.map(({ tipo, estado }) => (
                <div
                    key={tipo}
                    className={`${styles.cell} ${estado === "eficaz"
                        ? styles.eficaz
                        : styles.noEficaz
                        }`}
                >
                    <div className={styles.tipo}>{tipo}</div>
                    <div className={styles.estado}>
                        {estado === "eficaz" ? "▲▲▲" : "▼"}
                    </div>
                </div>
            ))}
        </div>
    );
}
