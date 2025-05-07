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