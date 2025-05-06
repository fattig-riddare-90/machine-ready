/* jshint esversion: 11 */

import { vehicles } from "./utility.js";

const form = document.getElementById("checklist-form");
let formChecklist = document.getElementById("checklist-items");
let selectedVehicle;
let selectedVehicleChecklistItems = [];

// Checklist form (taken from https://www.makula.io/blog/daily-maintenance-checklist-for-machines#h3)

const checklistItems = [
  {
    id: "clean-surfaces",
    label:
      "Inspect and clean machine surfaces and components: Remove dust, loose debris, and contaminants to prevent interference with machine operations.",
    vehicles: ["truck01","excavator01","forklift01"]
  },
  {
    id: "lubrication",
    label:
      "Check and refill lubrication levels: Ensure that all moving parts are properly lubricated to reduce friction and wear.",
      vehicles: ["excavator01","forklift01"]
  },
  {
    id: "safety-guards",
    label:
      "Verify all safety guards are in place and functional: Confirm that safety guards are secure and not damaged.",
      vehicles: ["truck01","excavator01"]
  },
  {
    id: "emergency-stop",
    label:
      "Test emergency stop buttons and other safety features: Ensure that all emergency stops and safety interlocks are working correctly.",
      vehicles: ["truck01","excavator01"]
  },
  {
    id: "electrical",
    label:
      "Check electrical connections: Inspect cables and connections for signs of wear or damage.",
      vehicles: ["truck01"]
  },
  {
    id: "moving-parts",
    label:
      "Ensure all moving parts are operating smoothly and without unusual noise: Listen for unusual sounds that could indicate a problem.",
      vehicles: ["truck01","excavator01","tractor01","forklift01"]
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
      vehicles: ["truck01"]
  },
  {
    id: "temperature",
    label:
      "Monitor system temperatures: Ensure cooling systems are functioning and that operating temperatures are within normal ranges.",
      vehicles: ["excavator01"]
  },
  {
    id: "vibration",
    label:
      "Check for vibration or alignment issues: Inspect machine alignment and secure any loose components.",
      vehicles: ["tractor01"]
  },
  {
    id: "record",
    label:
      "Record any issues or anomalies observed: Document any irregularities or maintenance actions taken for future reference.",
      vehicles: ["forklift01"]
  },
];

// Populate the vehicle select dropdown for the operator view
const selectElement = document.getElementById("vehicle-select");
vehicles.forEach((vehicle) => {
  const option = document.createElement("option");
  option.value = vehicle.id;
  option.textContent = vehicle.name;
  selectElement.appendChild(option);
});

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
  formChecklist.innerHTML = ""; // Clear if anything is already in the form
  selectedVehicleChecklistItems.forEach((item) => {

    // const checkbox = document.createElement("input");
    // checkbox.type = "checkbox";
    // checkbox.id = item.id;
    // checkbox.name = item.id;

    // const label = document.createElement("label");
    // label.htmlFor = item.id;
    // label.textContent = item.label;
    // checkbox.required = true;

    // formChecklist.appendChild(checkbox);
    // formChecklist.appendChild(label);

    formChecklist.innerHTML += `
    <div class="form-check">
      <input class="form-check-input" type="checkbox" id="${item.id}" name="${item.id}" required>
      <label class="form-check-label" for="${item.id}">
        ${item.label}
      </label>
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
    // Show confirmation message
    document.getElementById("confirmation-message").classList.remove("hidden");
  }


  // const nameInput = document.getElementById("operator-name").value.trim();
  // if (nameInput === "") {
  //   alert("Please enter your name before submitting.");
  //   return;
  // }

  
});