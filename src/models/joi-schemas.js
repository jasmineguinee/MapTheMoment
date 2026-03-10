import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const VenueSpec = Joi.object()
  .keys({
  title: Joi.string().required().example("Fota Island Resort"),
  venuetype: Joi.string().required().example("wedding"),
  description: Joi.string().required().example("This is a luxury Irish wedding venue that can cater to very large weddings"),
  latitude: Joi.number().allow("").required().example(5),
  longitude: Joi.number().allow("").required().example(6),
  areaid: IdSpec,
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
