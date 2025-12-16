export const EFECTIVIDADES_POKEMON = {
    Fuego: ["Planta", "Hielo", "Bicho", "Acero"],
    Agua: ["Fuego", "Roca", "Tierra"],
    Planta: ["Agua", "Roca", "Tierra"],
    Eléctrico: ["Agua", "Volador"],
    Hielo: ["Planta", "Dragón", "Tierra", "Volador"],
    Lucha: ["Normal", "Hielo", "Roca", "Siniestro", "Acero"],
    Veneno: ["Planta", "Hada"],
    Tierra: ["Fuego", "Eléctrico", "Veneno", "Roca", "Acero"],
    Volador: ["Planta", "Lucha", "Bicho"],
    Psíquico: ["Lucha", "Veneno"],
    Bicho: ["Planta", "Psíquico", "Siniestro"],
    Roca: ["Fuego", "Hielo", "Volador", "Bicho"],
    Fantasma: ["Psíquico", "Fantasma"],
    Siniestro: ["Psíquico", "Fantasma"],
    Dragón: ["Dragón"],
    Acero: ["Hielo", "Roca", "Hada"],
    Hada: ["Lucha", "Siniestro", "Dragón"]
};
