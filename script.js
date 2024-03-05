    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");
    
    const arrow = document.getElementById("arrow");
    const yearsElement = document.getElementById("years");
    const monthsElement = document.getElementById("months");
    const daysElement = document.getElementById("days");  
window.onload = function () {

    dayInput.addEventListener("change", calculateAge);
    monthInput.addEventListener("change", calculateAge);
    yearInput.addEventListener("change", calculateAge);

    if (arrow) {
        arrow.addEventListener("click", function () {
            // Agrega validaciones antes de llamar a calculateAge
            if (validateInputs()) {
                calculateAge();
            }
        });
    }
};
function calculateAge() {
    const birthDay = parseInt(dayInput.value);
    const birthMonth = parseInt(monthInput.value) - 1;
    const birthYear = parseInt(yearInput.value);

    const currentDate = new Date();
    const inputDate = new Date(birthYear, birthMonth, birthDay);

        // Validations
    if (isNaN(birthDay) || isNaN(birthMonth) || isNaN(birthYear)) {
        yearsElement.textContent = "--";
        monthsElement.textContent = "--";
        daysElement.textContent = "--";
        return;
    }
    if (inputDate > currentDate) {
        displayValidationMessage("The date cannot be in the future.");
        return;
    }

    if (inputDate.getMonth() !== birthMonth || inputDate.getDate() !== birthDay || inputDate.getFullYear() !== birthYear) {
        displayValidationMessage("Invalid date. Please enter a valid date.");
        return;
    }
    // Si pasa todas las validaciones, realiza el cálculo de la edad
    clearValidationMessages();

    const birthDate = new Date(birthYear, birthMonth, birthDay);

    const ageInMs = currentDate.getTime() - birthDate.getTime();
    const ageInYears = Math.floor(ageInMs / (1000 * 60 * 60 * 24 * 365.25));

    yearsElement.textContent = ageInYears;
    monthsElement.textContent = calculateMonths(ageInYears, birthMonth, currentDate);
    daysElement.textContent = calculateDays(ageInMs);
}

function validateInputs() {
    const dayValue = dayInput.value.trim();
    const monthValue = monthInput.value.trim();
    const yearValue = yearInput.value.trim();
    
    // Limpiar mensajes de error anteriores
    clearValidationMessages();

    let isValid = true;

    if (dayValue === "") {
        displayValidationMessage("This field is required.", "day-error");
        isValid = false;
    }

    if (monthValue === "") {
        displayValidationMessage("This field is required.", "month-error");
        isValid = false;
    }

    if (yearValue === "") {
        displayValidationMessage("This field is required.", "year-error");
        isValid = false;
    }

    return isValid;
}

function displayValidationMessage(message, errorId) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearValidationMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
}
function calculateMonths(years, birthMonth, currentDate) {
    const totalMonths = years * 12 + (currentDate.getMonth() - birthMonth);
    return totalMonths % 12;
}

function calculateDays(ageInMs) {
    return Math.floor(ageInMs / (1000 * 60 * 60 * 24)) %30;
};