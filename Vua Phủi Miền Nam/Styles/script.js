document.getElementById("drawer-toggle").addEventListener("click", function () {
    var drawer = document.getElementById("drawer");
    drawer.classList.toggle("open");
});

function redirectTo(url) {
    window.location.href = url;
}