const chalk = require('chalk4cjs');
const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SRC_DIR = path.join(ROOT_DIR, 'src');
const THEME_SRC_DIR = path.join(SRC_DIR, 'themes');
const THEME_DIST_DIR = path.join(ROOT_DIR, 'dist', 'themes');

function execute(command) {
  return new Promise((resolve, reject) => {
    cp.exec(
      command,
      {
        cwd: ROOT_DIR,
      },
      (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
        } else {
          resolve(stdout);
        }
      },
    );
  });
}

async function build() {
  const files = await fs.promises.readdir(THEME_SRC_DIR, {
    withFileTypes: true,
  });

  await fs.promises.mkdir(THEME_DIST_DIR, { recursive: true });

  await Promise.all(
    files
      .filter((file) => file.isFile() && file.name.endsWith('.less'))
      .map(async (file) => {
        const originFilePath = path.join(THEME_SRC_DIR, file.name);
        const destFilePath = path.join(
          THEME_DIST_DIR,
          file.name.replace(/\.less$/, '.css'),
        );

        await execute(`lessc "${originFilePath}" > "${destFilePath}"`);
        console.log(
          chalk.green('✔ lessc'),
          chalk.blue(`"${originFilePath}"`),
          chalk.white('=>'),
          chalk.blue(`"${destFilePath}"`),
        );
      }),
  );
}

build();
