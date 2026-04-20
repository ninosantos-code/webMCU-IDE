# webMCU-IDE

IDE web para microcontroladores (Arduino, ESP32, STM32, Raspberry Pi Pico e outros), com foco em produtividade para makers, estudantes e times de IoT.

## ✨ O que esta versão entrega

- Editor de código no navegador com exemplos rápidos por placa.
- Simulação de **compilação**, **upload** e **monitor serial** para validar fluxo de UX.
- Persistência local automática com `localStorage`.
- Atalhos e utilidades de produtividade:
  - `Ctrl/Cmd + S` para salvar;
  - download de sketch `.ino`;
  - limpeza de logs.
- Interface responsiva para desktop e mobile.
- Testes automatizados de regras centrais (`validateCode` e slug de placa).

> **Importante:** compile/upload ainda são simulados. A estrutura está pronta para integração real com toolchains e dispositivos.

## 🚀 Como executar

Basta abrir o arquivo `index.html` no navegador.

Opcionalmente, rode um servidor local:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## 🧪 Como testar

```bash
npm run check
npm test
```

## 🧩 Estrutura do projeto

```text
.
├── app.js           # lógica da UI e integração com regras centrais
├── core.js          # regras de negócio testáveis (validação e utilitários)
├── tests/
│   └── core.test.js # testes automatizados de regras centrais
├── index.html       # layout semântico da aplicação
├── styles.css       # tema visual e responsividade
└── README.md
```

## 🔍 Melhorias implementadas neste upgrade

- Extração das regras centrais para `core.js` (melhor separação UI x lógica).
- Inclusão de suíte de testes automatizados com `node:test`.
- Preservação da experiência existente (persistência, logs e ações rápidas).

## 📋 Próximos upgrades recomendados

1. Backend com compilação real via `arduino-cli` ou PlatformIO.
2. Upload real para placa via Web Serial / WebUSB.
3. Editor avançado (Monaco/CodeMirror) com highlight e lint.
4. Testes e2e de interface (Playwright/Cypress) + pipeline CI.
5. Gerenciamento de múltiplos projetos e templates.
