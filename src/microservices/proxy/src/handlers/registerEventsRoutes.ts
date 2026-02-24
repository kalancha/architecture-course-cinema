import { Hono } from "hono";
import { proxy } from "../utils/proxy";

export function registerEventsRoutes(app: Hono) {
    app.all('/api/events/*', async (c) => {
        return await proxy(c, process.env.EVENTS_SERVICE_URL || 'http://localhost:8082');
    });
}
