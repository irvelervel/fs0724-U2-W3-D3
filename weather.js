const belsedereUrl =
  'https://api.open-meteo.com/v1/forecast?latitude=43.182547&longitude=11.618125&current=temperature_2m,relative_humidity_2m&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=Europe%2FBerlin'

const getWeather = function () {
  // anche in questo caso, non avendo api key e utilizzando il metodo di default (GET)
  // siamo fortunati :) non ci serve inserire il secondo parametro
  fetch(belsedereUrl)
    .then((response) => {
      console.log('RESPONSE', response)
      if (response.ok) {
        // qui dentro abbiamo la certezza che la risposta non solo è arrivata,
        // ma contiene anche le informazioni che cercavo!
        return response.json()
      } else {
        // vuol dire che la risposta è arrivata, ma che c'è stato un errore
        throw new Error('Errore nella response dal server!')
      }
    })
    .then((weatherObject) => {
      console.log(weatherObject)
      const cardTitle = document.getElementById('current-temp')
      cardTitle.innerText = weatherObject.current.temperature_2m + '°C'
      const min = document.getElementById('min')
      const max = document.getElementById('max')
      min.innerText = 'MIN: ' + weatherObject.daily.temperature_2m_min[0] + '°C'
      max.innerText = 'MAX: ' + weatherObject.daily.temperature_2m_max[0] + '°C'
    })
    .catch((err) => {
      console.log(err)
    })
}

getWeather()
