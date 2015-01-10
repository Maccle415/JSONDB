////////////////////////////////////////////////
//START - MAIN JSONDB OBJECT
////////////////////////////////////////////////



JSONDB =
{
    data : {}, // the main db
    tableIndex : {},
    tableSchema : {},
    indexedFields : {}, //table : field name
    indexes : {}//tableFieldName : {rest of normal tables
};



////////////////////////////////////////////////
//END - MAIN JSONDB OBJECT
////////////////////////////////////////////////



////////////////////////////////////////////////
//START - TABLE AND SCHEMA CREATION
////////////////////////////////////////////////



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
    if (JSONDB.data[table] === undefined)
    {
        for (table in tables)
        {
            JSONDB.data[tables[table]] = {};
            JSONDB.tableIndex[tables[table]] = 0;
        }
    }
}

/*
 * Function : creates schema for table
 * @param table - string : table name that the schema is created for
 * @param schema - array : schema for the table
 */
JSONDB.createSchema = function (table, schema)
{
    var schemaArray = [];
    var schemaOptions = [];

    if (JSONDB.tableSchema[table] === undefined)
    {
        for (field in schema)
        {
            schemaArray.push(schema[field][0]);
        }

        JSONDB.tableSchema[table] = schemaArray;

        for (field in schema)
        {
            schemaOptions = schema[field][1].split("|");

            if (schema[field][1] !== "" || schema[field][1] instanceof Array)
            {
                JSONDB.createIndexedFieldList(table, schema[field]);
            }
        }
    }
    else
    {
        console.error ("There is already a schema for table : '" + table + "''");
    }
};

/*
 * Function : creates schemas for tables
 * @param table - array : all the tables that need a schema
 * @param schema - array : schemas for the tables
 */
JSONDB.createSchemas = function (tables, schemas)
{
    for (table in tables)
    {
        JSONDB.createSchema(tables[table], schemas[table]);
    }
};


////////////////////////////////////////////////
//END - TABLE AND SCHEMA CREATION
////////////////////////////////////////////////



////////////////////////////////////////////////
//START - DATABASE FUNCTIONS
////////////////////////////////////////////////



/*
 * Function : adds value to table
 * @param table - string : table name
 * @param value - object : key value pair in table structure
 */
JSONDB.insert = function (table, value)
{
    if (JSONDB.data[table] === undefined)
    {
        console.error("Cannot insert into table : " + table + " because table does no exist");
        return false;
    }

    var tableIndex = JSONDB.tableIndex[table];

    JSONDB.data[table][tableIndex] = value;
    JSONDB.tableIndex[table]++;

    JSONDB.index(table, value, tableIndex);
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
 * Function : creates schema for table
 * @param table - string : table name for the schema
 * @param value - object : schema structure
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

    JSONDB.index(table, tableObject, tableIndex);

};

/*
 * Function : creates schemas for tables
 * @param table - array : array of table names to add schemas to
 * @param value - object array : array of schemas to add to table
 */
JSONDB.insertsWithSchema = function (tables, values)
{
    for (table in tables)
    {
        JSONDB.insertWithSchema(tables[table], values[table]);
    }
};

/*
 * Function : updates table name
 * @param table - string : name of the new table
 * @param update - string : new name for the table
 */
JSONDB.updateTableName = function(table, update)
{
    var db = JSONDB.data;
    var tableIndex = JSONDB.tableIndex;
    var tableSchema = JSONDB.tableSchema;

    if (JSONDB.data[table] !== undefined)
    {
        //update the table name
        JSONDB.newTable(update);
        db[update] = db[table];
        delete db[table];

        //update the tableIndex name
        tableIndex[update] = tableIndex[table];
        delete tableIndex[table];

        //update the tableSchema name
        tableSchema[update] = tableSchema[table];
        delete tableSchema[table];
    }
};

/*
 * Function : updates field value
 * @param table - string : name of the new table
 * @param where - string : field name
 * @param current - string : current field value
 * @param update - string : new value for field for field
 * @param options - array : (NOT YET IMPLEMENTED) options that can be added like
 *                  - LIMIT
 */
