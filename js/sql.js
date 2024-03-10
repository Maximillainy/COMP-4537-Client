const apiURL = 'https://squid-app-rd2ht.ondigitalocean.app/comp4537/lab5/api/v1/query';

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
        const req = `${apiURL}/${query}`;
        xhr.open('GET', req, true);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText);
            if (response.isError) {
                console.error('Error: ' + response.data);
                this.displayResponse(response.data);
            } else {
                let formattedData = ''
                for (let i = 0; i < response.data.length; i++) {
                    formattedData += JSON.stringify(response.data[i]) + '\n\n';
                }
                this.displayResponse(formattedData);
            }
          }
        };
        xhr.send();
    }

    sendPOSTRequest(query) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', apiURL, true);
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            const response = JSON.parse(xhr.responseText);
            if (response.isError) {
                console.error('Error: ' + response.data);
                this.displayResponse(response.data);
            } else {
                this.displayResponse(InsertSuccess);
            }
          }
        };
        xhr.send(JSON.stringify({query: query}));
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const sql = new sqlRequest();
});
