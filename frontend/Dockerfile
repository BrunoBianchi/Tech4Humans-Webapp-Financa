FROM node:20

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --prod=false

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev", "--host"]