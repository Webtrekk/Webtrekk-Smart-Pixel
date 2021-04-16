<script>
    import {Socket} from 'phoenix-socket';
    import {onMount} from "svelte";
	const url = 'http://localhost:4000/requests/raw';
	const getRequests = async (doDelete) => {
	    let u = url;
	    if(doDelete) {
	        u = u + '?action=delete';
        }
	    const response = await fetch(u);
	    return response.json();
    }
	let socket;
	let channel;
    let requests = [];
    let filter = [];
    $: header = (() => {
        let allParams = [];
        requests.forEach(r => Object.keys(r).forEach(v => allParams.push(v)));
        allParams = [...new Set(allParams)];
        allParams = allParams.filter(v => !filter.includes(v));
        return allParams.sort();
    })();

    $: tableRows = (() => {
        let table = [];
        requests.forEach( r => {
            const row = {};
            header.forEach((h) => {
                row[h] = r.hasOwnProperty(h) ? r[h] : '';
            });
            table.push(row);
        })
        return table;
    })();


    onMount( () => {
        socket = new Socket("ws://127.0.0.1:4000/socket")
        channel = socket.channel("requests:lobby", {})
        channel.join()
            .receive("ok", () => { console.log("Joined successfully") })
            .receive("error", () => { console.log("Unable to join") })
        channel.on("new_request", (t) => requests = [t, ...requests]);
        channel.on("delete_request", () => requests = []);
        socket.connect();
        getRequests().then( d => requests = d );
    });

</script>
<body>
{#if requests.length === 0}
    <div>No requests so far...</div>
{:else}
    <div class="buttons">
        <button id="del" on:click={()=>getRequests(true)}>DELETE</button>
        {#each filter as f}
            <button on:click={()=>filter=filter.filter(v=> v!==f )}>{f}</button>
        {/each}
    </div>
    <div class="container">
        <table>
            <thead>
            <tr>
                {#each header as header(header)}
                    <th on:click={()=>{filter= [...filter, header]}}>{header}</th>
                {/each}
            </tr>
            </thead>
            <tbody>
            {#each tableRows as row}
                <tr>
                    {#each header as header(header)}
                        <td>{row[header]}</td>
                    {/each}
                </tr>
            {/each}
            </tbody>
        </table>
    </div>
{/if}
</body>


<style>
    table {
        font-size: small;
        width:100%;
    }
    table, th, td {
        border: 1px solid black;
        border-collapse: collapse;
    }
    th, td {
        padding: 5px;
        text-align: left;
    }
    tr:nth-child(even) {
        background-color: #eee;
    }
    tr:nth-child(odd) {
        background-color: #fff;
    }
    tr:hover {
        background-color: #0b2e13;
        color:white;
    }
    th {
        background-color: #0c5460;
        color: white;
        cursor: pointer;
        user-select: none;
    }
    th:hover {
        background-color: #1b1e21;
        color:white;
    }

    .buttons button {
        background-color: #0c5460;
        color: white;
        cursor: pointer;
        border:0;
        padding: 8px;
        margin-bottom: 5px;
        margin-right: 2px;
    }

    .buttons button:hover {
        background-color: #1b1e21;
        color:white;
    }

    #del {
        background-color: indianred;
    }
    #del:hover {
        background-color: darkred;
    }
</style>