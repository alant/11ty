const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require('markdown-it-anchor');
const pluginTOC = require('eleventy-plugin-toc')
const markdownItMath = require('markdown-it-math');

module.exports = function (eleventyConfig) {
  let markdownLibrary = markdownIt({
      html: true,
      breaks: true,
      linkify: true})
    .use(markdownItMath)
    .use(markdownItAttrs)
    .use(markdownItAnchor);

  eleventyConfig.setLibrary('md', markdownLibrary);
  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.addPassthroughCopy("assets"); 
	eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addGlobalData('currentYear', new Date().getFullYear());
};