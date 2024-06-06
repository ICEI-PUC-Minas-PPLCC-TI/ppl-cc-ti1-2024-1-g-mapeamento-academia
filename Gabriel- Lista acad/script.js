document.addEventListener("DOMContentLoaded", function() {
    var listItems = document.querySelectorAll('.list-group-item');
    listItems.forEach(function(item) {
        item.addEventListener('click', function(event) {
            event.preventDefault();
            this.classList.toggle('selected');
        });
    });
});
