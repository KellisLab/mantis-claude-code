import { confirm, input, password, search, select } from '@inquirer/prompts';

export function isCancel(err) {
  return err?.name === 'ExitPromptError';
}

export function die(msg) {
  console.error(`\n  ✖ ${msg}\n`);
  process.exit(1);
}

export function banner(title, subtitle) {
  console.log('');
  console.log(`  \x1b[36m${title}\x1b[0m`);
  if (subtitle) console.log(`  \x1b[2m${subtitle}\x1b[0m`);
  console.log('');
}

export function success(msg) {
  console.log(`  \x1b[32m✔\x1b[0m ${msg}`);
}

export function info(msg) {
  console.log(`  \x1b[2m→\x1b[0m ${msg}`);
}

export async function promptInput(message, { default: def } = {}) {
  try {
    return await input({ message, default: def });
  } catch (e) {
    if (isCancel(e)) die('Cancelled.');
    throw e;
  }
}

export async function promptSecret(message, { default: def } = {}) {
  if (def) {
    return promptInput(message, { default: def });
  }
  try {
    return await password({ message, mask: '•' });
  } catch (e) {
    if (isCancel(e)) die('Cancelled.');
    throw e;
  }
}

export async function promptSearch(message, source, { pageSize = 12 } = {}) {
  try {
    return await search({ message, pageSize, source });
  } catch (e) {
    if (isCancel(e)) die('Cancelled.');
    throw e;
  }
}

export async function promptSelect(message, choices) {
  try {
    return await select({ message, choices });
  } catch (e) {
    if (isCancel(e)) die('Cancelled.');
    throw e;
  }
}

export async function promptConfirm(message, { default: def = false } = {}) {
  try {
    return await confirm({ message, default: def });
  } catch (e) {
    if (isCancel(e)) die('Cancelled.');
    throw e;
  }
}
