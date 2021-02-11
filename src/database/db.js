// importar a dependencia sqlite3
const sqlite3 = require("sqlite3").verbose()

const db = new sqlite3.Database("./src/database/database.db")

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT  
        );
    `)

            const query = `
                INSERT INTO places (
                    image,
                    name,
                    address,
                    address2,
                    state,
                    city,
                    items
                ) VALUES (?,?,?,?,?,?,?);
            `
            const values = ["https://images.unsplash.com/photo-1542827866-3e48c943da0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
            "Colectoria",
            "Guilherme Gemballa, Jardim América",
            "Número 260",
            "Santa Catarina",
            "Rio do Sul",
            "Resíduos Eletrônicos, lâmpadas"
            ]
            function afterInsertData(err){
                if(err){
                    return console.log(err)
                }
                console.log(this)
                console.log("Cadastrado com sucesso")   
            }
    // db.run(query, values, afterInsertData)
    db.all(`SELECT name FROM places`, function(err, rows){
        if(err){
            return console.log(err)
        }
        
        console.log("Aqui estão os seus registros")
        console.log(this)
    })

})

