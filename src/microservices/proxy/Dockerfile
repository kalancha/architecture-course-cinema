
FROM oven/bun:1-slim AS base
WORKDIR /app

COPY package.json bun.lock* ./


FROM base AS production-deps
RUN bun install --frozen-lockfile --production


FROM base AS dev-deps
RUN bun install --frozen-lockfile


FROM base AS development

COPY --from=dev-deps /app/node_modules ./node_modules

COPY ./src ./src
COPY tsconfig.json ./

EXPOSE 8000

CMD ["bun", "--watch", "src/index.ts"]

FROM base AS production

ENV NODE_ENV=production

COPY --from=production-deps /app/node_modules ./node_modules

COPY src ./src
COPY tsconfig.json ./

EXPOSE 8000

CMD ["bun", "src/index.ts"]
