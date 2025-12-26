module.exports = (sequelize, DataTypes)=>{
    const Permission = sequelize.define("Permission", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : true
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        url : {
            type : DataTypes.STRING,
            allowNull : false
        },
        baseUrl : {
            type : DataTypes.STRING,
            allowNull : false
        },
        method : {
            type : DataTypes.ENUM,
            values : ["GET", "POST", "PUT", "PATCH", "DELETE"]
        }
    }, {
        tableName : "permissions",
        timestamps : true,
        underscore : true
    })

    return Permission
}