# webMCU-IDE

IDE web para microcontroladores (Arduino, ESP32, STM32, Raspberry Pi Pico e outros), com foco em produtividade para makers, estudantes e times de IoT.

## ✨ O que este MVP entrega

- Editor de código no navegador com exemplos rápidos.
- Seleção de placa alvo.
- Simulação de **compilação**, **upload** e **monitor serial**.
- Interface responsiva para desktop e mobile.
- Estrutura pronta para evoluir para integrações reais (CLI/toolchain/WebSerial/WebUSB).

> **Importante:** nesta versão, compile/upload são simulados para facilitar validação de UX e fluxo do produto.

## 🚀 Como executar

Não há dependências obrigatórias: basta abrir o arquivo `index.html` no navegador.

Opcionalmente, rode um servidor local simples:

```bash
python3 -m http.server 8080
```

Depois acesse `http://localhost:8080`.

## 🧩 Estrutura do projeto

```text
.
├── app.js        # lógica da interface e simulação de pipeline
├── index.html    # layout e semântica da aplicação
├── styles.css    # tema, responsividade e componentes visuais
└── README.md
```

## 🛠️ Melhorias aplicadas nesta revisão

- Organização inicial da aplicação com separação de responsabilidades (HTML/CSS/JS).
- Experiência de usuário com feedbacks de estado e mensagens de log.
- Melhorias de acessibilidade:
  - labels explícitos e hierarquia de headings;
  - regiões com `aria-live` para atualizações dinâmicas;
  - botões com estados `disabled` durante operações.
- Preparação para evolução futura (hooks para backend/toolchains).

## 📋 Próximos upgrades sugeridos

1. Integração real de compilação via API backend (PlatformIO/arduino-cli).
2. Integração com Web Serial / WebUSB para gravação em placa.
3. Persistência de projetos no navegador (IndexedDB) e exportação/importação.
4. Editor avançado com syntax highlighting (Monaco/CodeMirror).
5. Pipeline de qualidade: lint, testes automatizados e CI.

## 🤝 Contribuição

Contribuições são bem-vindas! Para manter consistência:

- mantenha funções pequenas e com responsabilidade única;
- priorize acessibilidade e mensagens de erro claras;
- documente fluxos novos no `README.md`.

## 📄 Licença

Defina a licença do projeto (ex.: MIT) antes de publicar em produção.
