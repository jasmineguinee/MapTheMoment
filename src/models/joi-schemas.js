import Joi from "joi";
import argon2 from "argon2";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

  const passwordSpec = Joi.alternatives().try(
    Joi.string().example("secret").required(),
    Joi.string().pattern(/^\$argon2(id|i)\$.$/).required(),
  ).required();

  export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: passwordSpec,
  }).label("UserCredentials");


export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const ReviewSpec = Joi.object()
  .keys({
  content: Joi.string().required().example("I do not like this venue"),
  postedBy: Joi.string().optional().example("Johnny Barry"),
  time: Joi.string().optional().example("string of time"),
  venueid: IdSpec,
  })
  .label("Review");


export const RatingSpec = Joi.object()
  .keys({
  number: Joi.number().required().example(5),
  userid: Joi.string().optional().example("userid goes here"),
  venueid: IdSpec,
  })
  .label("Rating");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const ReviewSpecPlus = ReviewSpec.keys({
  _id: IdSpec,
  __v:Joi.number(),
}).label("ReviewPlus")

export const RatingSpecPlus = RatingSpec.keys({
  _id: IdSpec,
  __v:Joi.number(),
}).label("RatingPlus")

export const ReviewArraySpec = Joi.array().items(ReviewSpecPlus).label("ReviewArray");

export const RatingArraySpec = Joi.array().items(RatingSpecPlus).label("RatingArray");

export const VenueSpec = Joi.object()
  .keys({
  title: Joi.string().required().example("Fota Island Resort"),
  venuetype: Joi.string().required().example("wedding"),
  description: Joi.string().required().example("This is a luxury Irish wedding venue that can cater to very large weddings"),
  latitude: Joi.number().allow("").required().example(5),
  longitude: Joi.number().allow("").required().example(6),
  visability: Joi.string().required().example("private"),
  poster: Joi.string().optional().example("David Barry"),
  areaid: IdSpec,
  img: Joi.any().optional(),
  imagefile: Joi.any().optional(),
  reviews: ReviewArraySpec,
  ratings: RatingArraySpec,
  })
  .label("Venue");


export const VenueSpecPlus = VenueSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("VenuePlus");


export const VenueArraySpec = Joi.array().items(VenueSpecPlus).label("VenueArray");

export const AreaSpec = Joi.object()
  .keys({
    title: Joi.string().required().example("Beethoven Sonatas"),
    userid: IdSpec,
    venues: VenueArraySpec,
  })
  .label("Area");

export const AreaSpecPlus = AreaSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("AreaPlus");

export const AreaArraySpec = Joi.array().items(AreaSpecPlus).label("AreaArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example("true").required(),
    token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
  })
  .label("JwtAuth");

export const PostSpec = Joi.object()
  .keys({
    body: Joi.string().required().example("I wanted to post about this venue because"),
    userid: IdSpec,
    venueid: Joi.string().allow("").optional().example("5231e197-1589-42be-9bfc-b45618c7c02c"),
    poster: Joi.string().optional().example("David Barry"),
    time: Joi.string().optional().example("17/5/27 12:00"),
  })
  .label("Post");

export const PostSpecPlus = PostSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("PostPlus");

export const PostArraySpec = Joi.array().items(PostSpecPlus).label("PostArray");