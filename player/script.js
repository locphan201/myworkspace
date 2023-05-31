var players = {
    "1": {
        name: "Phan Vĩnh Lộc",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "2": {
        name: "Nguyễn Hoàng Phúc",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "3": {
        name: "Nguyễn Trường Xuân Thịnh",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "4": {
        name: "Trần Công Nam",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "5": {
        name: "Trần Quốc Phi",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "5": {
        name: "Nguyễn Đăng Trình",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "6": {
        name: "Huỳnh Huy Hoàng",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "7": {
        name: "Nguyễn Thế Phong",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "8": {
        name: "Nguyễn Anh Tuấn",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "9": {
        name: "Hậu Phúc",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "10": {
        name: "Trọng Thắng",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "11": {
        name: "Huy Nguyễn",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "12": {
        name: "Hưng Nguyễn",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "13": {
        name: "Nguyễn Bá Việt Phúc",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "14": {
        name: "Khánh Nguyễn",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 3
    },
    "15": {
        name: "Lâm Duy Niên",
        position: "",
        age: 22,
        nationality: "Mỹ",
        appearance: 2
    },
    "16": {
        name: "Võ Gia Huy",
        position: "",
        age: 22,
        nationality: "Việt Nam",
        appearance: 1
    },
}

document.addEventListener("DOMContentLoaded", function() {
    var playerList = document.getElementById("player-list")
    var listItems = ""
    for (var playerId in players) {
        listItems += '<li onclick="showPlayerInfo(\'' + playerId + '\')">' + players[playerId].name + '</li>'
    }
    playerList.innerHTML = '<h2>Danh sách</h2><ul>' + listItems + '</ul>'
})

function showPlayerInfo(id) {
    var playerInfo = players[id]
    
    var playerInfoDiv = document.getElementById("player-info")
    playerInfoDiv.innerHTML = ""
    playerInfoDiv.innerHTML += "<h2>" + playerInfo.name + "</h2>"
    playerInfoDiv.innerHTML += '<img src="" alt="' + playerInfo.name + '">'
    playerInfoDiv.innerHTML += "<p><strong>Vị trí:</strong> " + playerInfo.position + "</p>"
    playerInfoDiv.innerHTML += "<p><strong>Tuổi:</strong> " + playerInfo.age + "</p>"
    playerInfoDiv.innerHTML += "<p><strong>Quốc tịch:</strong> " + playerInfo.nationality + "</p>"
    playerInfoDiv.innerHTML += "<p><strong>Số trận:</strong> " + playerInfo.appearance + "</p>"

    var playerSpeed = document.getElementById("player-speed")
    playerSpeed.style.width = "70%"
    playerSpeed.innerHTML = 70

    var listItems = document.querySelectorAll("#player-list ul li");
    for (var i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove("selected");
    }

    listItems[parseInt(id)-1].classList.add("selected");

}