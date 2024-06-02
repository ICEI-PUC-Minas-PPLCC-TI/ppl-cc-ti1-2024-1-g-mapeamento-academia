
document.addEventListener('DOMContentLoaded', function() {
    const ratingContainers = document.querySelectorAll('.rating-container');

    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.star');
        const ratingValue = container.querySelector('.rating-value span');
        let currentRating = 0;

        stars.forEach(star => {
            star.addEventListener('click', setRating);
            star.addEventListener('mouseover', addHoverEffect);
            star.addEventListener('mouseout', removeHoverEffect);
        });

        function setRating(event) {
            const starValue = parseInt(event.target.getAttribute('data-value'));
            currentRating = starValue;
            updateRating(currentRating, stars, ratingValue);
        }

        function addHoverEffect(event) {
            const starValue = parseInt(event.target.getAttribute('data-value'));
            updateRating(starValue, stars, ratingValue);
        }

        function removeHoverEffect() {
            updateRating(currentRating, stars, ratingValue);
        }
    });

    function updateRating(rating, stars, ratingValue) {
        stars.forEach(star => {
            if (parseInt(star.getAttribute('data-value')) <= rating) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
        ratingValue.textContent = rating;
    }
});

function enviarAvaliacao(){
    alert('Avaliação enviada! Muito obrigado!');
}