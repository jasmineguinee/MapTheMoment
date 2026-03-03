export const aboutController = {
  index: {
    handler: function (request, h) {
      const viewData = {
        title: "About MapTheMoment",
      };
      return h.view("about-view", viewData);
    },
  },
};
