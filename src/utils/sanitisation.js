import sanitizeHtml from "sanitize-html";
// https://www.npmjs.com/package/sanitize-html

 export function cleanHtml(input) {
if (typeof input !== "string")
    return input;

  return sanitizeHtml(input,{
    allowedTags: [ "b", "i", "em", "strong", "a" ],
    allowedAttributes: {
        "a": [ "href" ]
    },
    allowedSchemes: [ "http", "https",  "ftp", "mailto", "tel"],
    // ensuring any links user enters safe links only and that links can't control site
    transformTags: {
        a: sanitizeHtml.simpleTransform("a", {rel: "noopener noreferrer"}),
    }
  });

}

