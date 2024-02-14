const startDate = new Date("2024-01-28")

function differenceInDays(date1, date2) {
    const date1Milliseconds = date1.getTime();
    const date2Milliseconds = date2.getTime();
    const differenceMilliseconds = Math.abs(date1Milliseconds - date2Milliseconds);
    const differenceInDays = Math.floor(differenceMilliseconds / (24 * 60 * 60 * 1000));
    return differenceInDays;
}

function loadHomePage() {
    document.getElementById("home-page").innerHTML += `
        <div id="info">
            <h3 id="time">${differenceInDays(startDate, new Date())} Days Together</h3>
            <h3 id="names">Mắm - Muối</h3>
        </div>
    `
}

loadHomePage();