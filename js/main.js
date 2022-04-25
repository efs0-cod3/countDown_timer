//  selectors
const s = document.querySelector('.s'); 
const m = document.querySelector('.m');
const h = document.querySelector('.h');
const start = document.getElementById('start');
const reset = document.getElementById('reset');
const paused = document.getElementById('pause');
const notificationBtn = document.querySelector('.notification');
let isPaused = false;
let title = document.querySelector('.ttl');
const msg = document.querySelector('.msg');
const mbtn = document.querySelector('.msg-btn');

// functions
function notif() {
    if (Notification.permission === 'denied') {
        notificationBtn.innerText = 'Notification denied';
    } else if(Notification.permission === 'granted') {
        notificationBtn.innerText = 'Notification enabled';
    }
}
notif()

function pause() {
    if (!isPaused) {
        isPaused = true;
        paused.innerText = 'Start';
    } else {
        paused.innerText = 'Pause';
        isPaused = false;
    }
}

function countDown() {
    if (Number(h.value) > 0 && Number(m.value) <= 0 && Number(s.value) <= 0) {
        if (Number(h.value) > 0) {
            h.value--
            if (h.value < 10) {
                h.value = '0' + `${h.value}`
            }
            h.value
        }
        m.value = 59;
        s.value = 59;
    } else if (Number(m.value) > 0 && Number(s.value) <= 0) {
        if (m.value > 0) {
            m.value--
            if (m.value < 10) {
                m.value = '0' + `${m.value}`
            }
            m.value
        }
        s.value = 59

    } else if (Number(s.value) > 0) {
        if (s.value > 0) {
            s.value--
            if (s.value < 10) {
                s.value = '0' + `${s.value}`
            }
            s.value
        }
    }
}

function notifyMe() {
    // Let's check whether notification permissions have already been granted
    if (Notification.permission === "granted") {
        // If it's okay let's create a notification
        showNotif()
    }
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
        alert('Time\' up')
    }
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them anymore.   
    if(msg != ''){
    title.innerHTML = `${msg.value}`;
    }
}

function showNotif() {
    if (msg.value == '') {
        let notification = new Notification('CountDown', {
            body: "Time's up",
            icon: 'img/tup.png'
        });
    } else {
        let notification = new Notification('CountDown', {
            body: msg.value,
            icon: 'img/tup.png'
        });
    }
}

// eventlisterners
start.addEventListener('mousedown', () => {
    start.classList.add('pressed')
    if (start.classList.contains('pressed')) {
        start.classList.add('s-hidden')
        reset.classList.remove('hide-reset')
        paused.classList.remove('p-hidden')
    }

    let interval = setInterval(() => {
        if (!isPaused) {
            countDown()
            title.innerHTML = `CountDown - ${h.value}:${m.value}:${s.value}`;
        }
        if (Number(h.value) == 0 && Number(m.value) == 0 && Number(s.value) == 0) {
            clearInterval(interval)
            notifyMe()
        }
    }, 1000)
})

reset.addEventListener('mousedown', () => {
    h.value = ''
    m.value = ''
    s.value = ''
    msg.value = ''
    reset.classList.add('hide-reset')
    paused.classList.add('p-hidden')
    start.classList.remove('s-hidden')
    location.reload()


})

paused.addEventListener('mousedown', pause)

notificationBtn.addEventListener('mousedown', () => {
    Notification.requestPermission().then(permission => {
        if (permission === 'denied') {
            notificationBtn.innerText = 'Notification denied'
        } else {
            notificationBtn.innerText = 'Notification enabled'
        }
    })
})

// mobile events

// start.addEventListener('touchstart', () => {
//     start.classList.add('pressed')
//     if (start.classList.contains('pressed')) {
//         start.classList.add('s-hidden')
//         reset.classList.remove('hide-reset')
//         paused.classList.remove('p-hidden')
//     }

//     let interval = setInterval(() => {
//         if (!isPaused) {
//             countDown()
//             title.innerHTML = `CountDown - ${h.value}:${m.value}:${s.value}`;
//         }
//         if (Number(h.value) == 0 && Number(m.value) == 0 && Number(s.value) == 0) {
//             clearInterval(interval)
//             notifyMe()
//         }
//     }, 1000)
// })

// paused.addEventListener('touchstart', pause)

// notificationBtn.addEventListener('touchstart', () => {
//     Notification.requestPermission().then(permission => {
//         if (permission === 'denied') {
//             notificationBtn.innerText = 'Notification denied'
//         } else {
//             notificationBtn.innerText = 'Notification enabled'
//         }
//     })
// })