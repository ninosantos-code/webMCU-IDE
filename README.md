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

> **Importante:** compile/upload ainda são simulados. A estrutura está pronta para integração real com toolchains e dispositivos.

## 🚀 Como executar

Basta abrir o arquivo `index.html` no navegador.

Opcionalmente, rode um servidor local:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## 🧩 Estrutura do projeto

```text
.
├── app.js        # lógica da interface, validação e persistência local
├── index.html    # layout semântico da aplicação
├── styles.css    # tema visual e responsividade
└── README.md
```

## 🔍 Melhorias implementadas neste upgrade

- Reforço da validação de código antes da simulação de build (estrutura + chaves).
- Salvamento e restauração automáticos de projeto no navegador.
- Botões utilitários para salvar, limpar logs e baixar sketch.
- Melhorias de UX para acelerar ciclos de teste sem hardware.

## 📋 Próximos upgrades recomendados

1. Backend com compilação real via `arduino-cli` ou PlatformIO.
2. Upload real para placa via Web Serial / WebUSB.
3. Editor avançado (Monaco/CodeMirror) com highlight e lint.
4. Testes automatizados (unitários e e2e) + pipeline CI.
5. Gerenciamento de múltiplos projetos e templates.
