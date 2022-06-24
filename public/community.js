function postMessage()
{
    const message = document.getElementById("message").value;
    const author = document.getElementById("author").value;
    logToServer({message:message, author:author}, '/api/v1/messages');
}
function logToServer(data, path) {
    fetch(path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => { console.log("Request complete! response:", res, data); });
}
setInterval(async () => {
    const res = await readFromServer("/api/v1/messages");

    const messages = document.getElementById("messages");
    const body = await res.json();
    console.log(body);
    messages.innerHTML = "<table> <tr><th>Author</th><th>Message</th></tr>";
    body.forEach((element) => {
        messages.innerHTML += "<tr>";
        
        messages.innerHTML += "<td>";
        messages.innerHTML += element.author;
        messages.innerHTML += "  </td>";

        messages.innerHTML += "<td>";
        messages.innerHTML += element.message;
        messages.innerHTML += "</td>";
        
        messages.innerHTML += "</tr><br>";
    });
    message.innerHTML += "</table"
}, 1000);
async function readFromServer(path) {
    return await fetch(path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
}