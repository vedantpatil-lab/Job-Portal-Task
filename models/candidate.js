const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const Candidate = sequelize.define('Candidate', {
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
        tableName: "candidates",
        timestamps: true,
        underscored: true,
        hooks: {
            beforeCreate: async (candidate) => {
                candidate.password = await bcrypt.hash(candidate.password, 10)
            },
            beforeUpdate: async (candidate) => {
                if (candidate.changed('password')) {
                    candidate.password = await bcrypt.hash(candidate.password, 10)
                }
            }
        }
    }
    )
    Candidate.associate = (models) => {
         
    }
}

