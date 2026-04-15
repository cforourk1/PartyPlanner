/**
 * @typedef Party
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 */

// === Constants ===
// this is the information I need to access the API
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2602CrystalORourke"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
//my variables for the array where data will be held
let parties = [];
let selectedParty;

/* function to get the parties from the API
*/

async function getParties() {
  try {
const response = await fetch(API)
// the JSOn gets converted to usable javascript
const result = await response.json();
parties = result.data
console.log(result.data)
  } catch (error) {
console.error(error);
  }
   render();
}

/*
partyID function
*/

async function getParty(id) {
  try {
// in order to get ID have to havve additional information 
const response = await fetch(`${API}/${id}`)
const result = await response.json();
selectedParty = result.data
console.log(selectedParty)
  } catch (error) {
console.error(error);
  }
  render();
}


/** when the party is clicked, will call the API, get the party if and return details  */
function partyListItem(party) {
const $list = document.createElement("button")
$list.textContent = party.name;
$list.addEventListener('click', (event) => {
  event.preventDefault();
  getParty(party.id);
 })
 return $list
}

/** A list of names of all the parties creating a button for each party

*/
function partyList() {
const $list = document.createElement("div");
$list.className = 'partyButton'
const $items = parties.map(partyListItem);
$list.replaceChildren(...$items);
return $list;
}

/* createing all of the elements for the party details
*/

function partyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party to get more information.";
    return $p;
  }
    const $div = document.createElement('div')
    $div.className = 'partyDetails'
    const $name = document.createElement("h4");
    $name.textContent =`Party Name ${selectedParty.name}`;
    $div.appendChild($name);

    const $ID = document.createElement("p");
    $ID.textContent =`Party ID: ${selectedParty.id}`;
    $div.appendChild($ID);

    const $date = document.createElement("p");
    $date.textContent = `Date: ${selectedParty.date}`;
    $div.appendChild($date);

    const $location = document.createElement("p");
    $location.textContent = `Location: ${selectedParty.location}`;
    $div.appendChild($location);

    const $description = document.createElement("p");
    $description.textContent =`Details: ${selectedParty.description}`;
    $div.appendChild($description);
    return $div;
}

// render

function render () {
const $app = document.querySelector("#app");
$app.innerHTML = `
<h1>Party Planner</h1>
<div class="layout">
    <section>
        <h2>Upcoming Parties</h2>
        <PartyList></PartyList>
    </section>
    <section>
        <h2>Party Details</h2>
        <PartyDetails></PartyDetails>
    </section>
</div>
`

$app.querySelector("PartyList").replaceWith(partyList())
$app.querySelector("PartyDetails").replaceWith(partyDetails())

}


async function init() {
    await getParties()
render ();

}

init()

