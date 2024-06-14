const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require('markdown-it')
const markdownItAttrs = require('markdown-it-attrs');
const pluginTOC = require('eleventy-plugin-toc')

let markdownLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true
}).use(markdownItAttrs);

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary('md', markdownLib);
  eleventyConfig.addPlugin(pluginTOC);
  eleventyConfig.addPassthroughCopy("assets"); 
	eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addGlobalData('currentYear', new Date().getFullYear());
};