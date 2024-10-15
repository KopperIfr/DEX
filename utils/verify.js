async function verify(run, contractAddress, args) {
    console.log("Verifying contract...")
    try {
        console.log('im here');
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
            })
    } catch (e) {
        console.log('Catching error..');
        if (e.message.toLowerCase().includes("already verified")) {
        console.log("Already Verified!")
        } else {
        console.log(e)
        }
    }
}

module.exports = {
    verify
}