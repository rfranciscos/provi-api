# MIGRATION

## Adicione aqui os arquivos de migration para serem aplicados no banco

Comandos:

APLICAR -> `npm run migration:run`

REVERTER -> `npm run migration:revert`

Caso tenha o CLI do typeorm instalado será possível gerar a estrura de uma migrations utilizando o comando:

CRIAR -> `typeorm migration:create -n <NOME DA MIGRATION>`

Saiba mais em: https://typeorm.io/#migrations/creating-a-new-migration
