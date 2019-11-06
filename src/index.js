document.addEventListener('DOMContentLoaded', function(e){
    console.log('DOM is loaded and parsed!');

    const quoteURL = 'http://localhost:3000/quotes?_embed=likes'
    const likesURL = 'http://localhost:3000/likes'

    function fetchQuotes(){
        return fetch(quoteURL)
        .then(function(res){
            return res.json();
        })
        .then(function(allQuotes){
            renderAllQuotes(allQuotes);
        })
    }

    function renderAllQuotes(allQuotes){
        const listQuotes = document.querySelector('#quote-list')
        listQuotes.innerHTML = " "

        for (let element in allQuotes){
            const li = document.createElement('li')
            const bq = document.createElement('blockquote')
            const p = document.createElement('p')
            const footer = document.createElement('footer')
            const br = document.createElement('br')
            const button1 = document.createElement('button')
            const button2 = document.createElement('button')

            li.className = 'quote-card'
            bq.className = 'blockquote'
            p.className = 'mb-0'
            footer.className = 'blockquote-footer'
            button1.className = 'btn-success'
            button2.className = 'btn-danger'

            button1.innerHTML = `Likes: <span>${allQuotes[element].likes.length}</span>`
            button1.id = `like${element}`
            button2.innerHTML = 'Delete'

            bq.append(p, footer, br, button1, button2)
            li.append(bq)

            p.append(allQuotes[element].quote)
            footer.append(allQuotes[element].author)
            listQuotes.append(li)

            //for like button
            let quote = allQuotes[element]
            addLikes(quote, button1)
            addDelete(quote, button2)
        }
        quoteForm(allQuotes);
    }

    function addLikes(quote, button1){
        button1.addEventListener('click', e => {
            e.preventDefault();

            let now = Math.floor(Date.now() / 1000)
            const likeObj = {
                'quoteID': quote.id,
                'createdAt': now
            }

            return fetch(likesURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(likeObj)
            })
            .then(function(res){
                res.json()
            })
            .then(fetchQuotes)
            // .then(function(quote){
                // e.target.querySelector('span').innerText = `${quote.button1.likes} +1`
            // })
        })
    }

    function addDelete(quote, button2){
        button2.addEventListener('click', e => {
            console.log(quote)
            console.log(button2)
            return fetch(`http://localhost:3000/quotes/${quote.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
            .then(function(res){
                res.json()
            })
            .then(fetchQuotes)
        })
    }

    function quoteForm(allQuotes){
        console.log(allQuotes)
        document.addEventListener('submit', e => {
            e.preventDefault();
            const newQuote = document.querySelector('input[id="new-quote"]').value
            const newAuthor = document.querySelector('input[id="author"]').value
            const newQuoteObj = {
                'quote': newQuote,
                'author': newAuthor
            }
            console.log(newQuoteObj)

            return fetch(quoteURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newQuoteObj)
            })
            .then(function(res){
                res.json()
            })
            .then(fetchQuotes)
        })
    }



    fetchQuotes();
})