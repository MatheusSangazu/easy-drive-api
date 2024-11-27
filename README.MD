# EasyDrive API

A **EasyDrive API** é um sistema backend desenvolvido em Node.js para a gestão de motoristas e veículos. Com esta API, é possível cadastrar motoristas, registrar veículos, consultar informações sobre os veículos de um motorista, e muito mais!

### Funcionalidades

- **Cadastro de Motorista**: Cadastrar um novo motorista com informações como nome, telefone, e-mail, e meta diária líquida.
- **Cadastro de Veículo**: Registrar um novo veículo associado a um motorista, incluindo informações como marca, modelo e consumo de combustível.
- **Consulta de Veículos por Motorista**: Recuperar todos os veículos associados a um motorista pelo seu ID.

---

### Como Rodar o Projeto

#### 1. Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/easy-drive-api.git
```
#### 2. Clonando o Repositório
- Navegue até o diretório do projeto e instale as dependências com o seguinte comando:
```bash
cd easy-drive-api
npm install
```

#### 3. Criando Banco de Dados

```bash
CREATE DATABASE EasyDrive;
USE EasyDrive;

CREATE TABLE motorista (
    id_motorista INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(30) NOT NULL,
    telefone VARCHAR(15),
    email VARCHAR(100) NOT NULL UNIQUE,
    meta_diaria_liquida DECIMAL(10,2) NOT NULL
);

CREATE TABLE veiculo (
    id_veiculo INT PRIMARY KEY AUTO_INCREMENT,
    id_motorista INT NOT NULL,
    marca VARCHAR(45) NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    consumo_cidade DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (id_motorista) REFERENCES motorista(id_motorista)
);

CREATE TABLE corrida (
    id_corrida INT PRIMARY KEY AUTO_INCREMENT,
    id_motorista INT NOT NULL,
    data_hora_inicio DATETIME NOT NULL,
    data_hora_fim DATETIME NOT NULL,
    distancia DECIMAL(5,2) NOT NULL,
    preco_viagem DECIMAL(10,2) NOT NULL,
    tempo_trajeto TIME NOT NULL,
    FOREIGN KEY (id_motorista) REFERENCES motorista(id_motorista)
);

CREATE TABLE rentabilidade (
    id_rentabilidade INT PRIMARY KEY AUTO_INCREMENT,
    id_corrida INT NOT NULL,
    custo_medio_combustivel DECIMAL(10,2) NOT NULL,
    rentabilidade_final DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (id_corrida) REFERENCES corrida(id_corrida)
);

```

### Endpoints da API



#### 1. **Cadastro de Motorista**

- **Rota**: `POST /CadastrarMotorista/cadastrar`
- **Descrição**: Cadastra um novo motorista.
- **Corpo da Requisição**:

```json
{
    "nome": "Carlos Andrade",
    "telefone": "21999999999",
    "email": "carlos.andrade@example.com",
    "senha": "senha123",
    "meta_diaria_liquida": 150.00
}
```


- **Resposta da Requisição**:

```json
{
    "mensagem": "Motorista cadastrado com sucesso.",
    "motorista": {
    "id_motorista": 1,
    "nome": "João Silva",
    "telefone": "1234567890",
    "email": "joao@exemplo.com",
    "meta_diaria_liquida": 100.00
    }
}
```

#### 2. **Cadastro de Veiculo**

- **Rota**: `POST /CadastrarVeiculo/cadastrar`
- **Descrição**: Cadastra um novo Veículo.
- **Corpo da Requisição**:

```json
{
   "id_motorista": 1,
    "marca": "Chevrolet",
    "modelo": "Onix",
    "consumo_cidade": 8.5
}
```


- **Resposta da Requisição**:

```json
{
    "mensagem": "Veículo cadastrado com sucesso.",
    "veiculo": {
        "id_veiculo": 2,
        "id_motorista": 1,
        "marca": "Chevrolet",
        "modelo": "Onix",
        "consumo_cidade": 8.5
    }
}
```

#### 3. **Fazer Login**

- **Rota**: `POST /loginMotorista/login`
- **Descrição**: Valida o Login.
- **Corpo da Requisição**:

```json
{
   "email": "carloos.andrade@example.com",
    "senha": "senha123"
}
```


- **Resposta da Requisição**:

```json
{
    "mensagem": "Login bem-sucedido",
    "motorista": {
        "id_motorista": 1,
        "nome": "Carlos Andrade",
        "email": "carlos.andrade@example.com",
        "meta_diaria_liquida": "150.00"
    }
}
```

#### 4. **Buscar Veiculo**

- **Rota**: `Get /getVeiculo/veiculos/:id`
- **Descrição**: Vai trazer os carros do Usuario.
- **Corpo da Requisição**:


- **Resposta da Requisição**:

```json
{
    
    "mensagem": "Veículos encontrados.",
    "veiculos": [
        {
            "id_veiculo": 2,
            "id_motorista": 1,
            "marca": "Chevrolet",
            "modelo": "Onix",
            "consumo_cidade": "8.50"
        }
    ]
}
```