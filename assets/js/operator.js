import { vehicles } from './utility.js';

// Populate the vehicle select dropdown for the operator view
const selectElement = document.getElementById("vehicle-select");
vehicles.forEach(vehicle => {
  const option = document.createElement("option");
  option.value = vehicle.id;
  option.textContent = vehicle.name;
  selectElement.appendChild(option);
});