module.exports = (sequelize, DataTypes)=>{
    const Role = sequelize.define('Role', {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.ENUM,
            values : ["admin", "candidate", "recruiter"]
        }
    }, {
        timestamps : true,
        tableName : "roles",
        underscored : true
    })

    return Role
}