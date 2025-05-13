/* jshint esversion: 11 */

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
  
    const now = new Date();
    const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
  
    // Filter only the latest 30 days
    const recentSubmissions = submissions.filter(entry =>
      new Date(entry.timestamp) >= thirtyDaysAgo
    );
  
    // Update localStorage
    localStorage.setItem("submittedForms", JSON.stringify(recentSubmissions));
  
    const vehicleEntries = recentSubmissions
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
      dateP.textContent = `Date: ${date} | Signature: ${entry.signature} ✅`;
      dateP.style.fontWeight = "bold";
  
      entryDiv.appendChild(dateP);
      historyContainer.appendChild(entryDiv);
    });
  }

