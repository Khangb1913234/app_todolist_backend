const mongoose = require("mongoose")

const schema = mongoose.Schema(
	{   
		name: String,
		id_account: mongoose.Schema.Types.ObjectId
	},
	{
		timestamps: true
	}
)

module.exports = mongoose.model('entity', schema)