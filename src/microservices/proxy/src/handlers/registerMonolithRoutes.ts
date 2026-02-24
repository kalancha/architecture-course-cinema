import { Hono } from "hono";
import { proxy } from "../utils/proxy";

export function registerMonolithRoutes(app: Hono) {
    app.all('/api/*', async (c) => {
        return await proxy(c, process.env.MONOLITH_URL || 'http://localhost:8080');
    });
}
