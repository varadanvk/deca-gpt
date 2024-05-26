const flashcards = document.querySelectorAll('.flashcard');
let currentCardIndex = 0;

document.getElementById('nextButton').addEventListener('click', showNextCard);
document.getElementById('prevButton').addEventListener('click', showPreviousCard);

flashcards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('flip');
    });
});

function showNextCard() {
    flashcards[currentCardIndex].classList.add('hidden');
    currentCardIndex = (currentCardIndex + 1) % flashcards.length;
    flashcards[currentCardIndex].classList.remove('hidden');
}

function showPreviousCard() {
    flashcards[currentCardIndex].classList.add('hidden');
    currentCardIndex = (currentCardIndex - 1 + flashcards.length) % flashcards.length;
    flashcards[currentCardIndex].classList.remove('hidden');
}

// Initialize the first card to be visible
flashcards.forEach((card, index) => {
    if (index !== 0) card.classList.add('hidden');
});
