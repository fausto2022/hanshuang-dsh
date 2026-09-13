import { build, context } from 'esbuild'
import { mkdir, readFile, rm } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const watch = process.argv.includes('--watch')
const pkg = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'))

await rm(resolve(root, 'lib'), { recursive: true, force: true })
await mkdir(resolve(root, 'lib'), { recursive: true })

const nodeConfig = {
  entryPoints: [resolve(root, 'src/index.ts')],
  outfile: resolve(root, 'lib/index.js'),
  platform: 'node',
  format: 'esm',
  target: ['es2022'],
  bundle: true,
  packages: 'external',
  logLevel: 'info',
}

const clientConfig = {
  entryPoints: [resolve(root, 'src/client/index.ts')],
  outfile: resolve(root, 'lib/client.js'),
  platform: 'browser',
  format: 'cjs',
  target: ['es2020'],
  bundle: true,
  external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'],
  logLevel: 'info',
  banner: {
    js: `window.__ModuleLoader__.load({ id: ${JSON.stringify(pkg.name)}, factory: (require) => {\nvar module = { exports: {} }; var exports = module.exports;`,
  },
  footer: {
    js: 'return module.exports; } });',
  },
}

const configs = [nodeConfig, clientConfig]

if (watch) {
  const contexts = await Promise.all(configs.map((cfg) => context(cfg)))
  await Promise.all(contexts.map((item) => item.watch()))
  console.log('[build] watching src/**/*.ts')
} else {
  await Promise.all(configs.map((cfg) => build(cfg)))
  console.log('[build] lib generated')
}
