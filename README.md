# LetMeAsk – Interatividade inteligente para transmissões ao vivo

LetMeAsk é uma aplicação web desenvolvida com React e Node.js, projetada para tornar transmissões ao vivo mais interativas e inteligentes. O sistema utiliza IA (Gemini, Google) para transcrever, indexar e responder perguntas da audiência em tempo real, com base no conteúdo falado pelo apresentador.

---

## 🧠 Como funciona

1. **Criação de sala e início da live:** O apresentador cria uma sala exclusiva e inicia a gravação da apresentação pelo navegador.
2. **Transcrição em tempo real:** O áudio é enviado ao servidor e convertido em texto automaticamente, formando uma base de conhecimento cronológica.
3. **Geração de embeddings:** Cada transcrição é convertida em vetores semânticos (embeddings), permitindo buscas inteligentes por significado.
4. **Participação da audiência:** O público acessa a sala, se identifica e envia perguntas relacionadas à apresentação.
5. **Respostas automáticas:** O sistema busca os trechos mais relevantes da fala do apresentador e utiliza a Gemini para gerar respostas contextualizadas.

---

## 🎯 Funcionalidades principais

- 🎤 Captura e transcrição de áudio em tempo real
- 🧠 Indexação semântica por embeddings
- 🤖 Respostas automáticas geradas pela Gemini
- 🌐 Interface amigável para audiência enviar perguntas
- 🔒 Ambiente restrito para o apresentador
- 📈 Base de conhecimento dinâmica

---

## 🚀 Benefícios

- Respostas contextuais e relevantes, mesmo em apresentações longas
- Aumenta a interatividade e engajamento
- Automatiza respostas sem interromper o apresentador
- Reduz a sobrecarga cognitiva do apresentador

---

## 📦 Tecnologias Principais

- **[React](https://react.dev/):** UI reativa e componentizada
- **[Vite](https://vitejs.dev/):** Build ultrarrápido para frontend
- **[React Router DOM](https://reactrouter.com/en/main):** Roteamento declarativo
- **[Tailwind CSS](https://tailwindcss.com/):** Estilização utilitária
- **[@tanstack/react-query](https://tanstack.com/query/latest/docs/react/overview):** Gerenciamento de estado assíncrono
- **[Lucide React](https://lucide.dev/):** Ícones SVG modernos
- **[Radix UI](https://www.radix-ui.com/):** Componentes acessíveis e composáveis

---

## 🛠️ Instalação e Inicialização

1. **Clone o repositório:**
   ```bash
   git clone <url-do-repositorio>
   cd nlwagents/web
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn
   ```
3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```
4. **Acesse no navegador:**
   Abra [http://localhost:5173](http://localhost:5173) para visualizar a aplicação.

---

## 📁 Estrutura de Pastas

| Pasta             | Descrição                                        |
| ----------------- | ------------------------------------------------ |
| `src/pages/`      | Páginas principais da aplicação                  |
| `src/components/` | Componentes reutilizáveis (UI, formulários, etc) |
| `src/lib/`        | Utilitários e funções auxiliares                 |
| `public/`         | Arquivos estáticos (imagens, favicon, etc)       |

---

## 📚 Bibliotecas e Utilitários

### Principais

- **@tanstack/react-query:** Gerenciamento de dados assíncronos e cache.
- **react-router-dom:** Navegação entre páginas.
- **tailwindcss / @tailwindcss/vite:** Estilização rápida e responsiva.
- **lucide-react:** Ícones SVG modernos.
- **@radix-ui/react-\***: Componentes acessíveis e composáveis (dropdown, label, progress, slot).
- **class-variance-authority:** Variações de classes CSS.
- **clsx:** Condicional de classes CSS.
- **tailwind-merge:** Mescla inteligente de classes Tailwind.
- **dayjs:** Manipulação de datas.
- **zod:** Validação de schemas e formulários.
- **react-hook-form / @hookform/resolvers:** Formulários reativos e validação.

### Desenvolvimento

- **@vitejs/plugin-react:** Suporte a React no Vite.
- **typescript:** Tipagem estática para JS.
- **@types/\***: Tipos para bibliotecas JS.
- **@biomejs/biome:** Linter e formatter rápido.
- **tw-animate-css:** Animações utilitárias para Tailwind.
- **ultracite:** Ferramentas de build e automação.
- **globals:** Variáveis globais para Node.js.

---

## 📜 Scripts do Projeto

| Script    | Descrição                                                           |
| --------- | ------------------------------------------------------------------- |
| `dev`     | Inicia o servidor de desenvolvimento com Vite                       |
| `build`   | Compila o TypeScript e gera a build de produção com Vite            |
| `preview` | Visualiza a build de produção localmente                            |
| `ui:add`  | Adiciona componentes UI do shadcn (executa `npx shadcn@latest add`) |

---

## 📦 Descrição dos Pacotes

### Dependências

- **@hookform/resolvers:** Integração de validação de formulários com bibliotecas como Zod.
- **@radix-ui/react-dropdown-menu, @radix-ui/react-label, @radix-ui/react-progress, @radix-ui/react-slot:** Componentes acessíveis e reutilizáveis para UI.
- **@tailwindcss/vite:** Integra Tailwind ao Vite.
- **@tanstack/react-query:** Gerenciamento de cache e requisições assíncronas.
- **class-variance-authority:** Criação de variações de classes utilitárias.
- **clsx:** Manipulação condicional de classes CSS.
- **dayjs:** Manipulação e formatação de datas.
- **lucide-react:** Ícones SVG para React.
- **react, react-dom:** Biblioteca principal e renderização de componentes React.
- **react-hook-form:** Gerenciamento de formulários reativos.
- **react-router-dom:** Roteamento entre páginas.
- **tailwind-merge:** Mescla e resolve conflitos de classes Tailwind.
- **tailwindcss:** Framework CSS utilitário.
- **zod:** Validação de schemas e dados.

### DevDependencies

- **@biomejs/biome:** Linter e formatter rápido para JS/TS.
- **@types/dom-speech-recognition, @types/node, @types/react, @types/react-dom:** Tipos para bibliotecas JS/TS.
- **@vitejs/plugin-react:** Suporte a React no Vite.
- **globals:** Variáveis globais para Node.js.
- **tw-animate-css:** Animações utilitárias para Tailwind.
- **typescript:** Tipagem estática para JS.
- **typescript-eslint:** Lint para TypeScript.
- **ultracite:** Ferramentas de build e automação.
- **vite:** Bundler e servidor de desenvolvimento ultrarrápido.

---

## 💡 Dicas Rápidas

- Edite componentes em `src/components/ui/` para customizar a interface.
- As páginas principais estão em `src/pages/`.
- Utilize o React Query para requisições e cache de dados.

---
