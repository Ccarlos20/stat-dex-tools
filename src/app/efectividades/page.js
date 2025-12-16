"use client";

import { useState, useEffect } from "react";

import stylesHome from "@/styles/page.module.css";
import styles from "@/styles/efectividades.module.css";

import TopNav from "@/components/TopNav";
import EfectividadesResultado from "@/components/EfectividadesResultado";
import { JUEGOS } from "@/config/juegos";

export default function EfectividadesPage() {
    const [juegoSeleccionado, setJuegoSeleccionado] = useState("");
    const [tiposEquipo, setTiposEquipo] = useState([]);

    const handleLimpiarEquipo = () => {
        setJuegoSeleccionado("");
        setTiposEquipo([]);
        localStorage.removeItem("efectividadesEquipo");
    };

    const handleGuardarEquipo = () => {
        if (!juegoSeleccionado) return;

        const data = {
            juego: juegoSeleccionado,
            equipo: tiposEquipo
        };

        localStorage.setItem("efectividadesEquipo", JSON.stringify(data));
    };

    useEffect(() => {
        const guardado = localStorage.getItem("efectividadesEquipo");
        if (!guardado) return;

        try {
            const data = JSON.parse(guardado);

            if (!data.juego || !JUEGOS[data.juego]) return;

            setJuegoSeleccionado(data.juego);

            const max = JUEGOS[data.juego].maxCriaturas;

            const equipoNormalizado = Array.from(
                { length: max },
                (_, i) => data.equipo?.[i] ?? ["", ""]
            );

            setTiposEquipo(equipoNormalizado);
        } catch (e) {
            console.error("Datos corruptos en localStorage", e);
            localStorage.removeItem("efectividadesEquipo");
        }
    }, []);

    return (
        <div className={stylesHome.page}>
            <TopNav paginaActiva="efectividades" />

            <main className={stylesHome.main}>
                <div className={styles.layout}>
                    <section className={styles.left}>
                        <div>
                            <label>Juego</label>
                            <select
                                value={juegoSeleccionado}
                                onChange={(e) => {
                                    const juego = e.target.value;
                                    setJuegoSeleccionado(juego);
                                    setTiposEquipo(
                                        juego
                                            ? Array.from(
                                                { length: JUEGOS[juego].maxCriaturas },
                                                () => ["", ""]
                                            )
                                            : []
                                    );
                                }}
                            >
                                <option value="">Seleccionar juego</option>
                                <option value="pokemon">Pokémon</option>
                                <option value="loomian">Loomian Legacy</option>
                            </select>
                        </div>

                        {juegoSeleccionado &&
                            tiposEquipo.map((tipos, index) => (
                                <div key={index} className={styles.creatureRow}>
                                    <strong className={styles.creatureLabel}>
                                        {JUEGOS[juegoSeleccionado].alias} {index + 1}
                                    </strong>

                                    <select
                                        value={tipos[0]}
                                        onChange={(e) => {
                                            const nuevoEquipo = tiposEquipo.map((item, i) =>
                                                i === index
                                                    ? [e.target.value, item[1]]
                                                    : item
                                            );
                                            setTiposEquipo(nuevoEquipo);
                                        }}
                                    >
                                        <option value="">Tipo 1</option>
                                        {JUEGOS[juegoSeleccionado].tipos.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>

                                    <select
                                        value={tipos[1]}
                                        onChange={(e) => {
                                            const nuevoEquipo = tiposEquipo.map((item, i) =>
                                                i === index
                                                    ? [item[0], e.target.value]
                                                    : item
                                            );
                                            setTiposEquipo(nuevoEquipo);
                                        }}
                                    >
                                        <option value="">Tipo 2</option>
                                        {JUEGOS[juegoSeleccionado].tipos.map((t) => (
                                            <option key={t} value={t}>
                                                {t}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            ))}

                        {juegoSeleccionado && (
                            <div className={styles.actions}>
                                <button
                                    type="button"
                                    onClick={handleLimpiarEquipo}
                                    className={styles.btnSecondary}
                                >
                                    Limpiar equipo
                                </button>

                                <button
                                    type="button"
                                    onClick={handleGuardarEquipo}
                                    className={styles.btnPrimary}
                                >
                                    Guardar equipo
                                </button>
                            </div>
                        )}

                    </section>

                    <section className={styles.right}>
                        <h2>Resultado</h2>
                        <EfectividadesResultado
                            juego={juegoSeleccionado}
                            tiposEquipo={tiposEquipo}
                        />
                    </section>
                </div>
            </main>
        </div>
    );
}
