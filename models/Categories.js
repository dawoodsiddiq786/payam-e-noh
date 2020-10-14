const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    name : String,
    is_active  : String,
    created_at   : String,
    updated_at  : String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Categories', CategorySchema);
