const passwordInput = document.getElementById('passwordInput');
const strengthMeter = document.getElementById('strengthMeter');

const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*\\d))|((?=.*[A-Z])(?=.*\\d)))(?=.{6,})");

passwordInput.addEventListener('input', () => {
  const value = passwordInput.value;
  if (!value) {
    strengthMeter.textContent = 'Enter Password';
    strengthMeter.className = 'strength-meter';
  } else if (strongRegex.test(value)) {
    setStrength('strong', 'Strong Password');
  } else if (mediumRegex.test(value)) {
    setStrength('medium', 'Medium Strength');
  } else {
    setStrength('weak', 'Weak Password');
  }
});

function setStrength(level, message) {
  strengthMeter.className = 'strength-meter'; 
  if (level === 'weak') {
    strengthMeter.classList.add('strength-weak');
  } else if (level === 'medium') {
    strengthMeter.classList.add('strength-medium');
  } else if (level === 'strong') {
    strengthMeter.classList.add('strength-strong');
  }
  strengthMeter.textContent = message;
}