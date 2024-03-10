const apiURL = 'https://squid-app-rd2ht.ondigitalocean.app/comp4537/lab5/api/v1/query/';

class sqlRequest {

    constructor() {
        this.insertDefaultDiv = document.getElementById('insertDefaultSQL');
        this.userQueryDiv = document.getElementById('userSQLQuery');
        this.responseDiv = document.getElementById('response');
        this.init();
    }

    init() {
        this.insertDefaultDiv.innerHTML = '';
        const insertButton = document.createElement('button');
        insertButton.innerText = DefaultInsertButton;
        insertButton.addEventListener('click', this.handleUserReq.bind(this, defaultInsertSQL));
        this.insertDefaultDiv.appendChild(insertButton);

        this.userQueryDiv.innerHTML = '';
        const userQuery = document.createElement('textarea');
        userQuery.value = DefaultQuery;
        const submitButton = document.createElement('button');
        submitButton.innerText = SendRequestButton;
        submitButton.addEventListener('click', () => this.handleUserReq(userQuery.value));
        this.userQueryDiv.appendChild(userQuery);
        this.userQueryDiv.append(document.createElement('br'));
        this.userQueryDiv.appendChild(submitButton);
    }

    displayResponse(response) {
        this.responseDiv.innerHTML = '';
        const responseText = document.createElement('p');
        responseText.innerText = response;
        this.responseDiv.appendChild(responseText);
    }

    handleUserReq(SQLquery) {
        const queryType = SQLquery.trim().split(' ')[0].toUpperCase();
        // console.log('User SQL Query: ' + SQLquery);
        // console.log('Query Type: ' + queryType);

        if (queryType === 'INSERT') {
            console.log('sending POST request');
            this.sendPOSTRequest(SQLquery);
        } else if (queryType === 'SELECT') {
            console.log('sending GET request');
            this.sendGETRequest(SQLquery);
        } else {
            console.log('Invalid SQL Query Type: ' + queryType);
            this.displayResponse(ErrorMessage);
        }
    }

    sendGETRequest(query) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', (apiURL + query), true);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                const response = JSON.parse(xhr.responseText);
                console.log(response.data);
                const formattedResponse = JSON.stringify(response.data);
                if (response.isError) {
                    console.error('Error: ' + formattedResponse);
                    this.displayResponse(formattedResponse);
                } else {
                    console.log('Data: ' + formattedResponse);
                    this.displayResponse(formattedResponse);
                }

            } else {
                console.log(xhr.responseText);
                this.displayResponse(ServerError);

            }
          }
        };
        xhr.send();
    }

    sendPOSTRequest(query) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', apiURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
                const response = JSON.parse(xhr.responseText);
                if (response.isError) {
                    console.error('Error: ' + response.data);
                    this.displayResponse(response.data);
                } else {
                    console.log('Data: ' + response.data);
                    this.displayResponse(response.data);
                }
  
            } else {
                console.log(xhr.responseText);
                this.displayResponse(ServerError);

            }
          }
        };
        xhr.send(JSON.stringify({query: query}));
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const sql = new sqlRequest();
});
