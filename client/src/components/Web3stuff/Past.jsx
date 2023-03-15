import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Past() {
  const { state: { contract,txhash, web3 } } = useEth();
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    async function getPastEvent() {
        if (contract) {
            const deployTx = await web3.eth.getTransaction(txhash)
            const currentBlock = await web3.eth.getBlockNumber()
            const results = await contract.getPastEvents("Transfer", { fromBlock:deployTx.blockNumber , toBlock: currentBlock });
            const Transfers = results.map((transfer) => transfer.returnValues);
            let PastE = [];

            for (const Transfer of Transfers) {
                PastE.push(
                  {
                    from: Transfer.from,
                    to: Transfer.to,
                    value: Transfer.value
                  }
                );
            }
            setPastEvents(PastE);

        }
    }
    getPastEvent();
  }, [contract]);

  return (
    <div className="past">
        Voici les anciens evenements : <br /> <br />
    <table>
        <thead>
            <tr>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
        {pastEvents.map((event) => {
                return (
                <tr>
                    <td>{event.from}</td>
                    <td>{event.to}</td>
                    <td>{event.value}</td>
                </tr>
                )
            })}
        </tbody>
    </table>
    <br />

    </div>
  );
}

export default Past;