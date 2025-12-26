module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.ENUM("admin", "candidate", "recruiter"),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: "roles",
        timestamps: true,
        underscored: true
    })

    Role.associate = (models) => {
        Role.belongsToMany(models.Permission, {
            through: "role_permissions",
            foreignKey: "role_id",
            otherKey: "permission_id",
            as: "permissions",
            onDelete: "CASCADE"
        })
    }

    return Role
}