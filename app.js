let timer; // Variable to store the timer ID

window.onload = () => {
    document.querySelector('#calculate').onclick = startCountdown;
    document.querySelector('#reset').onclick = resetCountdown;
    document.querySelector('#stop').onclick = stopCountdown;
}

function startCountdown() {
    const dateInput = document.querySelector("#date").value;
    const timeInput = document.querySelector("#time").value;
    
    const endTime = new Date(`${dateInput}T${timeInput}`);

    // Validate if endTime is a valid date
    if (isNaN(endTime.getTime())) {
        alert("Invalid date or time format. Please enter a valid date and time.");
        return;
    }

    // Start the countdown
    countdown(endTime);
}

function countdown(endTime) {
    function updateCountdown() {
        const currentTime = new Date();
        const timeLeft = Math.floor((endTime - currentTime) / 1000);

        if (timeLeft < 0) {
            clearInterval(timer);
            displayCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        } else {
            const days = Math.floor(timeLeft / (24 * 60 * 60));
            const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
            const seconds = Math.floor(timeLeft % 60);
            
            displayCountdown({ days, hours, minutes, seconds });
            timer = setTimeout(updateCountdown, 1000); // Update countdown every second
        }
    }

    updateCountdown();
}

function displayCountdown({ days, hours, minutes, seconds }) {
    document.querySelector('#countdown-days').innerText = days;
    document.querySelector('#countdown-hours').innerText = hours;
    document.querySelector('#countdown-minutes').innerText = minutes;
    document.querySelector('#countdown-seconds').innerText = seconds;
}

function resetCountdown() {
    clearTimeout(timer);
    displayCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
}

function stopCountdown() {
    clearTimeout(timer);
}
