import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

const WEBHOOK_URL = Deno.env.get("WEBHOOK_URL");

if (!WEBHOOK_URL) {
  throw new Error("set WEBHOOK_URL env");
}

const index = await Deno.readFile("index.html");

const handler = (req: Request) => {
  switch (req.method) {
    case "GET":
      return new Response(index);
    case "POST":
      return fetch(WEBHOOK_URL, req);
  }
  return new Response("Bad request", { status: 400 });
};

serve(handler);
