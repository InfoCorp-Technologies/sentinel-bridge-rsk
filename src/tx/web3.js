async function getNonce(web3, address) {
  try {
    return await web3.eth.getTransactionCount(address)
  } catch (e) {
    throw new Error(`Nonce cannot be obtained`)
  }
}

async function getBlockNumber(web3) {
  try {
    return await web3.eth.getBlockNumber()
  } catch (e) {
    throw new Error(`Block Number cannot be obtained`)
  }
}

async function getChainId(web3) {
  try {
    return await web3.eth.net.getId()
  } catch (e) {
    throw new Error(`Chain Id cannot be obtained`)
  }
}

async function getRequiredBlockConfirmations(contract) {
  try {
    return await contract.methods.requiredBlockConfirmations().call()
  } catch (e) {
    throw new Error(`Required block confirmations cannot be obtained`)
  }
}

async function getEvents({ contract, event, fromBlock, toBlock, filter }) {
  function checkFilter(e, filter) {
    let ok = true
    if (filter.length > 0) {
      ok = e.returnValues.to.toLowerCase() === filter.to.toLowerCase()
    }
    return ok
  }

  try {
    const events = await contract.getPastEvents('allEvents', { fromBlock, toBlock, filter })
    const filteredEvents = events.filter(e => e.event === event && checkFilter(e, filter))
    return filteredEvents
  } catch (e) {
    throw new Error(`${event} events cannot be obtained`)
  }
}

module.exports = {
  getNonce,
  getBlockNumber,
  getChainId,
  getRequiredBlockConfirmations,
  getEvents
}
