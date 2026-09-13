import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const readIfExists = (file) => existsSync(resolve(root, file))
  ? readFileSync(resolve(root, file), 'utf8')
  : null

let pkg
try {
  pkg = JSON.parse(readIfExists('package.json'))
} catch (error) {
  console.error('[gates] invalid package.json:', error.message)
  process.exit(1)
}

const errors = []
if (pkg.name !== 'dsh-niulai') errors.push('package.json name does not match scaffold name')
if (!pkg.exports || !pkg.exports['.']) errors.push('exports[.] must point to lib/index.js')
if (!pkg.exports['./package.json']) errors.push('exports[./package.json] is missing')
if (!existsSync(resolve(root, 'lib/index.js'))) errors.push('missing required file: lib/index.js')
if (!existsSync(resolve(root, 'README.md'))) errors.push('missing required file: README.md')
if (!existsSync(resolve(root, 'cordis.patch.yml'))) errors.push('missing required file: cordis.patch.yml')
const patch = readIfExists('cordis.patch.yml')
if (!patch || !patch.includes('- insert:') || !patch.includes('dsh-niulai')) errors.push('cordis.patch.yml must insert the package name')
if (!existsSync(resolve(root, 'lib/client.js'))) errors.push('missing required file: lib/client.js')
const client = readIfExists('lib/client.js')
if (!client || !client.includes(`window.__ModuleLoader__.load({ id: ${JSON.stringify(pkg.name)}`)) errors.push('lib/client.js does not register the expected client id')
const node = readIfExists('lib/index.js')
if (!node || !node.includes('system-prompt/assemble')) errors.push('lib/index.js must register system-prompt/assemble identity fold')
if (!node || !node.includes('niulai-system-spec')) errors.push('lib/index.js must keep niulai-system-spec section name')
if (!node || !node.includes('who are you') || !node.includes('Harness coding agent')) {
  errors.push('lib/index.js must inject who-am-i identity lock')
}
const v3 = readIfExists('prompts/niulai-v3.md')
if (!v3 || !v3.includes('## 任务优先') || !v3.includes('## 硬输出') || !v3.includes('## 缺值占位') || !v3.includes('## 稳定锚')) {
  errors.push('prompts/niulai-v3.md must include task-priority / hard-output / placeholder / stability clauses')
}

if (errors.length > 0) {
  console.error('[gates] failed')
  for (const error of errors) console.error('  -', error)
  process.exit(1)
}

console.log('[gates] ok')
