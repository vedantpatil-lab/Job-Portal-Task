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
        baseUrl : {
            type : DataTypes.STRING,
            allowNull : false
        },
        endpoint : {
            type : DataTypes.STRING,
            allowNull : false
        },
        method : {
            type : DataTypes.ENUM("GET", "POST", "PUT", "PATCH", "DELETE"),
            allowNull : false
        }
    }, {
        tableName : "permissions",
        timestamps : true,
        underscore : true
    })

    Permission.associate = (models)=>{
        Permission.belongsToMany(models.Role, {
            through : "role_permissions",
            foreignKey : "permission_id",
            otherKey : "role_id",
            as : "roles",
            onDelete : "CASCADE"    
        })
    }   

    return Permission
}