const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");
const { execSync } = require("child_process");
const markdownItAttrs = require("markdown-it-attrs");
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require("eleventy-plugin-toc");
const markdownItMath = require("markdown-it-math");
const markdownItRuby = require("markdown-it-ruby");

module.exports = function (eleventyConfig) {
  // Configure Markdown-It
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  })
    .use(markdownItAttrs)
    .use(markdownItAnchor)
    .use(markdownItMath)
    .use(markdownItRuby)
    .enable(["table", "inline"]);

  eleventyConfig.setLibrary("md", markdownLibrary);

  // Plugins
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h1", "h2", "h3"],
    wrapper: "div",
    wrapperClass: "toc",
  });

  // Passthrough files
  eleventyConfig.addPassthroughCopy("assets");

  // Global data
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

  // Filter to format date as YYYY-MM-DD
  eleventyConfig.addFilter("formatDate", (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  });

  // Get git last modified date for a file
  eleventyConfig.addFilter("gitLastModified", (inputPath) => {
    try {
      const date = execSync(`git log -1 --format="%ai" -- "${inputPath}"`, {
        encoding: "utf-8",
      }).trim();
      return date ? new Date(date) : null;
    } catch (e) {
      return null;
    }
  });

  // Notes collection
  eleventyConfig.addCollection("notes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("notes/*.md");
  });
};
