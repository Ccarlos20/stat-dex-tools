"use client";

import { useState } from "react";
import stylesHome from "@/styles/page.module.css";
import TopNav from "@/components/TopNav";
import styles from "@/styles/Aleatorio.module.css";

export default function AleatorioPage() {
    const [n, setN] = useState(2);
    const [numeroObtenido, setNumeroObtenido] = useState("");
    const [numeroTransformado, setNumeroTransformado] = useState("");

    function transformarNumero(n, valor) {
        if (valor === 1 || valor === 3 * n + 2) return null;
        if (valor >= 2 && valor <= n + 1) return valor - 1;
        if (valor >= n + 2 && valor <= 2 * n + 1) return valor - (n + 1);
        if (valor >= 2 * n + 2 && valor <= 3 * n + 1) return valor - (2 * n + 1);
        return null;
    }

    function generar(event) {
        if (event) event.preventDefault(); // Evita recargar la página

        const nVal = Number(n);
        if (!nVal || nVal <= 1) {
            setNumeroObtenido("");
            setNumeroTransformado("");
            return;
        }

        let aleatorio, transformado;
        do {
            aleatorio = Math.floor(Math.random() * (3 * nVal + 2)) + 1;
            transformado = transformarNumero(nVal, aleatorio);
        } while (transformado === null);

        setNumeroObtenido(aleatorio);
        setNumeroTransformado(transformado);
    }

    return (
        <div className={stylesHome.page}>
            <TopNav paginaActiva="aleatorio" />
            <main className={stylesHome.main}>
                <div className={styles.contenedor}>
                    <h2 className={styles.titulo}>Generador Aleatorio</h2>
                    <form onSubmit={generar}>
                        <table className={styles.tabla}>
                            <thead>
                                <tr>
                                    <th>Ingresar Número</th>
                                    <th>Número Obtenido</th>
                                    <th>Número Transformado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="number"
                                            min="2"
                                            value={n}
                                            onChange={(e) => setN(e.target.value)}
                                            className={styles.inputNumero}
                                            required
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={numeroObtenido}
                                            readOnly
                                            className={styles.inputReadonly}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            value={numeroTransformado}
                                            readOnly
                                            className={styles.inputReadonly}
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button type="submit" className={styles.botonGenerar}>
                            Generar número
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
