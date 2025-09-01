let btn = document.querySelector("#voice-button")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")

function speak(text){
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "en-US"
    window.speechSynthesis.speak(text_speak)
}

function wishing(){
    let day = new Date();
    let hours = day.getHours()
    if(hours >= 0 && hours < 12)
        speak("Good morning")
    else if(hours >=12 && hours < 16)
        speak("Good afternoon")
    else
        speak("Good evening")
}

window.addEventListener('load',()=>{
    wishing()
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()

recognition.onresult = (event)=>{
    let currentIndex = event.resultIndex
    let transcript = event.results[currentIndex][0].transcript
    content.innerText = transcript
    console.log(event)
    takeCommand(transcript.toLowerCase())
}

btn.addEventListener("click",()=>{
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message){
    btn.style.display = "flex"
    voice.style.display = "none"

    if (message.includes("hello, sheru") || message.includes("hey, sheru") || message.includes("hello sheru") || message.includes("hey sheru")) {
        speak("Hello, what can I help you with?");
    } else {
        let searchQuery = message.replace("sheru, open","").trim();
        speak(`Hey Sheru, this is what I found on the internet regarding ${searchQuery}`);
        window.open(`https://www.google.com/search?q=${searchQuery}`);
    }
}
