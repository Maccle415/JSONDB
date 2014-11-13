JSONDB =
{
    data : {}, // the main db
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
    }
}


/*
 * Function : adds a new field to the table
 * @param table -string : table name that the field must be added to
 * @param field -string : the new filed name
 * @param type -string : "single" or "object"
 * @param index - string : bool
 */
JSONDB.addField = function (table, field, type, index)
{
    switch (type)
    {
        case "single" :
            JSONDB.data[table][field] = "";
            break;
        case "object" :
            JSONDB.data[table][field] = {};
            break;
        default :
            //nothing here
    }
};

/*
 * Function : adds a new fields to the table
 * @param table - string : table name that the fields must be added to
 * @param fields - array : the new fileds
 * @param types - array : "single" or "object"
 * @param indexs - array : true or false
 * NOTE : all the arrays above must have the same amount of elements
 */
JSONDB.addFields = function (table, fields, types, indexs)
{
    for (field in fields)
    {
        switch (types[field])
        {
            case "single" :
                JSONDB.data[table][fields[field]] = "";
                break;
            case "object" :
                JSONDB.data[table][fields[field]] = {};
                break;
            default :
                //nothing here
        }
    }
};

/*
 * Function : removes a field from table
 * @param table - string : name of the table that contains the field
 * @param field - string : field name to be deleted
 */
JSONDB.removeField = function (table, field)
{
    if (JSONDB.data[table][field] !== undefined)
    {
        delete JSONDB.data[table][field];
    }
    else
    {
        console.log("Field : " + field + " in table : " + table + "does not exist");
    }
};

/*
 * Function : removes fields from table
 * @param table - string : name of the table that contains the fields
 * @param field - array : field names to be deleted
 */
JSONDB.removeFields = function (table, fields)
{
    for (field in fields)
    {
        if (JSONDB.data[table][fields[field]] !== undefined)
        {
            delete JSONDB.data[table][fields[field]];
        }
        else
        {
            console.log("Field : " + fields[field] + " in table : " + table + " does not exist");
        }
    }
};

/*
 * Function : removes a table
 * @param table - string : name of the table to be removed
 */
JSONDB.removeTable = function (table)
{
    if (JSONDB.data[table] !== undefined)
    {
        delete JSONDB.data[table];
    }
    else
    {
        console.log("Table : " + table + " does not exist");
    }
};

/*
 * Function : removes a tables
 * @param table - string : name of the tables to be removed
 */
JSONDB.removeTables = function (tables)
{
    for (table in tables)
    {
        if (JSONDB.data[tables[table]] !== undefined)
        {
            delete JSONDB.data[tables[table]];
        }
        else
        {
            console.log("Table : " + tables[table] + " does not exist");
        }
    }
};

/*
 * Function : create index on field in table
 * @param table - string : table name the the field is in
 * @param field - string : field that must be indexed
 */
JSONDB.createIndex = function (table, field)
{
    //nothing yet
};

/*
 * Function : finds a record in the table with the id field
 * @param table - string : table name the the field is in
 * @param id - string : id of the entry in the above table
 */
JSONDB.findById = function (table, id)
{

};

/*
 * Function : finds a record in all tables where the field is = to the fieldValue
 * @param field - string : field that must be searched for
 * @param fieldValue - string : the value of the field
 * @param exactMatch - bool : false - contains, true - exact
 * NOTE : this will search all tables for this field and value
 */
JSONDB.findByField = function (field, fieldValue, exactMatch)
{

};

/*
 * Function : finds all records in table where field has value = to fieldValue
 * @param table - string : table name the the field is in
 * @param field - string : field that must be searched for
 * @param fieldValue - string : the value of the field
 * @param exactMatch - bool : false - contains, true - exact
 */
JSONDB.findInTableByField = function (table, field, fieldValue, exactMatch)
{

};

/*
 * Function : finds all records in the tables where the fields = fieldValue
 * @param table - string : table name the the field is in
 * @param field - string : field that must be searched for
 * @param fieldValue - string : the value of the field
 * @param exactMatch - bool : false - contains, true - exact
 */
JSONDB.findInTablesByFields = function (tables, fields, fieldValue, exactMatch)
{

};
