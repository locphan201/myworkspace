document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.getElementsByClassName('section');
    const sections = document.querySelectorAll('section');

    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function(event) {
            event.preventDefault();
            const target = this.getAttribute('href').substring(1);
        
            sections.forEach(function(section) {
                section.style.display = 'none';
            });

            document.getElementById(target).style.display = 'block';
        });
    }
});
