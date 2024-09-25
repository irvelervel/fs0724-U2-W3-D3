// dobbiamo recuperare la lista utenti da JSON placeholder, una API finta e gratuita
// che possiamo contattare tramite il metodo fetch()
// il metodo fetch() inizializza una HTTP REQUEST, da parte nostra (il client)
// il nostro scopo è ottenere dalle API una RESPONSE, che conterrà l'array di 10
// utenti, con il quale manipoleremo il DOM e creeremo le cards

// fetch() torna l'oggetto RESPONSE incorniciato da una Promise

// fetch() è un metodo integrato in JS
// accetta fino a 2 parametri: il primo (l'URL) è obbligatorio, mentre il secondo
// (un oggetto di configurazione) non è obbligatorio

// RECAP DEI METODI HTTP:
// - GET -> serve per OTTENERE dei dati
// - POST -> serve per CREARE una nuova risorsa in DB
// - PUT -> serve per MODIFICARE una risorsa già esistente in DB
// - DELETE -> serve per ELIMINARE una risorsa già esistente in DB

const getUsers = function () {
  fetch('https://jsonplaceholder.typicode.com/users', {
    // questo parametro è SEMPRE un oggetto, se c'è!
    // in questo oggetto di configurazione, potete indicare le seguenti cose:
    // method: 'GET' // <-- 'GET' è il metodo di default di fetch
    // body:  // <-- NON SERVE NELLE GET
    // headers: {
    // Authorization: 'xxxxxxxxxxxx',
    // 'Content-Type': 'application/json'
    // }
    // nel nostro caso stiamo facendo una semplicissima chiamata GET ad un
    // endpoint gratuito che non richiede alcuna autorizzazione quindi...
    // ...non c'è volendo neanche bisogno del secondo parametro della fetch
  })
    .then((response) => {
      // siete nel finale "buono" (Promise resolved)
      console.log('SIAMO NEL THEN')
      console.log('OGGETTO RESPONSE', response)
      // purtroppo per capire se la chiamata è andata a buon fine, non basta
      // capitare nel .then! bisogna anche verificare il valore della proprietà "ok"
      // perchè potremmo benissimo finire nel then con un codice di errore tipo 400, 401, 404, 500 etc.
      if (response.ok) {
        // response.ok è true
        // 200, 201
        // ora vorremmo utilizzare quell'array di utenti, ovvero il valore del JSON
        // di risposta!
        // estrapolare il JSON dall'oggetto response è un'operazione che si svolge
        // tramite il metodo .json()
        return response.json()
        // il metodo .json() tira fuori il JSON dalla response!
        // però torna una Promise :\
      } else {
        // response.ok è false
        // 400, 401, 403, 404, 500 etc.
        // auto-catapultiamoci nel blocco catch
        throw new Error('La risposta del server non è ok')
        // lanciare un errore a mano serve per "teletrasportarci" nel catch
        // e sostanzialmente gestire gli errori in un blocco solo!
      }
    })
    .then((users) => {
      console.log('ECCO GLI UTENTI', users)
      // qui non c'è pericolo, i dati sono al sicuro!
      // -ATTENZIONE- è solo QUI che avete users!
      const usersRow = document.getElementById('users-row') // <div class="row">
      users.forEach((user) => {
        const newCol = document.createElement('div')
        newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-3')
        newCol.innerHTML = `
            <div class="card">
              <img
                src="https://placedog.net/500"
                class="card-img-top"
                alt="doggo picture"
              />
              <div class="card-body">
                <h5 class="card-title">${user.name}</h5>
                <p class="card-text">
                  ${user.website}
                </p>
              </div>
        `
        usersRow.appendChild(newCol)
      })
    })
    .catch((error) => {
      // siete nel finale "cattive" (Promise rejected)
      // alert('ERRORE NELLA CHIAMATA')
      console.log(error)
    })
}

getUsers()
