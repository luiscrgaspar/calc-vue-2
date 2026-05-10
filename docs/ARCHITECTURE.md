# Arquitetura e Boas Praticas

## Visao Geral

Este projeto e uma calculadora cientifica simples construida com Vue 2,
TypeScript, Vuex e vue-i18n. A aplicacao esta organizada em componentes Vue,
estado global em Vuex, servicos puros para regras de calculo, constantes
tipadas para configuracao da calculadora, traducoes em ficheiros JSON e testes
unitarios.

A arquitetura atual separa as responsabilidades principais:

- Componentes Vue tratam da apresentacao, eventos e ligacao ao estado.
- Vuex guarda o estado da calculadora.
- Servicos puros tratam da logica matematica e da formatacao de resultados.
- Constantes centralizam operadores e linhas de botoes.
- Tipos partilhados documentam o contrato entre componentes, store e servicos.
- Testes unitarios cobrem componentes, servicos e o modulo Vuex.

## Estrutura Atual

- `src/main.ts` inicializa Vue, Vuex, vue-i18n e monta a aplicacao.
- `src/App.vue` renderiza o `CalculatorContainer`.
- `src/components/CalculatorContainer/CalculatorContainer.vue` coordena a
  interface, handlers dos botoes, integracao com Vuex e chamadas aos servicos
  de dominio.
- `src/components/CalculatorLineContent/CalculatorLineContent.vue` renderiza
  linhas reutilizaveis de botoes.
- `src/components/HeaderContent/HeaderContent.vue` apresenta o titulo traduzido
  e o valor atual.
- `src/components/LanguagesContent/LanguagesContent.vue` permite trocar o
  idioma ativo.
- `src/store/index.ts` cria a store Vuex e regista o modulo da calculadora.
- `src/store/modules/calculator.ts` guarda o estado da calculadora e expoe
  getters, mutations e actions.
- `src/services/calculatorEngine.ts` contem operacoes matematicas puras.
- `src/services/resultFormatter.ts` contem regras de formatacao, arredondamento,
  precisao e infinito.
- `src/constants/calculatorButtons.ts` centraliza as linhas de botoes e classes
  especiais.
- `src/constants/calculatorOperators.ts` centraliza os operadores suportados.
- `src/types/Calculator.ts` define tipos partilhados como `Operator`,
  `CalculatorErrorKey`, `CalculatorDisplayValue` e `CalculatorState`.
- `src/locales` contem as traducoes disponiveis.
- `test-utils` contem helpers reutilizaveis para testes.

## Responsabilidades

### Componentes

Os componentes devem continuar focados em apresentacao, props, eventos e
integracao com Vuex. Devem evitar implementar regras matematicas ou regras de
formatacao complexas.

Props devem ser declaradas com `required`, `default` e `PropType` quando isso
ajuda o TypeScript a documentar melhor o contrato do componente. Opcoes vazias
como `components: {}` ou `data: () => ({})` devem ser evitadas quando nao
acrescentam comportamento.

Eventos de UI devem evitar efeitos colaterais do browser. Por exemplo, links
usados como controlos devem usar `@click.prevent` ou ser substituidos por
`button` quando nao representam navegacao real.

`CalculatorContainer.vue` e o orquestrador principal da calculadora. Ele liga a
UI ao estado, reage aos eventos dos botoes e delega calculos e formatacao para
servicos puros.

### Store

O Vuex e a fonte de verdade para o estado da calculadora. Deve guardar dados
como valor atual, valor temporario, memoria, operador, estado de erro, infinito
e idioma ativo.

Regras recomendadas:

- Mutations devem fazer alteracoes pequenas e previsiveis ao estado.
- Actions devem continuar simples enquanto apenas encapsulam mutations.
- Estado deve guardar chaves de erro, nao mensagens finais traduzidas.
- Logica matematica complexa deve permanecer nos servicos.
- Testes do modulo Vuex devem validar getters, mutations e actions sem montar
  componentes.

### Servicos

Os servicos devem ser funcoes puras sempre que possivel.

- `calculatorEngine.ts` contem operacoes como soma, subtracao, multiplicacao,
  divisao, raizes, potencias, factorial, percentagem e `1/x`.
- `resultFormatter.ts` contem regras de precisao, notacao cientifica, casas
  decimais e tratamento de infinito.

Esses modulos devem ser faceis de testar sem Vue, Vuex ou i18n.

