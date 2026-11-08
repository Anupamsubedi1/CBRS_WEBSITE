import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const nodeRequire = createRequire(import.meta.url);

// Run the real server modules with isolated environment, database and request
// boundaries. No Next server or external database is needed for these tests.
export function loadTypeScript(file, { mocks = {}, env = {}, globals = {} } = {}) {
  const filename = resolve(root, file);
  const { outputText } = ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
    fileName: filename,
  });
  const compiledModule = { exports: {} };
  const context = vm.createContext({
    module: compiledModule,
    exports: compiledModule.exports,
    require: (specifier) => {
      if (Object.hasOwn(mocks, specifier)) return mocks[specifier];
      if (specifier.startsWith("@/")) {
        return loadTypeScript(`${specifier.slice(2)}.ts`, { mocks, env, globals });
      }
      return nodeRequire(specifier);
    },
    process: { env: { NODE_ENV: "test", ...env } },
    console: { error() {}, warn() {}, log() {} },
    Buffer,
    URL,
    URLSearchParams,
    ...globals,
  });
  context.global = context;
  vm.runInContext(outputText, context, { filename });
  return compiledModule.exports;
}
