#!/usr/bin/env node

const readline = require('node:readline')
const { spawn } = require('node:child_process')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log('\n⚠️  ATENÇÃO!')
console.log('As migrations serão apagadas.')
console.log('Todos os dados serão perdidos.\n')

rl.question('Digite "S" para continuar: ', (answer) => {
  if (answer !== 'S') {
    console.log('\nOperação cancelada.')
    rl.close()
    process.exit(0)
  }

  rl.close()

  const command = process.platform === 'win32' ? 'npx.cmd' : 'npx'

  const child = spawn(command, ['rm', '-rf', 'prisma/migrations'], {
    stdio: 'inherit',
    shell: false,
  })

  child.on('exit', (code) => {
    process.exit(code)
  })
})
