const boardSelect = document.querySelector('#boardSelect');
const codeEditor = document.querySelector('#codeEditor');
const loadExampleBtn = document.querySelector('#loadExampleBtn');
const compileBtn = document.querySelector('#compileBtn');
const uploadBtn = document.querySelector('#uploadBtn');
const statusText = document.querySelector('#statusText');
const logOutput = document.querySelector('#logOutput');

const EXAMPLES = {
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
  digitalWrite(PC13, LOW);   // LED onboard costuma ser invertido
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

function nowTime() {
  return new Date().toLocaleTimeString('pt-BR', { hour12: false });
}

function appendLog(message, type = 'info') {
  const prefix = type === 'error' ? '[ERRO]' : type === 'success' ? '[OK]' : '[INFO]';
  logOutput.textContent += `${nowTime()} ${prefix} ${message}\n`;
  logOutput.scrollTop = logOutput.scrollHeight;
}

function setBusy(isBusy) {
  compileBtn.disabled = isBusy;
  uploadBtn.disabled = isBusy;
  loadExampleBtn.disabled = isBusy;
  codeEditor.disabled = isBusy;
  boardSelect.disabled = isBusy;
}

function updateStatus(message) {
  statusText.textContent = message;
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function simulateCompile() {
  if (!codeEditor.value.trim()) {
    appendLog('Nenhum código para compilar.', 'error');
    updateStatus('Falha na compilação');
    return false;
  }

  setBusy(true);
  updateStatus('Compilando...');
  appendLog(`Iniciando compilação para ${boardSelect.value}...`);

  await sleep(600);
  appendLog('Verificando sintaxe...');
  await sleep(700);

  const hasLoop = codeEditor.value.includes('loop(');
  const hasSetup = codeEditor.value.includes('setup(');

  if (!hasLoop || !hasSetup) {
    appendLog('Funções setup()/loop() não encontradas. Estrutura inválida para sketch.', 'error');
    updateStatus('Erro de compilação');
    setBusy(false);
    return false;
  }

  appendLog('Gerando binário otimizado...');
  await sleep(800);
  appendLog('Compilação concluída com sucesso.', 'success');
  updateStatus('Compilação finalizada');
  setBusy(false);

  return true;
}

async function simulateUpload() {
  setBusy(true);
  updateStatus('Enviando firmware...');
  appendLog(`Conectando à placa ${boardSelect.value}...`);

  await sleep(700);
  appendLog('Handshaking com bootloader...');
  await sleep(700);
  appendLog('Transferindo firmware...');
  await sleep(900);

  appendLog('Upload finalizado. Dispositivo reiniciado.', 'success');
  appendLog('Abrindo monitor serial (simulado)...');
  appendLog('Serial> Sistema inicializado com sucesso.', 'success');
  updateStatus('Upload concluído');
  setBusy(false);
}

loadExampleBtn.addEventListener('click', () => {
  const selectedBoard = boardSelect.value;
  codeEditor.value = EXAMPLES[selectedBoard] ?? EXAMPLES['Arduino Uno'];
  appendLog(`Exemplo carregado para ${selectedBoard}.`);
  updateStatus('Exemplo pronto');
});

compileBtn.addEventListener('click', async () => {
  const ok = await simulateCompile();

  if (!ok) {
    return;
  }

  appendLog('Pronto para upload.');
});

uploadBtn.addEventListener('click', async () => {
  const ok = await simulateCompile();

  if (!ok) {
    return;
  }

  await simulateUpload();
});

appendLog('webMCU-IDE iniciado.');
appendLog('Selecione uma placa e carregue um exemplo para começar.');
