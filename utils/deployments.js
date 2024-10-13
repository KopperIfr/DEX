
const deployToken = async (deploy, deployer, name, symbol, initSupply, maxSupply) => {
    const contractDeployment = await deploy('Token', {
        from: deployer,
        args:[
            initSupply,
            maxSupply,
            name,
            symbol
        ],
        log: true
    })
    console.log(`${name} deployed at: ${contractDeployment.address}`);
    console.log("===============================");
    return contractDeployment;
}


const deployDEX = async (deploy, deployer, tokenA, tokenB) => {
    const contractDeployment = await deploy('DEX', {
        from: deployer,
        args:[
            tokenA,
            tokenB,
            2
        ],
        log: true
    })
    console.log(` DEX deployed at: ${contractDeployment.address}`);
    console.log("===============================");
    return contractDeployment;
}




module.exports = {
    deployToken,
    deployDEX
}