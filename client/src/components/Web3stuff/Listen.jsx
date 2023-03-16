import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Listen() {
  const { state: { contract } } = useEth();
  const [newEvents, setNewEvents] = useState([]);
  const [testNewE, setTestNewE] = useState(false);


    
    useEffect(() => {
        contract.events.Transfer({ fromBlock: "latest" })
            .on("data", (event) => {
                setTestNewE(true);
                let newEvent = {from:null, to:null, value:null};
                let events = newEvents;
                newEvent.from = event.returnValues.from;
                newEvent.to = event.returnValues.to;
                newEvent.value = event.returnValues.value;
                events.push(newEvent);
                setNewEvents(events)
                console.log(newEvents);
            });
    });

    
  return (
    <div className="past">
        {testNewE===false ? <div className="newEvents">Pas de nouveaux events.</div> : 
        <div className="newEvents">
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

    </div>}
    </div>
  );
}

export default Listen;