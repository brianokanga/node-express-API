const mongoose = require('mongoose');
const slugify = require('slugify');
// Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'], //validator
      unique: true,
      trim: true
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty']
    },
    ratingsAverage: {
      type: Number,
      default: 4.5
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number,
      summary: {
        type: Number,
        trim: true,
        required: [true, 'A tour must have a description']
      }
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createAt: {
      type: Date,
      default: Date.now()
      // select: false
    },
    startDates: [Date]
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

// VIRTUAL PROPERTIES
tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// MONGOOSE MIDDLEWARE
// Document middleware: runs before save() amd .create()
// pre-document middleware function(pre save hook)
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function(next) {
//   console.log('Will save document');
//   next();
// });

// // post-document middleware function
// // hook is the action - save, hence-post save hook
// tourSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// Tour model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
