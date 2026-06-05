# Front-end - Agendamento de Transferências Financeiras

## Sobre o projeto

Este projeto é o front-end da aplicação de **Agendamento de Transferências Financeiras**.

A interface foi desenvolvida utilizando **Vue 3** e **Quasar Framework**, consumindo a API REST responsável pelo cadastro e consulta dos agendamentos.

A aplicação possui uma interface simples e objetiva, composta por três telas principais:

- **Home**: tela inicial com navegação para as funcionalidades disponíveis;
- **Nova Transferência**: cadastro de um novo agendamento de transferência;
- **Extrato de Transferências**: listagem dos agendamentos realizados.

---

## Tecnologias e versões utilizadas

- **Vue 3.2.13**
- **Vue Router 5.1.0**
- **Quasar 2.16.0**
- **Axios 1.17.0**
- **Vue CLI 5**
- **ESLint**

---

## Estrutura do projeto

```text
src
│   App.vue
│   main.js
│   quasar-user-options.js
│
├── components
│   └── MainLayout.vue
│
├── model
│   └── TransferenciaRequest.js
│
├── router
│   └── index.js
│
├── service
│   ├── FinanceiroService.js
│   └── httpClient.js
│
└── views
    │   HomePage.vue
    │
    └── financeiro
        ├── NovaTransferencia.vue
        └── ExtratoTransferencias.vue
```

### Organização

- **components**: componentes reutilizáveis da aplicação.
- **model**: modelos utilizados para comunicação com a API.
- **router**: configuração das rotas da aplicação.
- **service**: integração com a API através do Axios.
- **views**: telas da aplicação.

---

## Funcionalidades

### Nova Transferência

Permite o cadastro de uma nova transferência informando:

- Conta de origem;
- Conta de destino;
- Valor da transferência;
- Data da transferência.

Após o envio, a API calcula automaticamente a taxa aplicável e realiza o agendamento.

### Extrato de Transferências

Permite visualizar todas as transferências cadastradas, exibindo:

- Conta de origem;
- Conta de destino;
- Valor;
- Taxa;
- Data da transferência;
- Data de agendamento.

---

## Configuração da API

A URL da API é configurada através do arquivo `.env`.

Exemplo:

```env
VUE_APP_API_URL=http://localhost:8080
```

Certifique-se de que a API Spring Boot esteja em execução antes de iniciar o front-end.

---

## Como executar a aplicação

### Pré-requisitos

- Node.js
- npm

### Instalação das dependências

Na raiz do projeto execute:

```bash
npm install
```

### Executando em ambiente de desenvolvimento

```bash
npm run serve
```

Após a inicialização, a aplicação estará disponível em:

```text
http://localhost:8081
```

> A porta pode variar caso a porta padrão já esteja em uso.

### Gerando build para produção

```bash
npm run build
```

Os arquivos compilados serão gerados na pasta:

```text
dist/
```

---

## Comunicação com a API

A aplicação consome os endpoints disponibilizados pelo back-end através do serviço `FinanceiroService`.

Operações disponíveis:

- Cadastro de transferências (POST);
- Consulta de transferências (GET).

Toda a comunicação HTTP é centralizada através do `httpClient.js`, utilizando Axios para realizar as requisições.

---

## Autor

Projeto desenvolvido como solução para o desafio técnico de Agendamento de Transferências Financeiras.
