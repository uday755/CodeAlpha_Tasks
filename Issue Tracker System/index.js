function submitIssue(e) {
    const getInputData = id => document.getElementById(id).value;
    const description = getInputData('description');
    const severity = getInputData('severity');
    const assign = getInputData('assign');
    const id = Math.floor(Math.random()*10000000000) + '';
    const status = 'Open';

    // Validation Checks
    if (description.lenght <= 3) {
        alert("Description Should be of atlease 3 lenght");
    }
    else if (assign.lenght == 0) {
        alert("Assigned Person cannot be named Null");
    } else {
        const issue = { id, description, severity, assign, status }
        let issues = [];
        if (localStorage.getItem('issues')) {
            issues = JSON.parse(localStorage.getItem('issues'));
        }
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
        fetchIssues();
    }
}

const closeIssue = (id)=>{
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => issue.id == id);
    currentIssue.status = 'Closed';
    currentIssue.description = `<s>${currentIssue.description}</s>`
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}


const deleteIssue = (id)=>{
    const issues = JSON.parse(localStorage.getItem('issues'));
    const leftIssues = issues.filter((issue) => ((issue.id) != id));
    localStorage.removeItem('issues');
    localStorage.setItem('issues', JSON.stringify(leftIssues));
    fetchIssues();
}



const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = document.getElementById('issuesList');
    issuesList.innerHTML = '';
    for (var ind = 0; ind < issues.length; ind++) {
        const { id, description, severity, assign, status } = issues[ind];

        issuesList.innerHTML += `
                                <div class="bg-light my-4 p-3">
                                    <h6>Issue ID : ${id}</h6>
                                    <p><span class ="badge text-bg-secondary"> ${status}</span></p>
                                    <h4 >${description}</h4>
                                    <p><span class="bi bi-stopwatch">Severity : ${severity}</span></p>
                                    <p><span><i class="bi bi-person-fill"></i>${assign}</span></p>
                                    <button type="button" onClick={closeIssue(${id})} class="btn btn-warning">Close Issue</button>
                                    <button type="button" onClick={deleteIssue(${id})} class="btn btn-danger">Delete</button>
                                </div>
                                `
    }

}

fetchIssues();