const stateSelect = document.getElementById('state');
const climateInput = document.getElementById('climate');

stateSelect.addEventListener('change', () => {
  const stateValue = stateSelect.value;
  let climateValue;
  switch (stateValue) {
    case 'delhi':
      climateValue = 'Semi-arid';
      break;
    case 'himanchal pradesh':
      climateValue = 'Temperate';
      break;
    case 'gujarat':
      climateValue = 'Semi-arid';
      break;
    case 'bihar':
      climateValue = 'Subtropical';
      break;
    case 'tamil nadu':
      climateValue = 'Tropical';
      break;
    default:
      climateValue = '';
  }
  climateInput.value = climateValue;
});

const form = document.getElementById('myForm');

form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent the form from submitting normally

  const ageInput = document.getElementById('age').value;
  const weatherSelect = document.getElementById('weather').value;
  const locationSelect = document.getElementById('location').value;
  const preferenceSelect = document.getElementById('preference').value;
  const stateSelectValue = stateSelect.value;
  const climateValue = climateInput.value;
  const occasionSelect = document.getElementById('occasion').value;

  const newEntry = `${ageInput},${weatherSelect},${locationSelect},${preferenceSelect},${stateSelectValue},${climateValue},${occasionSelect}\n`;

  // Retrieve existing data from local storage
  let csvData = localStorage.getItem('csvData');

  // If no data exists, initialize with headers
  if (!csvData) {
    csvData = 'Age,Weather,Location,Preference,State,Climate,Occasion\n';
  }

  // Append new entry
  csvData += newEntry;

  // Save updated data back to local storage
  localStorage.setItem('csvData', csvData);

  // Create a Blob object with the updated data
  const blob = new Blob([csvData], { type: 'text/csv' });

  // Create a link to download the CSV file
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'user_inputs.csv';
  link.click();
});
