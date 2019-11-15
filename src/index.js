document.addEventListener("DOMContentLoaded", () => {
    console.log('DOM loaded!')

    const emebededLikes = "http://localhost:3000/quotes?_embed=likes/";
    const mainUrl = "http://localhost:3000/quotes/";
    const likesUrl = "http://localhost:3000/likes/";
    const form = document.querySelector('#new-quote-form')
       form.addEventListener('submit', createNewQuote)

    fetch(emebededLikes)
       .then(resp => resp.json())
       .then(data => displayQuates(data))
    function displayQuates(data){
       data.forEach(displayQuote)}
    function displayQuote(quote){
       const quoteList = document.querySelector('#quote-list')
       const list = document.createElement('li')
       list.classList.add('quote-card')
       let quoteCount
       if(quoteCount === undefined){
           quoteCount = 0
       } else{
           quoteCount = quote.likes.length
       }
       list.innerHTML = `
       <blockquote class=“blockquote”></blockquote>
       <p class=‘mb-0’>${quote.quote}</p>
       <footer class=“blockquote-footer”>${quote.author}</footer>
       <br>
       <button class=‘btn-success’ id=“${quote.id}“> Likes: <span>${quoteCount}</span></button>
       <button class=‘btn-danger’ id=“${quote.id}“>Delete</button>
       `
       // debugger
       quoteList.appendChild(list)
       const likeButton = list.querySelector('button.btn-success')
       const deleteButton = list.querySelector('button.btn-danger')
       likeButton.addEventListener('click', handleLikeButton)
       deleteButton.addEventListener('click', handleDeleteButton)
       // deleteButton.addEventListener(‘click’, deleteQuote)
    }
    function createNewQuote(e){
       e.preventDefault()
       const newQuoteInput = document.querySelector('#new-quote').value
       const authorInput = document.querySelector('#author').value
       fetch(mainUrl,{
           method: 'POST',
           headers:{
               "Content-Type": "application/json",
               "Accept": "application/json"
           },
           body: JSON.stringify({
               quote: newQuoteInput,
               author: authorInput
           })
       })
           .then(resp => resp.json())
           .then(quote => displayQuote(quote))
    }
    function handleDeleteButton(e){
       remove(e)
       e.target.parentElement.remove()
    }
    function remove(e){
       const quoteId = parseInt(e.target.id)
       return fetch(mainUrl+`${quoteId}`, {method: 'DELETE'})
    }
    function handleLikeButton(e){
       updateDataBase(e)
       let likes = e.target.lastElementChild
       const updatedLikes = parseInt(likes.innerHTML) +1
       likes.innerHTML = updatedLikes
    }
    function updateDataBase(e){
       //  debugger
           const quoteId = parseInt(e.target.id)
           return fetch(likesUrl,{
               method: 'POST',
               headers: {
                   "Content-Type": "application/json",
                   "Accept": "application/json"
               },
               body: JSON.stringify({
                   quoteId: quoteId
               })
           })
           .then(resp => resp.json())
    }


})


//THIS IS ANOTHER WAY:

// document.addEventListener('DOMContentLoaded', function(e){
//     console.log('DOM is loaded and parsed!');

//     const quoteURL = 'http://localhost:3000/quotes?_embed=likes'
//     const likesURL = 'http://localhost:3000/likes'

//     function fetchQuotes(){
//         return fetch(quoteURL)
//         .then(function(res){
//             return res.json();
//         })
//         .then(function(allQuotes){
//             renderAllQuotes(allQuotes);
//         })
//     }

//     function renderAllQuotes(allQuotes){
//         const listQuotes = document.querySelector('#quote-list')
//         listQuotes.innerHTML = " "

//         for (let element in allQuotes){
//             const li = document.createElement('li')
//             const bq = document.createElement('blockquote')
//             const p = document.createElement('p')
//             const footer = document.createElement('footer')
//             const br = document.createElement('br')
//             const button1 = document.createElement('button')
//             const button2 = document.createElement('button')

//             li.className = 'quote-card'
//             bq.className = 'blockquote'
//             p.className = 'mb-0'
//             footer.className = 'blockquote-footer'
//             button1.className = 'btn-success'
//             button2.className = 'btn-danger'

//             button1.innerHTML = `Likes: <span>${allQuotes[element].likes.length}</span>`
//             button1.id = `like${element}`
//             button2.innerHTML = 'Delete'

//             bq.append(p, footer, br, button1, button2)
//             li.append(bq)

//             p.append(allQuotes[element].quote)
//             footer.append(allQuotes[element].author)
//             listQuotes.append(li)

//             //for like button
//             let quote = allQuotes[element]
//             addLikes(quote, button1)
//             addDelete(quote, button2)
//         }
//         quoteForm(allQuotes);
//     }

//     function addLikes(quote, button1){
//         button1.addEventListener('click', e => {
//             e.preventDefault();

//             let now = Math.floor(Date.now() / 1000)
//             const likeObj = {
//                 'quoteID': quote.id,
//                 'createdAt': now
//             }

//             return fetch(likesURL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                 },
//                 body: JSON.stringify(likeObj)
//             })
//             .then(function(res){
//                 res.json()
//             })
//             .then(fetchQuotes)
//             // .then(function(quote){
//                 // e.target.querySelector('span').innerText = `${quote.button1.likes} +1`
//             // })
//         })
//     }

//     function addDelete(quote, button2){
//         button2.addEventListener('click', e => {
//             console.log(quote)
//             console.log(button2)
//             return fetch(`http://localhost:3000/quotes/${quote.id}`, {
//                 method: "DELETE",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                 }
//             })
//             .then(function(res){
//                 res.json()
//             })
//             .then(fetchQuotes)
//         })
//     }

//     function quoteForm(allQuotes){
//         console.log(allQuotes)
//         document.addEventListener('submit', e => {
//             e.preventDefault();
//             const newQuote = document.querySelector('input[id="new-quote"]').value
//             const newAuthor = document.querySelector('input[id="author"]').value
//             const newQuoteObj = {
//                 'quote': newQuote,
//                 'author': newAuthor
//             }
//             console.log(newQuoteObj)

//             return fetch(quoteURL, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Accept": "application/json"
//                 },
//                 body: JSON.stringify(newQuoteObj)
//             })
//             .then(function(res){
//                 res.json()
//             })
//             .then(fetchQuotes)
//         })
//     }



//     fetchQuotes();
// })