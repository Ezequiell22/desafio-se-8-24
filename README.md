# desafio - se  

    - os usuarios são cadastrados automaticamente quando inicia a aplicação
    - a aplicação nodejs contém rotas para CRUD de dívidas e CRUD de Bens, assim como a rota para obter o score
    - existe um teste unitário no service do score para testar a função de cálculo do score
    - todo o ambiente é montado automaticamente com as configurações dos arquivos docker-compose.yml e Dockerfile, esses arquivos contém configuração do banco postGreSql e do nodejs e seu ambiente.
    - para utilizar a aplicação basta fazer o login com o admin1 e cadastrar dívidas para os usuarios e após isso logar com algum destes usuarios e cadastras bens para os mesmos. Após essa etapa ja pode ser feita a consulta do score. O admin1 pode consultar o score de qualquer usuario.
    - o usuario só consegue consultar seu proprio score, não importando qual cpf ele informe no params da rota o service sempre pegara o cpf do id do token
    
## Technical choices:
    - postGreSql
    - nodejs
    - main libraries: knex, ramda, express

## users
   if role equals 1 is admin 

    name : admin1
    pass : trw1123
    role : 1

    name : maria_t
    pass : uu6642
    role : 2

    name : jose_almeida
    pass : 9938ss1
    role : 2
## requirements

    - docker
    - imsomnia

## config

    - importar arquivo Insomnia.json no insomnia para facilitar os testes

## Running with docker
    - docker-compose up --build

## Author
    - @ezequiell22