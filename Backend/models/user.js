
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        match: '^.+\@.+\..+$',
        required: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    }
});

const User = mongoose.model('users', userSchema);

export default User;
