const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	products: [
		{
			name: {
				type: String,
				required: true
			},
			amount: {
				type: String,
				required: true
			},
			isRefrigeratorRequired: {
				type: Boolean,
				required: true
			}
		}
	],
	comment: String,
	status: {
		type: String,
		enum: ['pending', 'performed', 'closed'],
		default: 'pending'
	},
	date: {
		type: Date,
		default: Date.now
	}
});


const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;