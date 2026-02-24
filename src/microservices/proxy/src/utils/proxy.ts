export async function proxy(c: any, targetHost: string) {
    const url = new URL(c.req.path, targetHost);
    url.search = new URLSearchParams(c.req.query()).toString();

    const res = await fetch(url.toString(), {
        method: c.req.method,
        headers: c.req.header(),
        body: c.req.raw.body,
    });

    return new Response(res.body, {
        status: res.status,
        headers: res.headers
    });
}
