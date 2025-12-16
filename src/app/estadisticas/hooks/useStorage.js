"use client";

import { useState, useEffect } from "react";

const STATS = ["Salud", "Ataque", "Defensa", "At. Esp.", "Def. Esp.", "Velocidad"];

export function useStorage() {
    // Estado inicial vacío, safe para servidor
    const [valores, setValores] = useState({});

    // Solo en cliente: cargar desde localStorage o defaults
    useEffect(() => {
        const iniciales = {};

        STATS.forEach(stat => {
            iniciales[`nivel-${stat}`] = parseInt(localStorage.getItem(`nivel-${stat}`)) ?? 1;
            iniciales[`base-${stat}`] = parseInt(localStorage.getItem(`base-${stat}`)) ?? 1;
            iniciales[`iv-${stat}`] = parseInt(localStorage.getItem(`iv-${stat}`)) ?? 0;
            iniciales[`ev-${stat}`] = parseInt(localStorage.getItem(`ev-${stat}`)) ?? 0;
        });

        iniciales.calculo = localStorage.getItem("calculo") ?? "nivel";
        iniciales.nivel = parseInt(localStorage.getItem("nivel")) ?? 50;
        iniciales.naturaleza = localStorage.getItem("naturaleza") ?? "neutral-neutral-0";

        setValores(iniciales);
    }, []);

    const setValor = (key, value) => {
        if (typeof window !== "undefined") {
            // Guardar como número si corresponde
            const numValue = !isNaN(value) ? Number(value) : value;
            localStorage.setItem(key, numValue);
            setValores(prev => ({ ...prev, [key]: numValue }));
        }
    };

    return { valores, setValor };
}
