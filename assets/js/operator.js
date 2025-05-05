import { vehicles } from "./utility.js";

// Populate the vehicle select dropdown for the operator view
const selectElement = document.getElementById("vehicle-select");
vehicles.forEach((vehicle) => {
  const option = document.createElement("option");
  option.value = vehicle.id;
  option.textContent = vehicle.name;
  selectElement.appendChild(option);
});

// Checklist form

const checklistItems = [
  {
    id: "clean-surfaces",
    label:
      "Inspect and clean machine surfaces and components: Remove dust, loose debris, and contaminants to prevent interference with machine operations.",
  },
  {
    id: "lubrication",
    label:
      "Check and refill lubrication levels: Ensure that all moving parts are properly lubricated to reduce friction and wear.",
  },
  {
    id: "safety-guards",
    label:
      "Verify all safety guards are in place and functional: Confirm that safety guards are secure and not damaged.",
  },
  {
    id: "emergency-stop",
    label:
      "Test emergency stop buttons and other safety features: Ensure that all emergency stops and safety interlocks are working correctly.",
  },
  {
    id: "electrical",
    label:
      "Check electrical connections: Inspect cables and connections for signs of wear or damage.",
  },
  {
    id: "moving-parts",
    label:
      "Ensure all moving parts are operating smoothly and without unusual noise: Listen for unusual sounds that could indicate a problem.",
  },
  {
    id: "belts-chains",
    label:
      "Inspect belts and chains for tension and wear: Adjust or replace as necessary.",
  },
  {
    id: "fluids",
    label:
      "Examine hydraulic and pneumatic systems for leaks: Check hoses, valves, and seals.",
  },
  {
    id: "temperature",
    label:
      "Monitor system temperatures: Ensure cooling systems are functioning and that operating temperatures are within normal ranges.",
  },
  {
    id: "vibration",
    label:
      "Check for vibration or alignment issues: Inspect machine alignment and secure any loose components.",
  },
  {
    id: "record",
    label:
      "Record any issues or anomalies observed: Document any irregularities or maintenance actions taken for future reference.",
  },
];

const form = document.getElementById("checklist-form");
form.innerHTML = ""; // Clear if anything is already in the form

checklistItems.forEach((item) => {
  const wrapper = document.createElement("div");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = item.id;
  checkbox.name = item.id;

  const label = document.createElement("label");
  label.htmlFor = item.id;
  label.textContent = item.label;
  checkbox.required = true;

  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);
  form.appendChild(wrapper);
});

// Hide form until vehicle is selected
const nameSection = document.getElementById("operator-name-section");

selectElement.addEventListener("change", () => {
  if (selectElement.value !== "") {
    form.classList.remove("hidden");
    nameSection.classList.remove("hidden");
  } else {
    form.classList.add("hidden");
    nameSection.classList.add("hidden");
  }
});

// Create submit button
const submitBtn = document.createElement("button");
submitBtn.type = "submit";
submitBtn.textContent = "Submit";
form.appendChild(submitBtn);

// To require name sign before submit

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nameInput = document.getElementById("operator-name").value.trim();

  if (nameInput === "") {
    alert("Please enter your name before submitting.");
    return;
  }

  // Show confirmation message
  document.getElementById("confirmation-message").classList.remove("hidden");
});
