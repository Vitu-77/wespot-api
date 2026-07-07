#!/usr/bin/env node

const readline = require('node:readline');
const { spawn } = require('node:child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('\n⚠️  ATENÇÃO!');
console.log(
  'Você está prestes a APAGAR COMPLETAMENTE o banco de desenvolvimento.',
);
console.log('Todos os dados serão perdidos.\n');

rl.question('Digite "S" para continuar: ', (answer) => {
  if (answer !== 'S') {
    console.log('\nOperação cancelada.');
    rl.close();
    process.exit(0);
  }

  rl.close();

  const command = process.platform === 'win32' ? 'npx.cmd' : 'npx';

  const child = spawn(
    command,
    [
      'cross-env',
      'PRISMA_MODE=cli',
      'POSTGRES_HOST=localhost',
      'prisma',
      'migrate',
      'reset',
      '--force',
      'cross-env',
      'PRISMA_MODE=server',
    ],
    {
      stdio: 'inherit',
      shell: false,
    },
  );

  child.on('exit', (code) => {
    process.exit(code);
  });
});
