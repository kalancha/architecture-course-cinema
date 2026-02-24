import { Hono } from "hono";
import { proxy } from "../utils/proxy";
import { shouldProxyIntoMicroservice } from "../utils/shouldProxyIntoMicroservice";

export function registerMoviesRoutes(app: Hono) {
    app.all('/api/movies/*', async (c) => {
        if (shouldProxyIntoMicroservice()) {
            return await proxy(c, process.env.MOVIES_SERVICE_URL || 'http://localhost:8081');
        }

        return await proxy(c, process.env.MONOLITH_URL || 'http://localhost:8080');
    });
}
