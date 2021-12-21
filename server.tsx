// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();

const colors = ["blue", "green"];
app.handle("/", async (req) => {
    if(req.method === "POST") {
        const bodyForm = await req.formData()
        const color = bodyForm.value("color")
        if(color != null) {
          colors.push(color)
        }
      }
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset-UFT-8",
    }),
    body: ReactDOMServer.renderToString(
      <html>
        <head>
          <meta />

          <title>Servest</title>
        </head>
        <body>
          <div>
            <h1>Ingrese color</h1>
            <form method="post">
              <input type="text" name="color" id="color" />
              <button type="submit">Enviar</button>
              <ul>
                {colors.map((color) => (
                  <li style={{color: color}}>{color}</li>
                ))}
              </ul>
            </form>
          </div>
        </body>
      </html>
    ),
  });
});
app.listen({ port: 8080 });
