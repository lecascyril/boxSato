import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Listen() {
  const { state: { contract, web3 } } = useEth();
  const [newEvents, setNewEvents] = useState([]);

    useEffect(() => {
        (async function () {
            const currentBlock = web3.eth.getBlockNumber()
            await contract.events.Transfer({ fromBlock: currentBlock })
                .on('data', async event => {
                    setNewEvents({...newEvents, from: event.returnValues.from, to: event.returnValues.to, value: event.returnValues.value});
                })
                .on('error',    err => console.log("err: " + err))
        })();
    });


  return (
    <div className="past">
        Voici les nouveaux evenements : <br /> <br />
    <table>
        <thead>
            <tr>
                <th>From</th>
                <th>To</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
        {newEvents.map((event) => {
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

export default Listen;