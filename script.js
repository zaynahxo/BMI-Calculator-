function calculateBMI() {
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const age = parseFloat(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);

    if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
        alert('Please enter valid weight and height.');
        return;
    }

    const bmi = weight / ((height / 100) ** 2);
    let category = '';
    let color = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        color = '#ff5722';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
        color = '#4caf50';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
        color = '#ff9800';
    } else {
        category = 'Obesity';
        color = '#f44336';
    }

    const resultText = `Your BMI is ${bmi.toFixed(1)} (${category})`;
    document.getElementById('result').textContent = resultText;
    document.getElementById('result').style.color = color;

    const bmiDetails = `
        <p>Healthy BMI range: 18.5 kg/m² - 24.9 kg/m²</p>
        <p>Healthy weight for the height: ${(18.5 * ((height / 100) ** 2)).toFixed(1)} kg - ${(24.9 * ((height / 100) ** 2)).toFixed(1)} kg</p>
        <p>BMI prime: ${(bmi / 24.9).toFixed(2)}</p>
        <p>Ponderal index: ${(bmi / (height / 100)).toFixed(1)} kg/m³</p>
    `;
    document.getElementById('bmiDetails').innerHTML = bmiDetails;

    updateChart(bmi, category, color);
}

function updateChart(bmi, category, color) {
    const ctx = document.getElementById('bmiChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Underweight', 'Normal weight', 'Overweight', 'Obese'],
            datasets: [{
                data: [18.5, 24.9 - 18.5, 29.9 - 24.9, 40 - 29.9],
                backgroundColor: ['#ff5722', '#4caf50', '#ff9800', '#f44336']
            }]
        },
        options: {
            circumference: 180,
            rotation: -90,
            cutoutPercentage: 70,
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        return data.labels[tooltipItem.index];
                    }
                }
            },
            annotation: {
                annotations: [{
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x-axis-0',
                    value: bmi,
                    borderColor: color,
                    borderWidth: 2,
                    label: {
                        enabled: true,
                        content: category
                    }
                }]
            }
        }
    });
}
