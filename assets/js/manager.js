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
    historyContainer.innerHTML = ""; // Töm tidigare lista
  
    const submissions = JSON.parse(localStorage.getItem("submittedForms")) || [];
    const vehicleEntries = submissions.filter(entry => entry.vehicle === vehicleName);
  
    if (vehicleEntries.length === 0) {
      historyContainer.innerHTML = "<p>No previous submissions for this vehicle.</p>";
      return;
    }
  
    vehicleEntries.slice().reverse().forEach(entry => {
      const entryDiv = document.createElement("div");
      entryDiv.classList.add("history-entry");
  
      const dateP = document.createElement("p");
      dateP.textContent = `Date: ${new Date(entry.timestamp).toLocaleDateString()} | Signature: ${entry.signature}`;
      entryDiv.appendChild(dateP);
  
      const checklistUl = document.createElement("ul");
  
      // Kontrollera om checklist är ett objekt och iterera över nycklarna
      if (typeof entry.checklist === "object") {
        Object.keys(entry.checklist).forEach(key => {
          const li = document.createElement("li");
          li.textContent = `${key}: ${entry.checklist[key] ? 'Checked' : 'Not checked'}`;
          checklistUl.appendChild(li);
        });
      }
  
      entryDiv.appendChild(checklistUl);
      historyContainer.appendChild(entryDiv);
    });
  }

