# Imagem base do Node.js
FROM node:16

# Diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copiar o package.json e instalar as dependências
COPY package.json ./
RUN npm install

# Copiar o restante dos arquivos do projeto
COPY . .

# Expor a porta que o servidor usará
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
