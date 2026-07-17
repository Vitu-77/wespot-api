import chokidar from "chokidar";
import { promises as fs } from "fs";
import path from "path";

const frontendRoot = path.resolve(__dirname, "..", "..", "oauth-google");
const backendRoot = path.resolve(__dirname, "..");

const files = [
  {
    source: path.join(backendRoot, "src/domain/exceptions/errors.map.ts"),
    target: path.join(frontendRoot, "src/domain/exceptions/errors.map.ts"),
  },
  {
    source: path.join(backendRoot, "src/domain/exceptions/error-codes.enum.ts"),
    target: path.join(
      frontendRoot,
      "src/domain/exceptions/error-codes.enum.ts",
    ),
  },
];

const fileMap = new Map(
  files.map((file) => [path.resolve(file.source), file.target]),
);

async function syncFile(source: string, target: string) {
  try {
    const content = await fs.readFile(source, "utf8");

    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, content);

    console.log(`[${new Date().toLocaleTimeString()}] ${source} -> ${target}`);
  } catch (error) {
    console.error(`Erro ao sincronizar ${source}:`, error);
  }
}

const watcher = chokidar.watch([...fileMap.keys()], {
  ignoreInitial: false,
});

watcher.on("add", async (source) => {
  await syncFile(source, fileMap.get(path.resolve(source))!);
});

watcher.on("change", async (source) => {
  await syncFile(source, fileMap.get(path.resolve(source))!);
});

console.log(`Observando ${fileMap.size} arquivo(s)...`);
