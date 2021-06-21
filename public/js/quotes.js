const quotes=[
    "An original idea. That can’t be too hard. The library must be full of them.",
    "Education is the most powerful weapon which you can use to change the world.",
    "To build up a library is to create a life. It’s never just a random collection of books.",
    "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "I have always imagined that Paradise will be a kind of a Library.",
    "The cure for boredom is curiosity. There is no cure for curiosity.",
    "Libraries were full of ideas – perhaps the most dangerous and powerful of all weapons.",
    "Education is not the learning of facts,but the training of the mind to think.",
    "A library is the delivery room for the birth of ideas, a place where history comes to life.",
    "The beautiful thing about learning is that no one can take it away from you.",
    "If you want to get laid, go to college. If you want an education, go to the library.",
    "A great library is one nobody notices because it is always there, and always has what people need.",
    "What a school thinks about its library is a measure of what it feels about education.",
    "A university is just a group of buildings gathered around a library.",
    "A library is not a luxury but one of the necessities of life.",
    "“What's cheaper than a gallon of gas? An ebook. Save a dollar, stay home and read!",
    "Books allow you to fully explore a topic and immerse yourself in a deeper way than most media today.",
    "Education is simply the soul of a society as it passes from one generation to another.",
    "When you educate one person you can change a life, when you educate many you can change the world.",
    "Education is an ornament in prosperity and a refuge in adversity."
    
]
const authors=["Stephen Fry","Nelson Mandela","Carlos María Domínguez","Mahatma Gandhi",
            "Jorge Luis Berges", "Dorothy Parker"," Sarah J. Maas","Albert Einstein",
            "Norman Cousins", "B. B. King"," Frank Zappa"," Vicki Myron",
            "Harold Howe", "Shelby Foote"," Henry Ward Beecher"," Shandy L. Kurth",
            "Mark Zuckerberg","G.K. Chesterton","Shai Reshef","Aristotle"]

var i = Math.floor(Math.random() * quotes.length);
$('#quote').html(quotes[i])
$('#author').html(authors[i])