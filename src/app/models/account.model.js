const mongoose = require("mongoose")

const schema = mongoose.Schema(
	{   
		username: String,
        password: String,
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('account', schema)