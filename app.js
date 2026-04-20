import { EXAMPLES, getBoardFileSlug, validateCode } from './core.js';

const boardSelect = document.querySelector('#boardSelect');
const codeEditor = document.querySelector('#codeEditor');
const loadExampleBtn = document.querySelector('#loadExampleBtn');
const compileBtn = document.querySelector('#compileBtn');
const uploadBtn = document.querySelector('#uploadBtn');
const saveBtn = document.querySelector('#saveBtn');
const clearLogsBtn = document.querySelector('#clearLogsBtn');
const downloadBtn = document.querySelector('#downloadBtn');
const statusText = document.querySelector('#statusText');
const logOutput = document.querySelector('#logOutput');

const STORAGE_KEY = 'webmcu-ide:project:v2';

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
  saveBtn.disabled = isBusy;
  clearLogsBtn.disabled = isBusy;
  downloadBtn.disabled = isBusy;
  codeEditor.disabled = isBusy;
  boardSelect.disabled = isBusy;
}

function updateStatus(message) {
  statusText.textContent = message;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function serializeProject() {
  return {
    board: boardSelect.value,
    code: codeEditor.value,
    updatedAt: new Date().toISOString(),
  };
}

function saveProject(showFeedback = true) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeProject()));

    if (showFeedback) {
      appendLog('Projeto salvo localmente no navegador.', 'success');
      updateStatus('Projeto salvo');
    }
  } catch {
    appendLog('Não foi possível salvar o projeto no armazenamento local.', 'error');
    updateStatus('Falha ao salvar');
  }
}

function restoreProject() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return false;
    }

    const parsed = JSON.parse(raw);

    if (parsed.board && EXAMPLES[parsed.board]) {
      boardSelect.value = parsed.board;
    }

    if (typeof parsed.code === 'string' && parsed.code.trim()) {
      codeEditor.value = parsed.code;
    }

    appendLog('Projeto restaurado do armazenamento local.', 'success');
    updateStatus('Projeto restaurado');

    return true;
  } catch {
    appendLog('Dados salvos estavam inválidos e não puderam ser restaurados.', 'error');
    updateStatus('Erro ao restaurar projeto');
    return false;
  }
}

async function simulateCompile() {
  const sourceCode = codeEditor.value.trim();

  if (!sourceCode) {
    appendLog('Nenhum código para compilar.', 'error');
    updateStatus('Falha na compilação');
    return false;
  }

  setBusy(true);
  updateStatus('Compilando...');
  appendLog(`Iniciando compilação para ${boardSelect.value}...`);

  await sleep(450);
  appendLog('Verificando sintaxe...');
  await sleep(600);

  const validationError = validateCode(sourceCode);

  if (validationError) {
    appendLog(validationError, 'error');
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
  await sleep(650);
  appendLog('Transferindo firmware...');
  await sleep(900);

  appendLog('Upload finalizado. Dispositivo reiniciado.', 'success');
  appendLog('Abrindo monitor serial (simulado)...');
  appendLog('Serial> Sistema inicializado com sucesso.', 'success');
  updateStatus('Upload concluído');
  setBusy(false);
}

function downloadCode() {
  const code = codeEditor.value;
  const blob = new Blob([code], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');

  const boardSlug = getBoardFileSlug(boardSelect.value);
  anchor.href = url;
  anchor.download = `${boardSlug}-sketch.ino`;
  anchor.click();

  URL.revokeObjectURL(url);
  appendLog('Arquivo .ino baixado com sucesso.', 'success');
  updateStatus('Download concluído');
}

function clearLogs() {
  logOutput.textContent = '';
  appendLog('Logs limpos pelo usuário.');
  updateStatus('Logs limpos');
}

loadExampleBtn.addEventListener('click', () => {
  const selectedBoard = boardSelect.value;
  codeEditor.value = EXAMPLES[selectedBoard] ?? EXAMPLES['Arduino Uno'];
  appendLog(`Exemplo carregado para ${selectedBoard}.`);
  updateStatus('Exemplo pronto');
  saveProject(false);
});

compileBtn.addEventListener('click', async () => {
  const ok = await simulateCompile();

  if (ok) {
    appendLog('Pronto para upload.');
  }
});

uploadBtn.addEventListener('click', async () => {
  const ok = await simulateCompile();

  if (ok) {
    await simulateUpload();
  }
});

saveBtn.addEventListener('click', () => saveProject(true));
clearLogsBtn.addEventListener('click', clearLogs);
downloadBtn.addEventListener('click', downloadCode);

codeEditor.addEventListener('input', () => {
  updateStatus('Editando...');
  saveProject(false);
});

boardSelect.addEventListener('change', () => {
  appendLog(`Placa alvo alterada para ${boardSelect.value}.`);
  updateStatus('Placa alterada');
  saveProject(false);
});

window.addEventListener('keydown', (event) => {
  const isSaveShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's';

  if (!isSaveShortcut) {
    return;
  }

  event.preventDefault();
  saveProject(true);
});

appendLog('webMCU-IDE iniciado.');
if (!restoreProject()) {
  appendLog('Selecione uma placa e carregue um exemplo para começar.');
}
