import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

const WEBHOOK_URL = Deno.env.get("WEBHOOK_URL");

if (!WEBHOOK_URL) {
  throw new Error("set WEBHOOK_URL env");
}

const index = await Deno.readFile("index.html");

const getType = (path: string) => {
  switch (path.split(".").pop()) {
    case "js":
      return "text/javascript";
    case "css":
      return "text/css";
    default:
      return "text/plain";
  }
};

const getHandler = (req: Request) => {
  const url = new URL(req.url);
  if (url.pathname == "/") {
    return new Response(index, { headers: { "Content-Type": "text/html" } });
  }

  try {
    const file = Deno.openSync("." + url.pathname);
    return new Response(file.readable, {
      headers: {
        "Content-Type": getType(url.pathname),
      },
    });
  } catch {
    return Response.redirect(url.origin);
  }
};

const handler = (req: Request) => {
  switch (req.method) {
    case "GET":
      return getHandler(req);
    case "POST":
      return fetch(WEBHOOK_URL, req);
  }
  return new Response("Bad request", { status: 400 });
};

serve(handler);
