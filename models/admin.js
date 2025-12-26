const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 255],
                is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
            }
        }
    }, {
        tableName: "admin",
        timestamps: true,
        underscored: true,
        hooks: {
            beforeCreate: async (admin) => {
                admin.password = await bcrypt.hash(admin.password, 10)
            },
            beforeUpdate: async (admin) => {
                if (admin.changed("password")) {
                    admin.password = await bcrypt.hash(admin.password, 10)
                }
            }
        }
    })
    return Admin
}
