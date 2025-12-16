export function calcularEfectividadEquipo(tiposEquipo, tiposJuego, tabla) {
    const tiposUsados = tiposEquipo.flat().filter(Boolean);

    if (tiposUsados.length === 0) return [];

    const contador = {};

    tiposUsados.forEach(tipo => {
        const efectivos = tabla[tipo] || [];
        efectivos.forEach(t => {
            contador[t] = (contador[t] || 0) + 1;
        });
    });

    return tiposJuego.map(tipo => {
        if (contador[tipo]) {
            return { tipo, estado: "eficaz" };
        }
        return { tipo, estado: "neutro" };
    });
}
