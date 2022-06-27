function compare(a, b) {
    if (a.time <  b.time ) {
      return -1;
    }
    if (a.time >  b.time ) {
      return 1;
    }
    // a must be equal to b
    return 0;
  }



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
const updateMessages = () => {
    const res = readFromServer("/api/v1/messages").then((res) =>{

        res.json().then((body) => {
            body = body.sort(compare);
            body.splice(0, body.length - 5);
            const messages = document.getElementById("messages");
            let htmlString = "<table class='table table-dark'><thead><tr><th scope='col'>Author</th><th scope='col'>Message</th><th scope='col'>Date</th><th scope='col'>Time</th></tr></thead><tbody>";
            for(let i = 0; i < body.length; i++)
            {
                 const element = body[i];
                 htmlString += "<tr>";
                 
                 htmlString += "<th scope='row'>";
                 htmlString += element.author;
                 htmlString += "</th>";
         
                 htmlString += "<td>";
                 htmlString += element.message;
                 htmlString += "</td>";

                 const date = new Date(element.time);
                 htmlString += "<td>";
                 htmlString += date.toLocaleDateString('en-us', { 
                    weekday:"long", 
                    year:"numeric", 
                    month:"short", 
                    day:"numeric"}) ;
                 htmlString += "</td>";

                 htmlString += "<td>";
                 htmlString += 
                    (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) + 
                    " : " + date.getMinutes()+ " : "+ date.getSeconds() +
                    " " + (date.getHours() > 12 ? "PM" : "AM");
                 htmlString += "</td>";
                 
                 htmlString += "</tr>";
             }
             htmlString += "</tbody></table>";
             messages.innerHTML = htmlString;
        });
    });

};
updateMessages();
setInterval(updateMessages, 1000);
async function readFromServer(path) {
    return await fetch(path, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
}