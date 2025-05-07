import { backToRoleButton } from "./utility.js";

// Event listener to change to operator view

document.getElementById("choose-operator").addEventListener("click", () => {
    hideRoleSelect();
    showOperatorView();
});

// Event listener to change to manager view

document.getElementById("choose-manager").addEventListener("click", () => {
    hideRoleSelect();
    showManagerView();
});

// Function to hide the role selection on the start screen

function hideRoleSelect() {
    document.getElementById("start-screen").classList.add("hidden");
};

// Function to show the operator view

function showOperatorView() {
    document.getElementById("operator-view").classList.remove("hidden");
    backToRoleButton.classList.remove("hidden");
};

// Function to show the manager view

function showManagerView() {
    document.getElementById("manager-view").classList.remove("hidden");
    backToRoleButton.classList.remove("hidden");
}