import { serve } from "https://deno.land/std@0.155.0/http/server.ts";

const WEBHOOK_URL = Deno.env.get("WEBHOOK_URL");
if (!WEBHOOK_URL) {
  throw new Error("set WEBHOOK_URL env");
}

const handler = (req: Request) => {
  if (req.method == "POST") return fetch(WEBHOOK_URL, req);
  return new Response(Deno.readFileSync("./index.html"));
};

serve(handler);
