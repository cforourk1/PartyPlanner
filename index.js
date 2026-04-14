/**
 *
 * @typedef Party
 * @property {number} partyID
 * @property {string} parties
 * @property {string} partyDetails
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/CrystalORourke"; // Make sure to change this!
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let recipes = [];

/* function to get the parties from the API



*/


async function getParties() {
  try {
const response = await fetch(API)
const result = await response.json();
parties = result.data
console.log(result.data)
  } catch (error) {
console.error(error);
  }
}



/*
partyID function




*/


async function getParty(id) {
  try {
const response = await fetch(API+"/"+id)
const result = await response.json();
partyID = result.data
console.log(result.data)
  } catch (error) {
console.error(error);
  }
}