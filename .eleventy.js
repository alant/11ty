const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { execSync } = require("child_process");
const markdownIt = require("markdown-it");
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

  // Notes collection — sorted by git last-commit date so order is consistent in CI/deployment
  const gitLastModified = (inputPath) => {
    try {
      const out = execSync(`git log -1 --format=%ct -- ${JSON.stringify(inputPath)}`).toString().trim();
      return out ? parseInt(out, 10) : 0;
    } catch { return 0; }
  };

  eleventyConfig.addCollection("notes", function(collectionApi) {
    return collectionApi.getFilteredByGlob("notes/*.md").sort((a, b) =>
      gitLastModified(b.inputPath) - gitLastModified(a.inputPath)
    );
  });
};
