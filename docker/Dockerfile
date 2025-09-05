#build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY app/package*.json ./
RUN npm ci --only=production
COPY app/. .

#Runtime stage (slim, non-root)
FROM gcr.io/distroless/nodejs20-debian12
WORKDIR /app
COPY --from=build /app /app
USER 10001:10001
EXPOSE 3000
CMD ["index.js"]
