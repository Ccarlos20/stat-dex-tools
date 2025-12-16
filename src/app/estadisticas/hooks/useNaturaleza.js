"use client";

import { useState, useEffect } from "react";

export function useNaturaleza(valorInicial) {
    const [naturaleza, setNaturaleza] = useState(valorInicial || "neutral-neutral");

    useEffect(() => {
        if (valorInicial) setNaturaleza(valorInicial);
    }, [valorInicial]);

    const [buff, nerf] = (() => {
        const parts = naturaleza.split("-");
        return [
            parts[0],             // buff
            parts[1] && isNaN(parts[1]) ? parts[1] : null  // nerf solo si no es número
        ];
    })();

    return {
        naturaleza,
        setNaturaleza,
        modificadores: {
            buff: buff !== "neutral" ? buff : null,
            nerf: nerf !== "neutral" ? nerf : null,
        },
    };
}
