const mongoose = require('mongoose');
const VideoSchema = mongoose.Schema({
    name : String,
    path : String,
    user_id : String,
    is_active  : String,
    created_at   : String,
    updated_at  : String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Videos', VideoSchema);
