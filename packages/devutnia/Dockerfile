FROM docker.io/node:lts-alpine

WORKDIR /app

RUN addgroup --system devutnia && \
          adduser --system -G devutnia devutnia

COPY dist/packages/devutnia dist
RUN chown -R devutnia:devutnia .

CMD [ "node", "dist" ]