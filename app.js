/*
 * TESTING ALL METHODS IN THEIR MOST BASIC FORM
 */



//////////////////////////////////////////////
//Create new tables
JSONDB.newTable("users");
JSONDB.newTable("usersNoIndex");
JSONDB.newTable("testTable1");
JSONDB.newTable("testTable2");
//////////////////////////////////////////////



//////////////////////////////////////////////
//Schema creation
JSONDB.createSchema("users",
[
    ["name", "index"],
    ["surname", ""],
    ["email", "index"],
    ["username", "index"]
]);

JSONDB.createSchema("usersNoIndex",
[
    ["name", ""],
    ["surname", ""],
    ["email", ""],
    ["username", ""]
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
JSONDB.insert("users", {"name":"Darren", "surname":"Leak", "test":"testField1"});
JSONDB.insert("users", {"name":"Darren", "surname":"test", "test":"testField2"});
JSONDB.insert("usersNoIndex", {"name":"Darren", "surname":"test", "test":"testField2"});

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
        {"name":"Schemas1", "surname":"Leak1", "email":"testEmail", "username":"testUsername", "test":"test"},
        {"Field_1":"Schemas 2", "Field_2":"Leak"},
    ]
);
//////////////////////////////////////////////


//////////////////////////////////////////////
//update test
JSONDB.update("users", "name", "Darren", "Darren Updated");
JSONDB.update("usersNoIndex", "surname", "test", "test Updated");

//updates test
JSONDB.updates(
    ["users", "testTable1"],
    ["name", "Field_1"],
    ["Darren Updated", "Schemas 2"],
    ["Darren Updated 1", "Schemas 2 Updated"]
);

//update table name test
JSONDB.updateTableName("users", "update users");
//////////////////////////////////////////////



console.log("Data");
console.log(JSONDB.data);
// console.log("Table Index");
// console.log(JSONDB.tableIndex);
// console.log("Table Schema");
// console.log(JSONDB.tableSchema);
// console.log("Indexed Fields");
// console.log(JSONDB.indexedFields);
// console.log("Indexes");
// console.log(JSONDB.indexes);
