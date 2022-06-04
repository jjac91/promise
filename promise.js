let baseURL = "http://numbersapi.com";
let favNum = 69;
axios.get(`${baseURL}/${favNum}/?json`).then((data) => {
  console.log(data);
});

let nums = [7, 13, 263];
axios.get(`${baseURL}/${nums}/?json`).then((data) => {
  console.log(data);
});

Promise.all(
  Array.from({ length: 4 }, () => {
    return axios.get(`${baseURL}/${favNum}/?json`);
  })
).then((facts) =>
  facts.forEach((fact) => {
    const para = document.createElement("p");
    para.innerHTML = `${fact.data.text}`;
    document.body.appendChild(para);
  })
);

axios.get(`http://deckofcardsapi.com/api/deck/new/draw`).then((data) => {
  console.log(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`);
});

axios
  .get(`http://deckofcardsapi.com/api/deck/new/draw`)
  .then((data) => {
    console.log(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`);
    let deck_id = data.data.deck_id;
    return axios.get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw`);
  })
  .then((data) => {
    console.log(`${data.data.cards[0].value} of ${data.data.cards[0].suit}`);
  });

let deck_id = null;
const cardArea = document.getElementById("card_slot");
const btn = document.querySelector("button");
axios.get(`http://deckofcardsapi.com/api/deck/new/shuffle/`).then((data) => {
  deck_id = data.data.deck_id;
});


function drawCard() {
  axios
    .get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw`)
    .then((data) => {
      
      let card = data.data.cards[0].image;
      img=document.createElement('img')
      img.setAttribute("src",`${card}`)
      cardArea.appendChild(img);
      console.log(data.data.remaining);
      if (data.data.remaining == 0) {
        btn.remove();
      }
    });
}
btn.addEventListener('click', drawCard);
