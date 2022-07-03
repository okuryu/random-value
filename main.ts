import { serve } from "https://deno.land/std@0.146.0/http/server.ts";

function handler(req: Request) {
  const url = new URL(req.url);

  if (req.method === "GET" && url.pathname === "/") {
    const search = new URLSearchParams(url.search);
    const max = parseInt(search.get("max") || "", 10);
    if (!isNaN(max)) {
      const min = 1;
      const value = Math.floor(Math.random() * max) + min;
      const body = `<!DOCTYPE html>
<html lang="en">
<meta name="description" content="random value between ${min} - ${max}" />
<title>${value}</title>
<p>${value}</p>
<p>random value between ${min} - ${max}</p>
`;
      return new Response(body, {
        status: 200,
        headers: {
          "content-type": "text/html; charset=UTF-8",
        },
      });
    }
  }

  const body404 = `<!DOCTYPE html>
<html lang="en">
<meta name="description" content="random value" />
<title>random value</title>
<p>Not Found</p>
`;
  return new Response(body404, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=UTF-8",
    },
  });
}

await serve(handler);
