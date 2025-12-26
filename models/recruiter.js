const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
    const Recruiter = sequelize.define('Recruiter', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
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
        tableName: "recruiters",
        timestamps: true,
        underscored: true,
        hooks: {
            beforeCreate: async (recruiter) => {
                recruiter.password = await bcrypt.hash(recruiter.password, 10)
            },
            beforeUpdate: async (recruiter) => {
                if (recruiter.changed("password")) {
                    recruiter.password = await bcrypt.hash(recruiter.password, 10)
                }
            }
        }   
    })

    Recruiter.associate = (models)=>{
        Recruiter.hasMany(models.Job, {
            foreignKey : "recruiterId",
            onDelete : "CASCADE"
        })
    }

    return Recruiter
}