### Constantes

Configuracao estatica deve viver em `src/constants`.

- `calculatorButtons.ts` define as linhas de botoes exibidas pela calculadora.
- `calculatorOperators.ts` define os operadores binarios suportados.

Isto reduz strings magicas e facilita reorganizar a UI sem misturar
configuracao com regras de calculo.

### Internacionalizacao

As traducoes continuam centralizadas em `src/locales`.

Boa pratica:

- Guardar no estado apenas chaves de erro, como `divided_by_zero`.
- Traduzir mensagens na camada de apresentacao/orquestracao.
- Evitar guardar mensagens ja traduzidas como fonte de verdade permanente.

## Testes

Existem tres niveis principais de testes:

- Testes de componentes, para validar renderizacao, eventos, i18n e integracao
  com Vuex.
- Testes de servicos, para validar regras matematicas e formatacao em
  isolamento.
- Testes do modulo Vuex, para validar getters, mutations e actions diretamente.

Localizacao dos testes:

- `src/components/**/__tests__` para specs de componentes.
- `src/services/__tests__` para specs dos servicos puros.
- `src/store/modules/__tests__` para specs do modulo Vuex.

Cenarios cobertos incluem:

- Operacoes basicas: soma, subtracao, multiplicacao e divisao.
- Divisao por zero.
- Operacoes cientificas: potencias, raizes, factorial e `1/x`.
- Percentagem.
- Repeticao de `=`.
- Memoria da calculadora.
- Formatacao de resultados longos e infinito.
- Troca de idioma para erros e infinito.
- Getters, mutations e actions do store.

Comandos uteis:

```bash
yarn test --runInBand
yarn test:coverage
yarn lint
yarn build
```

Notas:

- `coverage/` e um artefacto gerado pelo Jest e esta ignorado no `.gitignore`.
- A cobertura atual esperada fica em 100% para statements, lines e functions,
  com branch coverage acima de 95%.

## Boas Praticas Para Proximas Alteracoes

- Separar UI, estado, dominio e i18n.
- Preferir funcoes puras para regras matematicas.
- Evitar strings magicas espalhadas pelo codigo.
- Manter componentes pequenos e orientados a apresentacao.
- Declarar props com tipos, defaults e obrigatoriedade explicitos.
- Remover opcoes vazias de componentes quando nao forem necessarias.
- Prevenir comportamento nativo indesejado em interacoes de UI, como
  navegacao causada por `href="#"`.
- Usar tipos partilhados quando um valor atravessa componentes, store e
  servicos.
- Guardar chaves de erro no estado, nao mensagens traduzidas.
- Cobrir regras de negocio com testes unitarios independentes de Vue.
- Usar testes de componente para validar interacao e integracao visual.
- Usar testes diretos do store para proteger o contrato de getters, mutations e
  actions.
- Atualizar este documento quando uma decisao arquitetural mudar a forma de
  evoluir o projeto.

## Criterios Para Novas Funcionalidades

Antes de adicionar uma nova funcionalidade, confirmar:

- A regra pertence a UI, ao estado ou ao dominio?
- A funcionalidade pode ser expressa como funcao pura?
- Existem tipos adequados para representar os novos valores?
- As props e eventos novos tem contrato explicito e testavel?
- A configuracao deve ficar em `src/constants`?
- As mensagens para o utilizador precisam de traducao?
- Ha testes unitarios para os casos principais e para os erros esperados?
- O novo comportamento precisa de teste de componente, teste de servico, teste
  do store ou uma combinacao deles?

## Proximos Passos Sugeridos

1. Reduzir gradualmente a responsabilidade de orquestracao do
   `CalculatorContainer.vue`, movendo fluxos mais complexos para actions ou
   helpers dedicados se o componente voltar a crescer.
2. Melhorar a tipagem dos helpers `mapActions` e `mapGetters`, que em Vue 2
   continuam pouco expressivos para TypeScript.
3. Rever se `currentResult` ainda e necessario ou se o display pode ser
   simplificado usando apenas `currentValue` e estado derivado.
4. Adicionar testes unitarios para casos limite adicionais, como factorial de
   numeros nao inteiros, valores negativos e resultados muito grandes.
5. Considerar uma convencao para nomes de eventos dos botoes, substituindo
   `handler1`, `handler2`, etc. por eventos mais explicitos se a UI crescer.
