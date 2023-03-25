const mongoose = require('mongoose');

const Notifications = {
  type: Notification,
  message: String,
  timestamps: true,
};

const Settings = {
  type: Settings,
};

const userSchema = mongoose.Schema(
  {
    //Primary
    username: {
      type: String,
      required: [true, 'Input a username'],
      unique: true,
      minlength: [3, 'Username is too short'],
    },
    email: {
      type: String,
      required: [true, 'Input a valid email'],
      unique: true,
      maxlength: [254, 'Email is too long'],
      verified: Boolean,
    },
    password: {
      type: String,
      required: [true, 'Input a valid password'],
      maxlength: 30,
    },
    profile: {
      firstName: String,
      lastName: String,
      pictureUrl: String,
      bio: String,
      country: String,
      language: String,
      phone: {
        number: String,
        verified: Boolean,
      },
      socials: {
        twitter: String,
        github: String,
        facebook: String,
      },
    },
    roles: {
      type: String,
      enum: ['student', 'teacher', 'admin'],
      default: 'student',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'blocked'],
      default: 'active',
    },

    //Additional
    progress: {
      completedLessons: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
      ],
      currentLesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' },
    },
    enrolledCourses: {
      type: [Schema.Types.ObjectId],
      ref: 'Courses',
    },
    completedCourses: {
      type: [Schema.Types.ObjectId],
      ref: 'Courses',
    },
    bookmark: {
      type: [Schema.Type.ObjectId],
      ref: 'Courses',
    },
    comments: [
      {
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        lessonId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Lesson',
          required: true,
        },
        // Add any other relevant fields like author, replies, etc.
      },
    ],
    notifications: [
      {
        type: { type: String, required: true },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        lessonId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Lesson',
          required: true,
        },
        // other relevant fields like sender, link, etc.
      },
    ],
    settings: {
      language: { type: String, default: 'en' },
      emailNotifications: { type: Boolean, default: true },
      username: { type: String, required: true },
      hashedPassword: { type: String, required: true },
      profilePicture: { type: String },
      bio: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Users', userSchema);
