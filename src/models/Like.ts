import { DataTypes, Model } from "sequelize";
import { CourseInstance } from "./Course";
import { UserInstance } from "./User";
import { sequelize } from "../database";

export interface Like {
  userId: number;
  courseId: number;
}

export interface LikeInstance extends Model<Like>, Like {
  Course?: CourseInstance;
  user?: UserInstance;
}

export const Like = sequelize.define<LikeInstance, Like>("Like", {
  userId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "users",
      key: "id",
    },
  },
  courseId: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
    references: {
      model: "courses",
      key: "id",
    },
  },
});
