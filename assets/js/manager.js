// Imported functions
import { populateVehicleSelect } from "./utility.js";

// Populate the select drop list
populateVehicleSelect("vehicle-select", "manager-vehicle-select");

// Listen for a selection in the select drop list
const managerSelect = document.getElementById("manager-vehicle-select");

if (managerSelect) {
  managerSelect.addEventListener("change", (e) => {
    const selectedVehicle = e.target.value;
    renderHistoryForVehicle(selectedVehicle);
  });
}

// Generate history from localStorage

function renderHistoryForVehicle(vehicleName) {
    const historyContainer = document.getElementById("history-list");
    historyContainer.innerHTML = ""; // Empty previous
  
    const submissions = JSON.parse(localStorage.getItem("submittedForms")) || [];
    const vehicleEntries = submissions
      .filter(entry => entry.vehicle === vehicleName)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Newest first
  
    if (vehicleEntries.length === 0) {
      historyContainer.innerHTML = "<p>No previous submissions for this vehicle.</p>";
      return;
    }
  
    vehicleEntries.forEach(entry => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("history-entry");
  
      const date = new Date(entry.timestamp).toLocaleString("sv-SE", {
        dateStyle: "short",
        timeStyle: "short"
      });
  
      const dateP = document.createElement("p");
      dateP.textContent = `Datum: ${date} | Signatur: ${entry.signature} ✅`;
      dateP.style.fontWeight = "bold";
  
      entryDiv.appendChild(dateP);
      historyContainer.appendChild(entryDiv);
    });
  }

