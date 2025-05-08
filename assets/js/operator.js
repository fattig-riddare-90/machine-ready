/* jshint esversion: 11 */

// Imported functions
import { populateVehicleSelect } from "./utility.js";

import { vehicles } from "./utility.js";

const form = document.getElementById("checklist-form");
let formChecklist = document.getElementById("checklist-items");
let selectedVehicle;
let selectedVehicleChecklistItems = [];

// Checklist form (partly taken from https://www.makula.io/blog/daily-maintenance-checklist-for-machines#h3)

const checklistItems = [
  {
    id: "start",
    label:
        "Twist the ignition key and start up the engine, listen for noise and watch for black or white smoke",
    vehicles: ["truck01","excavator01","tractor01", "forklift01"]
    },
   {
    id: "tire-check",
    label:
        "Check for wear, damage and flats, strike each tire with a hammer to make sure it is pressurized",
    vehicles: ["truck01","excavator01","tractor01", "forklift01"]
    },
  {
    id: "lights",
    label:
        "Check all exterior light sources including auxillary work light and rotating beacons",
    vehicles: ["truck01","excavator01","tractor01", "forklift01"]
  },
  {
    id: "breaks",
    label:
        "Check the breaks including parking break",
    vehicles: ["excavator01","tractor01", "forklift01"]
  },
  {
    id: "steering",
    label:
        "Turn steering to the end-ranges in both directions, should be smooth motion without any apparent noise",
    vehicles: ["truck01","excavator01","tractor01", "forklift01"]
  },
  {
    id: "pneumatic-breaks1",
    label:
      "While parked, completely empty break system of air and wait for it to refill",
    vehicles: ["truck01"]
  },
  {
    id: "pneumatic-breaks2",
    label:
      "While parked, hold the break pedal down and make sure the air pressure is not decreasing further.",
    vehicles: ["truck01"]
  },
  {
    id: "clean-surfaces",
    label:
      "Inspect and clean machine surfaces and components: Remove dust, loose debris, and contaminants to prevent interference with machine operations.",
    vehicles: ["excavator01","forklift01"]
  },
  {
    id: "lubrication",
    label:
      "Check and refill lubrication levels: Ensure that all moving parts are properly lubricated to reduce friction and wear.",
      vehicles: ["excavator01","forklift01"]
  },
  {
    id: "emergency-stop",
    label:
      "Test emergency stop buttons and other safety features: Ensure that all emergency stops and safety interlocks are working correctly.",
      vehicles: ["truck01","excavator01","tractor01", "forklift01"]
  },
  {
    id: "moving-parts",
    label:
      "Ensure all moving parts are operating smoothly and without unusual noise: Listen for unusual sounds that could indicate a problem.",
      vehicles: ["excavator01", "forklift01"]
  },
  {
    id: "belts-chains",
    label:
      "Inspect belts and chains for tension and wear: Adjust or replace as necessary.",
      vehicles: ["excavator01","tractor01","forklift01"]
  },
  {
    id: "fluids",
    label:
      "Examine hydraulic and pneumatic systems for leaks: Check hoses, valves, and seals.",
      vehicles: ["truck01", "excavator01", "tractor01", "forklift01"]
  },
  {
    id: "temperature",
    label:
      "Monitor system temperatures: Ensure cooling systems are functioning and that operating temperatures are within normal ranges.",
      vehicles: ["truck01", "excavator01", "tractor01", "forklift01"]
  },
  {
    id: "vibration",
    label:
      "Check for vibration or alignment issues: Inspect machine alignment and secure any loose components.",
      vehicles: ["forklift01"]
  },
  {
    id: "record",
    label:
      "Record any issues or anomalies observed: Document any irregularities or maintenance actions taken for future reference.",
      vehicles: ["truck01", "excavator01", "tractor01", "forklift01"]
  },
];

const selectElement = document.getElementById("vehicle-select");

// Populate the select drop list
populateVehicleSelect("vehicle-select", "manager-vehicle-select");

selectElement.addEventListener("change", function() {

  selectedVehicle = this.value;
  selectedVehicleChecklistItems = checklistItems.filter(item => item.vehicles.includes(selectedVehicle));
  generateChecklist();

  
  if (selectElement.value !== "") {
    form.classList.remove("hidden");
    nameSection.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
    nameSection.classList.add("hidden");
  }
});


function generateChecklist() {
    formChecklist.innerHTML = ""; // Empty form
  
    selectedVehicleChecklistItems.forEach((item, index) => {
      const isEvenRow = index % 2 === 1;
  
      formChecklist.innerHTML += `
        <div class="form-check d-flex align-items-center gap-2 py-2 px-3" style="background-color: ${isEvenRow ? '#cc0000' : 'transparent'};">
          <input class="form-check-input larger-checkbox" type="checkbox" id="${item.id}" name="${item.id}" required>
          <label class="form-check-label m-0" for="${item.id}">${item.label}</label>
        </div>
      `;
    });
  }

// Hide form until vehicle is selected
const nameSection = document.getElementById("operator-name-section");

// To require name sign before submit

form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
  
    if (!allChecked) {
      console.log("error");
    } else {
      // Get signature and chosen vehicle 
      const signature = document.getElementById("operator-name").value;
      const selectedVehicle = document.getElementById("vehicle-select").value;
  
      // Get checklist data
      const checklistResults = {};
      checkboxes.forEach(cb => {
        checklistResults[cb.id] = cb.checked;
      });
  
      // Create form post
      const entry = {
        vehicle: selectedVehicle,
        timestamp: new Date().toISOString(),
        signature,
        checklist: checklistResults
      };
  
      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem("submittedForms")) || [];
      existingData.push(entry);
      localStorage.setItem("submittedForms", JSON.stringify(existingData));
  
      // Show confirmation and hide form
      document.getElementById("confirmation-message").classList.remove("hidden");
      document.querySelector("#operator-view h2").classList.add("hidden");
      document.getElementById("vehicle-select").classList.add("hidden");
      document.getElementById('checklist-form').classList.add('hidden');
    }
  });