/*
 * TESTING ALL METHODS IN THEIR MOST BASIC FORM
 */



//////////////////////////////////////////////
//Create new tables
JSONDB.newTable("users");
JSONDB.newTable("testTable1");
JSONDB.newTable("testTable2");
//////////////////////////////////////////////



//////////////////////////////////////////////
//Schema creation
JSONDB.createSchema("users",
[
    ["name", "index"],
    ["surname", ""]
]);

//createSchemas
JSONDB.createSchemas(
    [
        "testTable1",
        "testTable2"
    ],
    [
        [
            ["Field_1", "index"],
            ["Field_2", "index"]
        ],
        [
            ["tField_1", "index"],
            ["tField_2", ""]
        ]
    ]
);
//////////////////////////////////////////////



//////////////////////////////////////////////
//insert test
JSONDB.insert("users", {"name":"Darren", "surname":"Leak", "test":"testField"});

//inserts test
JSONDB.inserts("users",
[
    {"name" : "Name 1", "surname" : "Surname 1"},
    {"name" : "Name 2", "surname" : "Surname 2"},
    {"name" : "Name 3", "surname" : "Surname 3"}
]);

//insertWithSchema test
// JSONDB.insertWithSchema("users", {"name":"Darren", "surname":"Leak"});
// JSONDB.insertWithSchema("users", {"name":"Darren", "surname":"Leak", "test":"testField"});

JSONDB.insertsWithSchema(
    [
        "users",
        "testTable1"
    ],
    [
        {"name":"Schemas1", "surname":"Leak", "test":"testField1"},
        {"Field 1":"Schemas2", "Field 2":"Leak"},
    ]
);
//////////////////////////////////////////////


//////////////////////////////////////////////
JSONDB.updateTable("users", "update users");
//////////////////////////////////////////////



console.log(JSONDB.data);
console.log(JSONDB.tableIndex);
console.log(JSONDB.tableSchema);
console.log(JSONDB.indexedFields);
