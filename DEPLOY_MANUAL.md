# Instruções para Deploy Manual — Refatoração v2.0
# Hub Osteogênese Imperfeita

## Status do Trabalho Realizado

✅ Todas as 16 páginas HTML foram refatoradas localmente
✅ Commit criado na branch `genspark_ai_developer`
✅ 24 arquivos modificados/criados (5.474 inserções, 3.262 deleções)

## Por que o Push Automático Não Funcionou

O token GitHub da integração Genspark não tem permissão de **escrita** 
no repositório `Silviosb88/hub-osteogeneseimperfeita`.

## Como Fazer o Deploy Manualmente

### Opção A: Conceder Permissão à Integração (Recomendado)

1. Acesse: https://github.com/Silviosb88/hub-osteogeneseimperfeita/settings/installations
2. Localize "Genspark AI Developer"
3. Conceda permissão de **Write** ao repositório
4. Retorne ao agente Genspark e execute: "Faça o push e crie o PR"

### Opção B: Push Manual via Git

```bash
# Clone o repositório localmente
git clone https://github.com/Silviosb88/hub-osteogeneseimperfeita.git
cd hub-osteogeneseimperfeita

# Copie os arquivos refatorados para a pasta clonada
# (ou aplique o patch gerado)

# Crie a branch
git checkout -b refatoracao-v2

# Adicione e commit
git add -A
git commit -m "feat(refatoracao): arquitetura de componentes globais v2.0"

# Push
git push origin refatoracao-v2

# Abra o PR via GitHub
```

### Opção C: Upload Direto via GitHub Web

Os arquivos-chave que precisam ser adicionados/atualizados são:

**NOVOS ARQUIVOS (criar):**
- `assets/css/global.css`
- `assets/js/global.js`
- `assets/components/header.html`
- `assets/components/footer.html`
- `.gitignore`

**MODIFICADOS (atualizar):**
- `index.html`
- `referencias.html`
- `acido-zoledronico.html`
- `acido-zoledronico-resumo.html`
- `alendronato.html`
- `alendronato-resumo.html`
- `pamidronato.html`
- `setrusumabe-resumo.html`
- `denosumabe-resumo.html`
- `bibliografia-medicacoes.html`
- `bibliografia-acido-zoledronico.html`
- `bibliografia-alendronato.html`
- `bibliografia-denosumabe.html`
- `bibliografia-pamidronato.html`
- `bibliografia-setrusumabe.html`
- `lista-exames-impressao.html`
- `style.css` (agora importa assets/css/global.css)
- `main.js` (agora carrega assets/js/global.js)
- `Css/style.css` (agora importa ../assets/css/global.css)

## O que Foi Feito (Resumo Técnico)

### Problema Identificado
- 4 variações diferentes de header/sidebar nas páginas
- CSS inline em CADA arquivo (duplicação total)
- Variáveis CSS com nomes conflitantes entre arquivos
- JavaScript duplicado em múltiplas páginas
- Nenhuma consistência visual entre páginas

### Solução Implementada

#### 1. CSS Global Unificado (assets/css/global.css — 1.584 linhas)
- 60+ Design Tokens em :root
- Paleta de cores WCAG AA (contraste ≥ 4.5:1)
- Escala tipográfica consistente em rem
- Grid responsivo: 3col → 2col → 1col
- Componentes: cards, badges, tabelas, hero, breadcrumb
- Widget de acessibilidade (alto contraste, texto grande, modo escuro)
- Media queries para 1024px, 768px, 480px
- Modo print otimizado

#### 2. JS Global Modular (assets/js/global.js — 405 linhas)
- HubSidebar: menu lateral com ARIA completo
- HubA11y: widget de acessibilidade com localStorage
- HubPageIndex: índice ativo por IntersectionObserver
- HubBackToTop: botão com foco acessível
- HubSmoothScroll: scroll suave respeitando header fixo
- HubSearch: busca no header

#### 3. Componentes Reutilizáveis
- assets/components/header.html: header + sidebar idênticos
- assets/components/footer.html: footer + widget + back-to-top idênticos

#### 4. WCAG 2.1 AA em Todas as Páginas
- Skip link "Pular para conteúdo principal"
- aria-label em TODOS os controles interativos
- aria-expanded/aria-controls no sidebar
- aria-current="page" no link ativo
- Focus visible com outline 3px
- Contraste mínimo 4.5:1
- Min-height 44px em botões
- HTML semântico: header, nav, main, footer com roles ARIA

## Validação Executada

```
✅ acido-zoledronico-resumo.html — 10/10 checks
✅ acido-zoledronico.html        — 10/10 checks
✅ alendronato-resumo.html       — 10/10 checks
✅ alendronato.html              — 10/10 checks
✅ bibliografia-acido-zoledronico.html — 10/10 checks
✅ bibliografia-alendronato.html — 10/10 checks
✅ bibliografia-denosumabe.html  — 10/10 checks
✅ bibliografia-medicacoes.html  — 10/10 checks
✅ bibliografia-pamidronato.html — 10/10 checks
✅ bibliografia-setrusumabe.html — 10/10 checks
✅ denosumabe-resumo.html        — 10/10 checks
✅ index.html                    — 10/10 checks
✅ lista-exames-impressao.html   — 10/10 checks
✅ pamidronato.html              — 10/10 checks
✅ referencias.html              — 10/10 checks
✅ setrusumabe-resumo.html       — 10/10 checks

✨ 16/16 PÁGINAS — TODOS OS CHECKS APROVADOS
```
