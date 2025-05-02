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

function hideRoleSelect() {
    document.getElementById("start-screen").classList.add("hidden");
};

function showOperatorView() {
    document.getElementById("operator-view").classList.remove("hidden");
};

function showManagerView() {
    document.getElementById("manager-view").classList.remove("hidden");
}