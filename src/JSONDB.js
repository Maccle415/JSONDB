JSONDB =
{
    data : {}, // the main db
    tableIndex : {},
    tableSchema : {},
    indexedFields : {}, //table : field name
    indexes : {}//tableFieldName : {rest of normal tables
};

/*
 * Function : creates a new table
 * @param table - string : name of the new table
 */
JSONDB.newTable = function (table)
{
    if (JSONDB.data[table] == undefined)
    {
        JSONDB.data[table] = {};
        JSONDB.tableIndex[table] = 0;
    }
};

/*
 * Function : creates new tables
 * @param tables - array : name of the new tables
 */
JSONDB.newTables = function (tables)
{
    for (table in tables)
    {
        JSONDB.data[tables[table]] = {};
        JSONDB.tableIndex[tables[table]] = 0;
    }
}

/*
 * Function : creates schema for table
 * @param table - string : table name that the schema is created for
 * @param schema - array : schema for the table
 */
JSONDB.createSchema = function (table, schema)
{
    JSONDB.tableSchema[table] = schema;
};

/*
 * Function : adds value to table
 * @param table - string : table name
 * @param value - object : key value pair in table structure
 */
JSONDB.insert = function (table, value)
{
    JSONDB.data[table][JSONDB.tableIndex[table]] = value;
    JSONDB.tableIndex[table]++;
};

/*
 * Function : adds multiple values to a table
 * @param table - string : table name
 * @param values - object : key value pair in table structure
 */
JSONDB.inserts = function (table, values)
{
    for (value in values)
    {
        JSONDB.insert(table, values[value]);
    }
}

/*
 * Function : adds value to table
 * @param table - string : table name
 * @param value - object : key value pair in table structure
 * NOTE : this will only allow for accepted values, if values are added
 *        but the keys do not exist in the schema then the values will
 *        removed from the insert
 */
JSONDB.insertWithSchema = function (table, value)
{
    if (JSONDB.tableSchema[table] === undefined)
    {
        console.error("A schema for table : '" + table + "' does not exist.");
        return false;
    }

    var schemaFields = JSONDB.tableSchema[table];
    var tableObject = {};
    var tableIndex = JSONDB.tableIndex[table];

    for (field in schemaFields)
    {
        tableObject[schemaFields[field]] = value[schemaFields[field]];
    }

    JSONDB.data[table][tableIndex] = tableObject;
    JSONDB.tableIndex[table]++;

};
