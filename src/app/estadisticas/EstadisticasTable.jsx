"use client";

import styles from "@/styles/estadisticas.module.css";
import { useStorage } from "./hooks/useStorage";
import { useNaturaleza } from "./hooks/useNaturaleza";
import { useCalculo } from "./hooks/useCalculo";

const STATS = ["Salud", "Ataque", "Defensa", "At. Esp.", "Def. Esp.", "Velocidad"];

export default function EstadisticasTable() {
    const { valores, setValor } = useStorage();
    const { setNaturaleza, modificadores } = useNaturaleza(valores.naturaleza);
    const { calcular, isDisabled } = useCalculo(valores, setValor, modificadores);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validación: no permitir campos vacíos
        for (const stat of STATS) {
            for (const tipo of ["nivel", "base", "iv", "ev"]) {
                const value = valores[`${tipo}-${stat}`];
                if (value === "" || value === undefined || value === null) {
                    alert(`El campo ${tipo} de ${stat} no puede estar vacío.`);
                    return;
                }
            }
        }

        calcular();
    };

    return (

        <form onSubmit={handleSubmit}>
            <section className={styles.controls}>
                <div className={styles.control}>
                    <label>Calcular:</label>
                    <select
                        className={styles.select}
                        value={valores.calculo || "nivel"}
                        required
                        onChange={(e) => setValor("calculo", e.target.value)}
                    >
                        <option value="nivel">Estadística Final</option>
                        <option value="base">Estadística Base</option>
                        <option value="iv">IV</option>
                        <option value="ev">EV</option>
                    </select>
                </div>

                <div className={styles.control}>
                    <label>Nivel</label>
                    <input
                        type="number"
                        className={styles.input}
                        value={valores.nivel || 50}
                        min={1}
                        required
                        onChange={(e) => setValor("nivel", e.target.value)}
                    />
                </div>

                <div className={styles.control}>
                    <label>Naturaleza</label>
                    <select
                        className={styles.select}
                        value={valores.naturaleza || "neutral-neutral-0"}
                        required
                        onChange={(e) => {
                            setValor("naturaleza", e.target.value);
                            setNaturaleza(e.target.value);
                        }}
                    >
                        <option value="neutral-neutral-0">Fuerte (neutral)</option>
                        <option value="Defensa-Ataque">Osada (+Def, -Atk)</option>
                        <option value="At. Esp.-Ataque">Modesta (+SpA, -Atk)</option>
                        <option value="Def. Esp.-Ataque">Serena (+SpD, -Atk)</option>
                        <option value="Velocidad-Ataque">Miedosa (+Vel, -Atk)</option>
                        <option value="Ataque-Defensa">Huraña (+Atk, -Def)</option>
                        <option value="neutral-neutral-1">Dócil (neutral)</option>
                        <option value="At. Esp.-Defensa">Afable (+SpA, -Def)</option>
                        <option value="Def. Esp.-Defensa">Amable (+SpD, -Def)</option>
                        <option value="Velocidad-Defensa">Activa (+Vel, -Def)</option>
                        <option value="Ataque-At. Esp.">Firme (+Atk, -SpA)</option>
                        <option value="Defensa-At. Esp.">Agitada (+Def, -SpA)</option>
                        <option value="neutral-neutral-2">Tímida (neutral)</option>
                        <option value="Def. Esp.-At. Esp.">Cauta (+SpD, -SpA)</option>
                        <option value="Velocidad-At. Esp.">Alegre (+Vel, -SpA)</option>
                        <option value="Ataque-Def. Esp.">Pícara (+Atk, -SpD)</option>
                        <option value="Defensa-Def. Esp.">Floja (+Def, -SpD)</option>
                        <option value="At. Esp.-Def. Esp.">Alocada (+SpA, -SpD)</option>
                        <option value="neutral-neutral-3">Rara (neutral)</option>
                        <option value="Velocidad-Def. Esp.">Ingenua (+Vel, -SpD)</option>
                        <option value="Ataque-Velocidad">Audaz (+Atk, -Vel)</option>
                        <option value="Defensa-Velocidad">Plácida (+Def, -Vel)</option>
                        <option value="At. Esp.-Velocidad">Mansa (+SpA, -Vel)</option>
                        <option value="Def. Esp.-Velocidad">Grosera (+SpD, -Vel)</option>
                        <option value="neutral-neutral-4">Seria (neutral)</option>
                    </select>
                </div>
            </section>
            <div className={styles.statsContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Stat</th>
                            <th>Final</th>
                            <th>Base</th>
                            <th>IV</th>
                            <th>EV</th>
                            <th>Naturaleza</th>
                        </tr>
                    </thead>
                    <tbody>
                        {STATS.map((stat) => (
                            <tr
                                key={stat}
                                className={
                                    `${modificadores.buff === stat ? styles.buffed :
                                        modificadores.nerf === stat ? styles.nerfed : ""}`
                                }
                            >
                                <th>{stat}</th>
                                {["nivel", "base", "iv", "ev"].map((tipo) => {
                                    let min = tipo === "iv" ? 0 : 1;
                                    let max = tipo === "iv" ? 31 : tipo === "ev" ? 252 : undefined;

                                    return (
                                        <td key={tipo}>
                                            <input
                                                type="number"
                                                className={styles.input}
                                                value={valores[`${tipo}-${stat}`] || min}
                                                min={min}
                                                max={max}
                                                required
                                                disabled={isDisabled(tipo)}
                                                onChange={(e) =>
                                                    setValor(`${tipo}-${stat}`, e.target.value)
                                                }
                                            />
                                        </td>
                                    );
                                })}
                                <td className={
                                    `${styles.naturalezaCell}
                                ${modificadores.buff === stat ? styles.buff :
                                        modificadores.nerf === stat ? styles.nerf : ""}`}>
                                    {modificadores.buff === stat && "▲▲▲"}
                                    {modificadores.nerf === stat && "▼▼▼"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            <div className={styles.actions}>
                <button type="submit" className={styles.button}>
                    Calcular
                </button>
            </div>
        </form >
    );
}
