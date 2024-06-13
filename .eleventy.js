const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')
const pluginTOC = require('eleventy-plugin-toc')

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownIt().use(markdownItAnchor));
  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.addPassthroughCopy("assets/css/styles.css"); 
	eleventyConfig.addPlugin(syntaxHighlight);
};