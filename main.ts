import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.155.0/http/file_server.ts";

const WEBHOOK_URL = Deno.env.get("WEBHOOK_URL");
if (!WEBHOOK_URL) {
  throw new Error("set WEBHOOK_URL env");
}

const indexPage = Deno.readFileSync("index.html");
const handler = (req: Request) => {
  if (req.method == "POST") return fetch(WEBHOOK_URL, req);
  if (new URL(req.url).pathname === "/") return new Response(indexPage);
  return serveDir(req);
};

serve(handler);
