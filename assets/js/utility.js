// List of vehicles

export const vehicles = [
    { id: "truck01", name: "Truck 01" },
    { id: "excavator01", name: "Excavator 01" },
    { id: "tractor01", name: "Tractor 01" },
    { id: "forklift01", name: "Forklift 01" }
  ];
  
export const backToRoleButton = document.getElementById("back-to-role");

  backToRoleButton.addEventListener("click", () => {
    location.reload();
  });


// Function to populate vehicle select list
  export function populateVehicleSelect(...elementIds) {
    elementIds.forEach(id => {
      const selectElement = document.getElementById(id);
      if (!selectElement) return; // skip if not present
  
      // empty current
      selectElement.innerHTML = "";
  
      // Add empty default option
      const defaultOption = document.createElement("option");
      defaultOption.disabled = true;
      defaultOption.selected = true;
      defaultOption.textContent = "Choose vehicle";
      selectElement.appendChild(defaultOption);
  
      // Populate list with vehicles
      vehicles.forEach(vehicle => {
        const option = document.createElement("option");
        option.value = vehicle.id;
        option.textContent = vehicle.name;
        selectElement.appendChild(option);
      });
    });
  }