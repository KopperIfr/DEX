# CONTRATO 1 TOKEN.
Token ERC-20 Contract

Este proyecto es un contrato inteligente ERC-20 basado en Solidity que implementa un token fungible con un suministro máximo controlado.
El contrato permite la acuñación y quema de tokens, y cuenta con un sistema de administrador que restringe algunas operaciones clave.

Características:
Cumplimiento del estándar ERC-20: Utiliza la implementación de OpenZeppelin para garantizar la compatibilidad con el estándar ERC-20.
Suministro máximo: Controla el suministro máximo de tokens, evitando que se acuñen más tokens de los permitidos.
Acuñación y quema: El administrador puede acuñar y quemar tokens.
Sistema de administración: Solo la cuenta del administrador puede realizar operaciones críticas como acuñar, quemar o transferir la propiedad administrativa.

Requisitos:
[Node.js](https://nodejs.org/) (para la configuración del entorno)
[Hardhat](https://hardhat.org/) (o cualquier otra herramienta de desarrollo para contratos inteligentes)
[Solidity ^0.8.0](https://docs.soliditylang.org/)
[OpenZeppelin ERC-20](https://docs.openzeppelin.com/contracts/4.x/erc20)

INSTALACION:
Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/token-erc20.git
   cd token-erc20
Instala las dependencias:
npm install
Compila el contrato:
npx hardhat compile

USO Y DESPLIEGUE (HARDHAT)

async function main() {
  const [deployer] = await ethers.getSigners();

  const Token = await ethers.getContractFactory("Token");
  const initialSupply = ethers.utils.parseUnits("1000", 18);  // Ajusta según lo que desees
  const maxSupply = ethers.utils.parseUnits("1000000", 18);   // Ajusta según tu límite
  const token = await Token.deploy(initialSupply, maxSupply, "MyToken", "MTK");

  console.log("Token deployed to:", token.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


INTERACCION:
1.Acuñar tokens (solo administrador). 
  function mint(uint256 _amount, address _to) public onlyAdmin
2.Quemar tokens (solo administrador):
  function burn(uint256 _amount) public onlyAdmin
3.Cambiar administrador:
  function setAdmin(address _admin) public onlyAdmin

ERRORES PERSONALIZADOS:
Exceded_Max_Supply(uint256 supply, uint256 max_supply, address minter) 
 Lanza un error si se excede el suministro máximo.
Only_Admin(address caller, address admin) 
 Lanza un error si alguien que no es administrador intenta realizar una acción restringida.
Amount_Required(address sender, uint256 amount) 
 Lanza un error si la cantidad especificada para la acuñación es 0 o menor.


# CONTRATO 2 DEX
Contrato de intercambio de tokens (DEX)
Características

Intercambio de tokens: Permite a los usuarios intercambiar entre `tokenA` y `tokenB`.
Tasa de intercambio fija: La tasa de conversión entre los dos tokens se define en el despliegue del contrato.
Verificación de saldos: Antes de completar una operación de intercambio, el contrato verifica si ambos usuarios tienen el saldo suficiente.

 REQUISITOS:

 [Node.js](https://nodejs.org/) (para el entorno de desarrollo)
[Hardhat](https://hardhat.org/) (u otra herramienta para el despliegue de contratos inteligentes)
[Solidity ^0.8.0](https://docs.soliditylang.org/)
[OpenZeppelin ERC-20](https://docs.openzeppelin.com/contracts/4.x/erc20)

INSTALACION

 Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/dex-erc20.git
   cd dex-erc20

Instala las dependencias:
npm install

Compila el contrato:
npx hardhat compile

Uso y Despliegue (Hardhat)
Para desplegar el contrato, necesitarás especificar las direcciones de los tokens ERC-20 que se intercambiarán y una tasa de cambio. 

async function main() {
  const [deployer] = await ethers.getSigners();

  const DEX = await ethers.getContractFactory("DEX");
  const tokenA = "0xTokenA_Address";  // Sustituye con la dirección de token A
  const tokenB = "0xTokenB_Address";  // Sustituye con la dirección de token B
  const rate = 100;  // Ejemplo: 1 token A = 100 tokens B

  const dex = await DEX.deploy(tokenA, tokenB, rate);

  console.log("DEX deployed to:", dex.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

 INTERACCION:
Intercambiar tokenA por tokenB:
function swapAtoB(uint256 _amount, address _walletTokenB) public

Intercambiar tokenB por tokenA:
function swapBtoA(uint256 _amount, address _walletTokenA) public

Errores personalizados
Se lanza si un usuario intenta realizar una operación sin tener el saldo suficiente.
Insuficient_Balance(address sender, uint256 amount)

