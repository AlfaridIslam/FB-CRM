import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    facebookId: string;
    name: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
        facebookId: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        firstName: String,
        lastName: String,
        middleName: String,
        birthday: Date,
        gender: String,
        link: String,
        location: {
            id: String,
            name: String
        },
        hometown: {
            id: String,
            name: String
        },
        picture: {
            data: {
                height: Number,
                is_silhouette: Boolean,
                url: String,
                width: Number
            }
        },
        friends: {
            summary: {
                total_count: Number
            }
        },
        posts: [{
            id: String,
            created_time: Date,
            message: String,
            story: String
        }],
        about: String,
        ageRange: {
            min: Number,
            max: Number
        },
        locale: String,
        timezone: Number,
        updatedTime: Date,
        verified: Boolean,
        work: [{
            employer: {
                id: String,
                name: String
            },
            location: {
                id: String,
                name: String
            },
            position: {
                id: String,
                name: String
            },
            start_date: String,
            end_date: String
        }],
        education: [{
            school: {
                id: String,
                name: String
            },
            type: String,
            year: {
                id: String,
                name: String
            },
            concentration: [{
                id: String,
                name: String
            }]
        }],
        website: String,
        languages: [{
            id: String,
            name: String
        }],
        cover: {
            id: String,
            offset_x: Number,
            offset_y: Number,
            source: String
        }
    }, { timestamps: true });

// Create and export the User model and IUser interface
const FbUser: Model<IUser> = mongoose.model<IUser>("FbUser", userSchema);
export { FbUser, IUser };
