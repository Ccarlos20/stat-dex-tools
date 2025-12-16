"use client";

export function useCalculo(valores, setValor, modificadores) {
    const modo = valores.calculo || "nivel";

    const disabledMap = {
        nivel: "nivel",
        base: "base",
        iv: "iv",
        ev: "ev",
    };

    const isDisabled = (tipo) => disabledMap[modo] === tipo;

    const STATS = ["Salud", "Ataque", "Defensa", "At. Esp.", "Def. Esp.", "Velocidad"];

    const calcular = () => {
        const nivel = Number(valores["nivel"]) || 50;

        STATS.forEach((stat) => {
            const base = Number(valores[`base-${stat}`]);
            const iv = Number(valores[`iv-${stat}`]);
            const ev = Number(valores[`ev-${stat}`]);
            const nat = modificadores.buff === stat ? 1.1 : modificadores.nerf === stat ? 0.9 : 1;

            let resultado;

            if (stat === "Salud") {
                switch (modo) {
                    case "nivel":
                        resultado = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100 + nivel + 10);
                        setValor(`nivel-${stat}`, Math.max(1, resultado));
                        break;
                    case "base":
                        resultado = Math.round((((Number(valores[`nivel-${stat}`]) - nivel - 10) * 100) / nivel - iv - Math.floor(ev / 4)) / 2);
                        setValor(`base-${stat}`, Math.max(1, resultado));
                        break;
                    case "iv":
                        resultado = Math.round(((Number(valores[`nivel-${stat}`]) - nivel - 10) * 100) / nivel - 2 * base - Math.floor(ev / 4));
                        setValor(`iv-${stat}`, Math.max(0, resultado));
                        break;
                    case "ev":
                        resultado = Math.round((((Number(valores[`nivel-${stat}`]) - nivel - 10) * 100) / nivel - 2 * base - iv) * 4);
                        setValor(`ev-${stat}`, Math.max(0, resultado));
                        break;
                }
            } else {
                switch (modo) {
                    case "nivel":
                        resultado = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * nivel) / 100 + 5);
                        resultado = Math.floor(resultado * nat);
                        setValor(`nivel-${stat}`, Math.max(1, resultado));
                        break;
                    case "base":
                        resultado = Math.round((((Number(valores[`nivel-${stat}`]) / nat - 5) * 100) / nivel - iv - Math.floor(ev / 4)) / 2);
                        setValor(`base-${stat}`, Math.max(1, resultado));
                        break;
                    case "iv":
                        resultado = Math.round((((Number(valores[`nivel-${stat}`]) / nat - 5) * 100) / nivel - 2 * base - Math.floor(ev / 4)));
                        setValor(`iv-${stat}`, Math.max(0, resultado));
                        break;
                    case "ev":
                        resultado = Math.round((((Number(valores[`nivel-${stat}`]) / nat - 5) * 100) / nivel - 2 * base - iv) * 4);
                        setValor(`ev-${stat}`, Math.max(0, resultado));
                        break;
                }
            }
        });
    };

    return {
        calcular,
        isDisabled,
    };
}
