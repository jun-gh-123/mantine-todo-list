const esbuild = require("esbuild");
const { sassPlugin } = require("esbuild-sass-plugin");

const args = process.argv.slice(2);

async function main() {
  const context = await esbuild.context({
    entryPoints: ["./src/index.tsx"],
    outfile: "./www/app.js",
    bundle: true,
    minify: true,
    loader: {
      ".png": "dataurl",
    },
    define: {
      env: JSON.stringify({
        dev: args.includes("--dev"),
      }),
    },
    plugins: [
      sassPlugin({
        filter: /\.module\.scss$/,
        type: "local-css",
      }),
      sassPlugin({
        filter: /\.scss$/,
        type: "css",
      }),
    ],
  });

  const result = await context.rebuild();

  if (args.includes("--watch")) {
    console.log("Watching for live changes.");
    await context.watch();
  } else {
    context.dispose();
  }

  if (args.includes("--serve")) {
    const { host, port } = await context.serve({ servedir: "www" });
    console.log(`Serving app at ${host}:${port}`);
  }
}

main();
