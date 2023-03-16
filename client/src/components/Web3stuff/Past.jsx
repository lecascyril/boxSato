import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Past() {
  const { state: { contract,txhash, web3 } } = useEth();
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    async function getPastEvent() {
        if (contract) {
            const deployTx = await web3.eth.getTransaction(txhash)
            const results = await contract.getPastEvents("Transfer", { fromBlock:deployTx.blockNumber , toBlock: "latest" });
            const Transfers = results.map((transfer) => {
                let PastE = {from:null, to:null, value:null};
                PastE.from = transfer.returnValues.from;
                PastE.to = transfer.returnValues.to;
                PastE.value = transfer.returnValues.value;
                return PastE;
              });
            setPastEvents(Transfers);
        }
    }
    getPastEvent();
  });

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
        {pastEvents.map((event, index) => {
                return (
                <tr key={index}>
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