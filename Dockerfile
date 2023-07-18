# Build Stage
FROM node:16-alpine AS BUILD_IMAGE
WORKDIR /
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn run build


# Production Stage
FROM node:16-alpine AS PRODUCTION_STAGE
WORKDIR /app
COPY --from=BUILD_IMAGE /package*.json ./
COPY --from=BUILD_IMAGE yarn.lock ./
COPY --from=BUILD_IMAGE /.next ./.next
COPY --from=BUILD_IMAGE /public ./public
COPY --from=BUILD_IMAGE /node_modules ./node_modules
COPY --from=BUILD_IMAGE . .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["yarn", "start"]