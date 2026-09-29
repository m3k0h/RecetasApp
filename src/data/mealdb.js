const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

function estimarDificultad(cantidadIngredientes) {
    if (cantidadIngredientes <= 6) return "Fácil";
    if (cantidadIngredientes <= 12) return "Media";
    return "Difícil";
}

function extraerIngredientes(meal) {
    const ingredientes = [];
    for (let i = 1; i <= 20; i++) {
        const ingrediente = meal[`strIngredient${i}`];
        const medida = meal[`strMeasure${i}`];
        if (ingrediente && ingrediente.trim()) {
            ingredientes.push(
                medida && medida.trim()
                    ? `${medida.trim()} ${ingrediente.trim()}`
                    : ingrediente.trim(),
            );
        }
    }
    return ingredientes;
}

function extraerPasos(instrucciones) {
    const lineas = (instrucciones || "")
        .split(/\r\n|\n/)
        .map((linea) => linea.trim())
        .filter(Boolean);

    if (lineas.length > 1) return lineas;

    // algunas recetas vienen como un solo parrafo sin saltos de linea
    return (instrucciones || "")
        .split(/(?<=\.)\s+/)
        .map((paso) => paso.trim())
        .filter(Boolean);
}

function adaptarReceta(meal) {
    const ingredientes = extraerIngredientes(meal);

    return {
        id: `mealdb-${meal.idMeal}`,
        nombre: meal.strMeal,
        imagen: { uri: meal.strMealThumb },
        categoria: meal.strCategory || "Internacional",
        tiempoMin: 30 + ingredientes.length * 5, // TheMealDB no da este dato: se estima
        porciones: 4, // TheMealDB no da este dato: valor por defecto
        dificultad: estimarDificultad(ingredientes.length),
        autor: "TheMealDB",
        ingredientes,
        pasos: extraerPasos(meal.strInstructions),
        favorito: false,
    };
}

async function obtenerRecetasDeCategoria(categoria, cantidad) {
    const resFiltro = await fetch(`${BASE_URL}/filter.php?c=${categoria}`);
    const { meals } = await resFiltro.json();
    if (!meals) return [];

    const seleccionados = meals.slice(0, cantidad);
    const detalles = await Promise.all(
        seleccionados.map((m) =>
            fetch(`${BASE_URL}/lookup.php?i=${m.idMeal}`).then((r) => r.json()),
        ),
    );

    return detalles
        .filter((detalle) => detalle.meals && detalle.meals[0])
        .map((detalle) => adaptarReceta(detalle.meals[0]));
}

const CATEGORIAS_POR_DEFECTO = ["Dessert", "Seafood", "Vegetarian", "Chicken"];

export async function obtenerRecetasDeTheMealDB(
    categorias = CATEGORIAS_POR_DEFECTO,
    cantidadPorCategoria = 5,
) {
    const resultados = await Promise.all(
        categorias.map((categoria) =>
            obtenerRecetasDeCategoria(categoria, cantidadPorCategoria),
        ),
    );
    return resultados.flat();
}
