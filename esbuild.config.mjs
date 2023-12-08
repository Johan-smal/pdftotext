import * as esbuild from 'esbuild'

const ctx = await esbuild.context({
  entryPoints: ['./src/handlers/app.ts'],
  bundle: true,
  platform: 'node',
  target: ['node18'],
  minify: false,
  sourcemap: true,
  outdir: 'dist',
  logLevel: 'info'
})

await ctx.watch()
console.log('watching...')