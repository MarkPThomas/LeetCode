// 2025/06/25
// O(n) time complexity
// O(n) space complexity
// Time to complete: 17:25 min
// Patterns: Graph - DFS
// Notes w.r.t. solution:
/**
 * // This is the HtmlParser's API interface.
 * // You should not implement it, or speculate about its implementation
 * function HtmlParser() {
 *
 *		@param {string} url
 *     	@return {string[]}
 *     	this.getUrls = function(url) {
 *      	...
 *     	};
 * };
 */

/**
 * @param {string} startUrl
 * @param {HtmlParser} htmlParser
 * @return {string[]}
*/
var crawl = function (startUrl, htmlParser) {
  // urls w/ & w/o a trailing "/" are considered different
  // return all urls beneath domain of startURL
  function getDomain(url) {
    const urlPieces = url.split('/');
    return urlPieces[0] + '//' + urlPieces[2];
  }

  const domain = getDomain(startUrl);
  const domainUrls = [];

  const visited = new Set([startUrl]);
  const urls = [startUrl];
  while (urls.length) {
    const url = urls.pop();
    domainUrls.push(url);

    const nextUrls = htmlParser.getUrls(url);
    for (const nextUrl of nextUrls) {
      if (visited.has(nextUrl)) {
        continue;
      }
      visited.add(nextUrl);

      if (domain === nextUrl.substring(0, domain.length)) {
        urls.push(nextUrl);
      }
    }
  }

  return domainUrls;
};