import test from 'node:test';
import assert from 'node:assert/strict';

import { EXAMPLES, getBoardFileSlug, validateCode } from '../core.js';

test('validateCode aceita sketch válido', () => {
  const code = EXAMPLES['Arduino Uno'];
  assert.equal(validateCode(code), null);
});

test('validateCode reprova ausência de setup/loop', () => {
  const code = 'int x = 10;';
  assert.match(validateCode(code), /setup\(\)\/loop\(\)/);
});

test('validateCode reprova chaves desbalanceadas', () => {
  const code = `void setup() {
  pinMode(13, OUTPUT);

void loop() {
}`;

  assert.match(validateCode(code), /chaves/);
});

test('getBoardFileSlug gera nome de arquivo consistente', () => {
  assert.equal(getBoardFileSlug('ESP32 DevKit'), 'esp32-devkit');
});
