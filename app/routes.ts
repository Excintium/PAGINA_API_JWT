import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    // Esta es la ruta raíz ("/") que apunta a tu página de login
    index("routes/home.tsx"),

    // Esta es la nueva ruta que creamos para "/products"
    route("products", "routes/products.tsx"),
] satisfies RouteConfig;