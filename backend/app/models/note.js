var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


var NoteSchema = new Schema({
	note: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

NoteSchema.virtual('id').get(function () {
	return this._id.toHexString();
});

NoteSchema.set('toJSON', {
	virtuals: true
});

mongoose.model('Note', NoteSchema);
