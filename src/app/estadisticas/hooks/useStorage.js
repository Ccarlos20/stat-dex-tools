"use client";

import { useState } from "react";

const STATS = ["Salud", "Ataque", "Defensa", "At. Esp.", "Def. Esp.", "Velocidad"];

export function useStorage() {
    // Inicializar desde localStorage o valores por defecto
    const iniciales = {};

    STATS.forEach(stat => {
        iniciales[`nivel-${stat}`] = localStorage.getItem(`nivel-${stat}`) ?? 1;
        iniciales[`base-${stat}`] = localStorage.getItem(`base-${stat}`) ?? 1;
        iniciales[`iv-${stat}`] = localStorage.getItem(`iv-${stat}`) ?? 0;
        iniciales[`ev-${stat}`] = localStorage.getItem(`ev-${stat}`) ?? 0;
    });

    iniciales.calculo = localStorage.getItem("calculo") ?? "nivel";
    iniciales.nivel = localStorage.getItem("nivel") ?? 50;
    iniciales.naturaleza = localStorage.getItem("naturaleza") ?? "neutral-neutral-0";

    const [valores, setValores] = useState(iniciales);

    const setValor = (key, value) => {
        localStorage.setItem(key, value);
        setValores(prev => ({ ...prev, [key]: value }));
    };

    return { valores, setValor };
}
