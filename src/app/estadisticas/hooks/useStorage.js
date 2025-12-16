"use client";

import { useEffect, useState } from "react";

export function useStorage() {
    const [valores, setValores] = useState({});

    useEffect(() => {
        const guardados = {};
        Object.keys(localStorage).forEach(k => {
            guardados[k] = localStorage.getItem(k);
        });
        setValores(guardados);
    }, []);

    const setValor = (key, value) => {
        localStorage.setItem(key, value);
        setValores(prev => ({ ...prev, [key]: value }));
    };

    return { valores, setValor };
}
