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
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h1', 'h2', 'h3'], // Customize to include h1, h2, and h3
    wrapper: 'div',           // Optional: specify a wrapper element, e.g., 'div'
    wrapperClass: 'toc'       // Optional: add a class for styling
  });
  eleventyConfig.addPassthroughCopy("assets"); 
	eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addGlobalData('currentYear', new Date().getFullYear());
};