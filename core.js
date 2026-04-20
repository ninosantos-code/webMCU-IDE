export const EXAMPLES = {
  'Arduino Uno': `// Blink clássico para Arduino Uno
const int LED_PIN = 13;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(500);
  digitalWrite(LED_PIN, LOW);
  delay(500);
}`,
  'ESP32 DevKit': `// Exemplo ESP32
const int LED_PIN = 2;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(115200);
}

void loop() {
  Serial.println("Pisca ESP32");
  digitalWrite(LED_PIN, !digitalRead(LED_PIN));
  delay(300);
}`,
  'STM32 Blue Pill': `// Exemplo STM32 (Blue Pill)
void setup() {
  pinMode(PC13, OUTPUT);
}

void loop() {
  digitalWrite(PC13, LOW);
  delay(500);
  digitalWrite(PC13, HIGH);
  delay(500);
}`,
  'Raspberry Pi Pico': `// Exemplo Raspberry Pi Pico (Arduino core)
const int LED_PIN = 25;

void setup() {
  pinMode(LED_PIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_PIN, HIGH);
  delay(200);
  digitalWrite(LED_PIN, LOW);
  delay(200);
}`,
};

export function validateCode(sourceCode) {
  const hasLoop = sourceCode.includes('loop(');
  const hasSetup = sourceCode.includes('setup(');

  if (!hasSetup || !hasLoop) {
    return 'Funções setup()/loop() não encontradas. Estrutura inválida para sketch.';
  }

  let bracketBalance = 0;
  for (const char of sourceCode) {
    if (char === '{') {
      bracketBalance += 1;
    }

    if (char === '}') {
      bracketBalance -= 1;
    }

    if (bracketBalance < 0) {
      return 'Blocos fechados antes da abertura. Verifique as chaves do código.';
    }
  }

  if (bracketBalance !== 0) {
    return 'Quantidade de chaves de abertura/fechamento não confere.';
  }

  return null;
}

export function getBoardFileSlug(boardName) {
  return boardName.toLowerCase().replace(/\s+/g, '-');
}
