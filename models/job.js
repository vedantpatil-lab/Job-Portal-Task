module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define("Job", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 255]
            }
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [50]
            }
        }

    }, {
        tableName: "jobs",
        timestamps: true,
        underscored: true,
    });

    Job.associate = (models) => {
        Job.belongsTo(models.Recruiter, {
            foreignKey: "recruiter_id",
            onDelete: "CASCADE"
        })
    }

    return Job
}



