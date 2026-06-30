Temas:
 - Programação Dinâmica

# Dungeon Adventure — Mochila da Fortuna

**Conteúdo da Disciplina**: Programação Dinâmica (Dynamic Programming)<br>

## Alunos

| Matrícula  | Aluno                     |
| ---------- | ------------------------- |
| 232014638  | Caio Soares de Andrade    |
| 231011408  | Guilherme Flyan Araujo    |

## Sobre

O **Dungeon Adventure** é uma aplicação web interativa e pedagógica que demonstra o funcionamento do **algoritmo de Programação Dinâmica da Mochila 0/1 (0/1 Knapsack)**. O jogador assume o papel de um aventureiro que encontra 9 relíquias mágicas em uma dungeon e precisa escolher quais levar em sua mochila de **74 kg** de capacidade, maximizando o valor total.

O projeto é baseado na mesma ideia do projeto de Algoritmos Ambiciosos, sendo a outra face do conceito do algoritmo Knapsack, desta vez utilizando o paradigma de Programação Dinâmica.

## Screenshots


## Instalação

**Linguagem**: TypeScript<br>
**Framework**: Next.js 16 (App Router)<br>
**Estilização**: Tailwind CSS 4<br>
**Pré-Requisitos**: Node.js v20+<br>
### Acesso deploy
[Link da aventura](https://g7-greed-pa-26-1-dungeon-adventure.vercel.app/)

### Como rodar localmente

```bash
# 1. clone o repositório
git clone https://github.com/projeto-de-algoritmos-2026/G7-Promgrama-o-Dinamica-Dungeon-Adventure.git

# 2. entre na pasta do projeto
cd G7-Programa-o-Dinamica-Dungeon-Adventure

# 3. instale as dependências
npm install

# 4. inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**.

## Uso

Ao abrir a aplicação:

1. Na **tela inicial**, o personagem apresenta a história. Clique no botão para avançar.
2. Na **galeria de relíquias**, veja todos os 9 itens disponíveis. Clique no botão para continuar.
3. Na **tela de escolha**, selecione o algoritmo **Knapsack** (as outras opções ficam em vermelho indicando que estão erradas). Após selecionar corretamente, o botão de avançar aparece.
4. Na **tela de execução**, clique em **INICIAR** e depois em **PRÓXIMO PASSO** para ver cada decisão do algoritmo de programação dinâmica em tempo real. Uma barra de progresso mostra a capacidade sendo preenchida e a fortuna sendo acumulada.
5. Ao final, a **tela de resultado** exibe a mochila completa com todos os itens selecionados e o valor total obtido.


## Outros

O projeto **não utiliza backend separado** — toda a lógica do algoritmo roda nas API Routes do Next.js (server-side), mantendo a arquitetura unificada em um único framework.

## Video explicativo
[Vídeo](https://www.youtube.com/watch?v=arIWizzSzdQ)

