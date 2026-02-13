# Carômetro Escolar / Gerenciador de Identificação de Alunos

Esta é uma aplicação Next.js projetada para gerenciar fotos de identificação de alunos em um ambiente escolar. Ela permite importar dados de alunos via CSV, pesquisar alunos e capturar fotos usando uma webcam. As fotos são salvas com uma convenção de nomenclatura padronizada (`Matricula_Nome.jpg`), tornando-as adequadas para sistemas de reconhecimento facial ou geração de cartões de identificação.

## Funcionalidades

- **Importação de CSV**: Importe facilmente listas de alunos usando um arquivo CSV padrão (`Matricula,Nome`).
- **Busca em Tempo Real**: Pesquisa e filtragem eficiente por nome ou matrícula do aluno.
- **Integração com Webcam**: Interface de câmera integrada para capturar fotos de alunos diretamente no navegador.
- **Salvamento Padronizado de Arquivos**: Fotos são salvas automaticamente em `public/photos` com o formato de nome de arquivo `Matricula_Nome.jpg`.
- **Rastreamento Visual de Status**: Veja rapidamente quais alunos já possuem foto (borda verde/marca de verificação) e quais não.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org) (App Router)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com)
- **Ícones**: [Lucide React](https://lucide.dev)
- **Câmera**: [react-webcam](https://www.npmjs.com/package/react-webcam)

## Começando

Primeiro, execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Guia de Uso

### 1. Preparar Dados dos Alunos
Crie um arquivo CSV (ex: `alunos.csv`) com os seguintes cabeçalhos (ou apenas as colunas):
```csv
Matricula,Nome
12345,Fulano de Tal
67890,Beltrana da Silva
...
```

### 2. Importar Dados
- Clique no botão "Importar CSV" no canto superior direito.
- Selecione seu arquivo CSV preparado.
- A lista de alunos será preenchida automaticamente.

### 3. Capturar Fotos
- Use a barra de pesquisa para encontrar um aluno específico.
- Clique no cartão de um aluno para abrir a interface da câmera.
- Permita o acesso à câmera se solicitado.
- Clique em "Capturar Foto" para tirar uma foto.
- Revise a foto e clique em "Salvar Foto".
- A foto será salva no diretório `public/photos`, e o cartão do aluno será atualizado para mostrar a nova imagem.

## Estrutura do Projeto

- `app/page.tsx`: Ponto de entrada principal.
- `components/StudentList.tsx`: Gerencia o estado da lista de alunos, pesquisa e importação de CSV.
- `components/CameraCapture.tsx`: Lida com a interface da webcam e captura de imagem.
- `app/api/save-photo/route.ts`: Rota da API responsável por salvar os dados da imagem base64 no sistema de arquivos.
- `public/photos`: Diretório onde as fotos capturadas são armazenadas.

## Saiba Mais

Para saber mais sobre Next.js, dê uma olhada nos seguintes recursos:

- [Documentação Next.js](https://nextjs.org/docs) - aprenda sobre as funcionalidades e API do Next.js.
- [Aprenda Next.js](https://nextjs.org/learn) - um tutorial interativo de Next.js.
