# PROYECTO DEX

## Objetivos
El principal objetivo de este proyecto es desarrollar un DEX descentralizado donde los usuarios puedan crear e intercambiar 2 tokens (Token A y Token B) mediante el uso de Smart Contracts basados en la blockchain de Ethereum.

## Token.sol
Este contrato permite la creación y administración de un **token ERC20** personalizado, con funciones de emisión (minting) y quema (burning) controladas por un administrador (centralizado). Implementa un suministro máximo fijo (maxSupply), lo que asegura que no se puedan emitir tokens de forma ilimitada. 
Una ventaja del contrato es que permite la administración del mismo, los tokens sin un control explícito pueden generar una inflación no deseada, disminuyendo el valor del token para los holders. Además el administrador tiene la capacidad de transferir el control de las operaciones de emisión y quema a otro administrador.

### Variables Principales y Parámetros del Constructor
- **maxSupply:** Suministro máximo de tokens que se pueden crear, no puede modificarse posteriormente.
- **admin:** Dirección del administrador del contrato. Esta dirección tiene privilegios especiales, como la capacidad de acuñar (mint) y quemar (burn) tokens, además de cambiar la dirección del administrador.
- **_initialSupply:** Suministro inicial de tokens a crear.
- **_maxSupply:** Suministro máximo de tokens que se pueden crear.
- **_name:** Nombre del token.
- **_symbol:** Símbolo del token.

### Funciones
- **mint(uint256 _amount, address _to):** Permite mintear nuevos tokens, solo el administrador puede llamar a esta función. Revierte si la cantidad es 0 o si se excede el suministro máximo. Los tokens se mintean en la dirección del administrador y luego se transfieren a la dirección especificada _to, si se especifica.
- **burn(uint256 _amount):** Permite quemar (burn) tokens, solo el administrador puede llamar a esta función. Realiza la quema de tokens en la cuenta del administrador.
- **setAdmin(address _admin):** Permite cambiar la dirección del administrador. Solo el administrador esta autorizado para realizarlo.

### Errores personalizados
- **Exceded_Max_Supply:** Se emitiria cuando una operación intenta incrementar el suministro de tokens más allá del maxSupply.
- **Only_Admin:** Se emitiria cuando una dirección no administradora intenta realizar una operación restringida.
- **Amount_Required:** Se emitiria cuando se intenta mintear una cantidad de tokens igual o inferior a cero.


## DEX.sol
Este contrato permite realizar intercambios entre dos tokens ERC20 de manera descentralizada. Facilita swaps simples y directos entre tokens en función de la cantidad de tokens disponibles (asumidos como liquidez).


- **Función Principal**

swap(address _tokenA, address _tokenB, address _to, uint256 _amount):  

Permite intercambiar una cantidad específica de un token ERC20 por otro ERC20. Estos son sus parámetros:

- **-_tokenA:** Dirección del contrato del token que el usuario desea intercambiar.
- **_tokenB:** Dirección del contrato del token que el usuario desea recibir.
- **_to:** Dirección del destinatario de los tokens _tokenA.
- **_amount:** Cantidad del token _tokenA que se va a intercambiar.

Si las direcciones de ambos tokens son iguales, se revierte la transacción. El tipo de cambio se calcula basándose en la relación entre el suministro total de los tokens A y B.
 Se verifica que el balance del remitente tenga suficiente cantidad de _tokenA y que el destinatario tenga suficiente cantidad de _tokenB para recibir.

### Errores personalizados
- **Insuficient_Balance:** Se emitiria cuando el balance del usuario no es suficiente para realizar la operación.
- **Unsoported_Token:** Se emitiria cuando uno de los tokens involucrados en la operación no es reconocido o soportado por el contrato. 
- **Same_Token:** Se emitiria cuando se intenta intercambiar un token por sí mismo.

### COMPILACION
Ejecutar el siguiente comando en tu terminal
```bash
 hh compile
```
Limpiar Cache
```bash
hh cleant
```

Ejecutar el test
```bash
hh test
```
![alt text](https://github.com/KopperIfr/DEX/blob/main/images/local-test.png "Logo Title Text 1")

(Esto ejecutará el test para verificar el comportamiento de los contratos)

 
### DESPLIEGUE DE LOS CONTRATOS

- **Desplegamos los Contratos  en Ethereum Sepolia (hardhat):**
```bash
 hh deploy --network sepolia
```

## Verificaciones de los contratos:

Los contratos no se verificaran con el comando "verify" de hardhat, lo hemos hecho usando una funcion en el codigo llamada verify()

TokenA: https://sepolia.etherscan.io/address/0x2114DDf9Af5EB807D08FDE3e9597fdDC77F897fF

TokenB: https://sepolia.etherscan.io/address/0x0f635c01838Cb5c61C14F4469312159bf6a868Ee

DEX: https://sepolia.etherscan.io/address/0x1966Bae430F38f6A0ceEF28Be0A80ebC1ccA2313
 
 ### Transacciones
 
Transacciones tokenA

 - https://sepolia.etherscan.io/address/0x2114DDf9Af5EB807D08FDE3e9597fdDC77F897fF

Transacciones tokenB
 - https://sepolia.etherscan.io/address/0x0f635c01838Cb5c61C14F4469312159bf6a868Ee

Transacciones DEX
 - https://sepolia.etherscan.io/address/0x1966Bae430F38f6A0ceEF28Be0A80ebC1ccA2313












