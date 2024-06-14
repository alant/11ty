const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs');
const markdownItAnchor = require('markdown-it-anchor');
const pluginTOC = require('eleventy-plugin-toc')

  let markdownLibrary = markdownIt({ html: true })
    .use(markdownItAttrs)
    .use(markdownItAnchor);

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLibrary);
  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.addPassthroughCopy("assets"); 
	eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addGlobalData('currentYear', new Date().getFullYear());
};