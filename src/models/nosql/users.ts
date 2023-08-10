import mongoose from 'mongoose'
import mongooseDelete, { type SoftDeleteDocument } from 'mongoose-delete'

interface User extends SoftDeleteDocument {
  name: string
  email: string
  role: string
  password: string
  birthdate: Date
}

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user'
    },
    password: {
      type: String
    },
    birthdate: {
      type: Date
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

UserSchema.plugin(mongooseDelete, { overrideMethods: 'all' })
const UserModel = mongoose.model<User>('users', UserSchema)

export default UserModel
