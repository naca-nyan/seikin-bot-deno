import { serve } from "https://deno.land/std@0.155.0/http/server.ts";
import discordwebhook from "https://deno.land/x/discordwebhook@v1.5.1/mod.ts";

const WEBHOOK_URL = Deno.env.get("WEBHOOK_URL");

if (!WEBHOOK_URL) {
  throw new Error("set WEBHOOK_URL env");
}
const webhook = new discordwebhook(WEBHOOK_URL);
const decoder = new TextDecoder();

const handler = async (req: Request) => {
  if (req.method == "POST") {
    await req.body?.pipeTo(
      new WritableStream({
        async write(chunk: Uint8Array) {
          const content = decoder.decode(chunk);
          const res = await webhook.createMessage(content);
          console.log(res);
        },
      })
    );
  }
  return new Response(Deno.readFileSync("./index.html"));
};

serve(handler);
