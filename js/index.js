
let form = document.getElementById('github-form')
form.addEventListener("submit", (event) => {
    event.preventDefault()
    event.target[0].value
    fetch(`https://api.github.com/search/users?q=${event.target[0].value}`)
        .then(resp => resp.json())
        .then(response => {
            let userList = document.querySelector('#user-list')
            let reposList = document.getElementById('repos-list')
            userList.innerHTML = ""
            reposList.innerHTML = ""
            response.items.map(item => {
                let li = document.createElement('li')
                let h2 = document.createElement('h2')
                h2.textContent = item.login
                h2.addEventListener('click', e => showUserRepos(item.login, e))
                let img = document.createElement('img')
                img.src = item.avatar_url
                
                li.append(h2, img)
                userList.append(li)

            })
    })
    form.reset()
})

function showUserRepos(username, e) {
    let reposList = document.getElementById('repos-list')
    reposList.innerHTML = ""
    e.preventDefault()
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(resp => resp.json())
    .then(response => response.map(repo => {
        let li = document.createElement('li')
        let h1 = document.createElement('h1')
        h1.textContent = repo.name
    
        li.append(h1)
        reposList.append(li)
    })
    )
}
