import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

function calculateTimeDifference(selectedDate) {
    const currentDate = new Date();
    return selectedDate - currentDate;
}

function updateTimer() {
    const selectedDate = new Date(datetimePicker.value);
    const timeDifference = calculateTimeDifference(selectedDate);

    if (timeDifference <= 0) {
        clearInterval(timerInterval);
        daysElement.textContent = '00';
        hoursElement.textContent = '00';
        minutesElement.textContent = '00';
        secondsElement.textContent = '00';
        return;
    }

    const time = convertMs(timeDifference);
    daysElement.textContent = addLeadingZero(time.days);
    hoursElement.textContent = addLeadingZero(time.hours);
    minutesElement.textContent = addLeadingZero(time.minutes);
    secondsElement.textContent = addLeadingZero(time.seconds);
}

function addLeadingZero(value) {
    return value < 10 ? `0${value}` : value;
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor((ms % hour) / minute);
    const seconds = Math.floor((ms % minute) / second);

    return { days, hours, minutes, seconds };
}

flatpickr(datetimePicker, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = new Date(selectedDates[0]);
        if (selectedDate <= new Date()) {
            window.alert("Please choose a date in the future");
            datetimePicker.value = '';
            startButton.disabled = true;
        } else {
            startButton.disabled = false;
        }
    },
});

let timerInterval;

startButton.addEventListener('click', () => {
    const selectedDate = new Date(datetimePicker.value);
    const timeDifference = calculateTimeDifference(selectedDate);

    if (timeDifference > 0) {
        updateTimer();
        timerInterval = setInterval(updateTimer, 1000);
        startButton.disabled = true;
    }
});
