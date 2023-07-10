let db = openDatabase('mydb', '1.0', 'my first database', 2 * 1024 * 1024);
let table = document.getElementById("data-table")
const list_tables = "SELECT name FROM sqlite_master WHERE type='table';"
const list_cols = "SELECT * FROM foo LIMIT 1"

function updateDBInfo() {
    db.transaction(function (tx) {
        tx.executeSql(list_tables, [], function (tx, results) {
            document.getElementById("no-table").textContent = `${results.rows.length-1} tables`
        });
    }); 
}

function execQueries(event) {
    event.preventDefault();
    document.getElementById("data-table").innerHTML = ""
    var inputString = document.getElementById("input_string").value.split(";");

    inputString.forEach(query => {
        db.transaction(function (tx) {
            tx.executeSql(query, [], function (tx, results) {
                var len = results.rows.length;

                if (len > 0) {
                    var keys = Object.keys(results.rows[0])
                    var content = "<tr>"

                    keys.forEach(key => {
                        content += `<th>${key}</th>`
                    })
                    content += "</tr>"

                    for (var i = 0; i < len; i++) {
                        content += "<tr>"
                        keys.forEach(key => {
                            content += `<td>${results.rows[i][key]}</td>`
                        })
                        content += "</tr>"
                    }
                    table.innerHTML = content
                }
            });
        });
    });
    updateDBInfo();
}