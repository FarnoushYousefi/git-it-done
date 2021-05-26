var issueContainerEl = document.querySelector('#issues-container');

var getRepoIssues = function (repo) {
  var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';

  fetch(apiUrl).then(function (response) {
    // request was successful
    if (response.ok) {
      response.json().then(function (data) {
        displayIssues(data);

        if (response.headers.get('Link')) {
          console.log('repo has more than 30 issues');
        }
      });
    } else {
      alert('There was a problem with your request!');
    }
  });
};

getRepoIssues('facebook/react');

var displayIssues = function (issues) {
  for (var i = 0; i < issues.length; i++) {
    var issueEl = document.createElement('a');
    issueEl.classList = 'list-item flex-row justify-space-between align-center';
    issueEl.setAttribute('href', issues[i].html_url);
    issueEl.setAttribute('target', '_blank');
    console.log('issue11', issueEl);

    // create span to hold issue title
    var titleEl = document.createElement('span');
    titleEl.textContent = issues[i].title;
    console.log('title', titleEl);
    // append to container
    issueEl.appendChild(titleEl);

    // create a type element
    var typeEl = document.createElement('span');
    console.log('typee', typeEl);
    // check if issue is an actual issue or a pull request
    if (issues[i].pull_request) {
      typeEl.textContent = '(Pull request)';
    } else {
      typeEl.textContent = '(Issue)';
    }

    // append to container
    issueEl.appendChild(typeEl);
    console.log(issueEl);
    issueContainerEl.appendChild(issueEl);
  }
};