JSONDB.update = function(table, where, current, update, options)
{
    if (JSONDB.data[table] === undefined)
    {
        console.error("Cannot update table : " + table + " because it does not exist");
        return false;
    }

    var indexedFields;
    var indexes = JSONDB.indexes[table];
    var tbl = JSONDB.data[table];

    //checks if the table has indexed fields
    if (JSONDB.indexedFields[table] !== undefined)
    {
        if (JSONDB.indexedFields[table][where] !== undefined)
        {
            indexedFields = JSONDB.indexedFields[table];

            for (field in indexedFields)
            {
                if (where == field)
                {
                    //REINDEX FIELD ON UPDATE
                    //console.log(indexes[where][current] + " - Table : " + table + " | Current : " + current + " | Update : " + update);
                    for (key in indexes[where][current])
                    {
                        if (tbl[key][where] == current)
                        {
                            tbl[key][where] = update;
                        }
                    }
                }
            }
        }
        else
        {
            for (key in tbl)
            {
                if (tbl[key][where] == current)
                {
                    tbl[key][where] = update;
                }
            }
        }
    }
    else
    {
        for (key in tbl)
        {
            if (tbl[key][where] == current)
            {
                tbl[key][where] = update;
            }
        }
    }

};

/*
 * Function : updates field value
 * @param table - string array : name of the new table
 * @param where - string array : field name
 * @param current - string array : current field value
 * @param update - string array : new value for field for field
 * @param options - multidim array : - needs to be the last arg - (NOT YET IMPLEMENTED) options that can be added like
 *                  - LIMIT
 */
JSONDB.updates = function (tables, wheres, currents, updates, options)
{
    var minLength;

    for (index in arguments)
    {
        if (index == 0)
        {
            minLength = arguments[index].length;
        }

        if (options === undefined)
        {
            if (arguments[index].length < minLength && index < arguments.length)
            {
                console.error("Function : Updates(With no options) - Argument lengths are not the same");
                return false;
            }
        }
        else
        {
            if (arguments[index].length < minLength)
            {
                console.error("Function : Updates(With options) - Argument lengths are not the same");
                return false;
            }
        }
    }

    for (index in tables)
    {
        if (options === undefined)
        {
            JSONDB.update(tables[index], wheres[index], currents[index], updates[index]);
        }
        else
        {
            JSONDB.update(tables[index], wheres[index], currents[index], updates[index], options[index]);
        }
    }
};

//NEED TO ADD THE UPDATE FIELD NAME



////////////////////////////////////////////////
//END - DATABASE FUNCTIONS
////////////////////////////////////////////////



////////////////////////////////////////////////
//START - INDEXING FUNCTIONALITY
////////////////////////////////////////////////



/*
 * Function : stores the fields that are indexed per table
 * @param table - string : table name
 * @param schema - array : schema and the indexes
 */
JSONDB.createIndexedFieldList = function (table, schema)
{
    if (JSONDB.data[table] === undefined)
    {
        console.error("Cannot create indexed fields because table : " + table + " does not exist");
        return false;
    }

    if (JSONDB.tableSchema[table] === undefined)
    {
        console.error("A schema for table : '" + table + "' does not exist.");
        return false;
    }

    var schemaOptions = [];

    if (schema[1] !== "")
    {
        schemaOptions = schema[1].split("|");
    }

    schema[1] = schemaOptions;

    //make sure that this method only creates the object for the table once
    if (JSONDB.indexedFields[table] === undefined)
    {
        JSONDB.indexedFields[table] = {};
    }

    JSONDB.indexedFields[table][schema[0]] = {};

    for (s in schema[1])
    {
        JSONDB.indexedFields[table][schema[0]] = schema[1];
    }

};

/*
 * Function : create index for table
 * @param table - string : table name
 * @param schema - array : schema and the indexes
 */
JSONDB.index = function (table, tableObject, tableIndex)
{
    if (JSONDB.indexedFields[table] !== undefined)
    {
        var tableFields = JSONDB.indexedFields[table];

        if (JSONDB.indexes[table] === undefined)
        {
            JSONDB.indexes[table] = {};
        }

        for (field in tableFields)
        {
            if (JSONDB.indexes[table][field] === undefined)
            {
                JSONDB.indexes[table][field] = {};
            }
        }

        for (field in tableObject)
        {
            if (tableFields[field] !== undefined)
            {
                if (JSONDB.indexes[table][field][tableObject[field]] === undefined)
                {
                    JSONDB.indexes[table][field][tableObject[field]] = [];
                }

                JSONDB.indexes[table][field][tableObject[field]].push(tableIndex);
            }
        }
    }
};



////////////////////////////////////////////////
//END - INDEXING FUNCTIONALITY
////////////////////////////////////////////////
