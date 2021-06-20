const quotes=[
    "I have always imagined that Paradise will be a kind of a Library.",
    "Libraries were full of ideas – perhaps the most dangerous and powerful of all weapons.",
    "To build up a library is to create a life. It’s never just a random collection of books.",
    "A library is the delivery room for the birth of ideas, a place where history comes to life.",
    "An investment in knowledge pays the best interest",
    "Change is the end result of all true learning.",
    "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    "The roots of education are bitter, but the fruit is sweet.",
    "The more that you read, the more things you will know, the more that you learn, the more places you’ll go.",
    "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    "The learning process continues until the day you die.",
    "Develop a passion for learning. If you do, you will never cease to grow.",
    "Education is a better safeguard of liberty than a standing army.",
    "Educating the mind without educating the heart is no education at all.",
    "Wisdom…. comes not from age, but from education and learning.",
    "Nothing is pleasanter than exploring a library."
]

const i = Math.floor(Math.random() * quotes.length);
    document.getElementById('quote').innerHTML = quotes[i];