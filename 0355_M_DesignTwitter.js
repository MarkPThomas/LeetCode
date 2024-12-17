// 2024/12/17
// O() time complexity
// O(1) space complexity
// Time to complete: 40:10 (35:10) min
// Patterns: Priority Queue, Hashmap
// Notes w.r.t. solution: Had to make assumption on tweet IDs that was wrong - fixing took 5 min.
//  If I could have asked/had the right info, I would have developed it right the first time.
// Solved in 27 min, debugging minor edge cases & ID fix lasted to 40:10. 35:10 is subtracting that unnecessary detour.

var Twitter = function () {
  this.follows = {};
  this.tweets = {};
  this.tweetCount = 0;
  this.feedLimit = 10;
};

/**
* @param {number} userId
* @param {number} tweetId
* @return {void}
*/
Twitter.prototype.postTweet = function (userId, tweetId) {
  this.generateUser(userId);
  this.tweetCount++;
  this.tweets[userId].push(new Tweet(tweetId, this.tweetCount));
};

Twitter.prototype.generateUser = function (userId) {
  if (!this.follows[userId]) {
    this.follows[userId] = {};
  }

  if (!this.tweets[userId]) {
    this.tweets[userId] = [];
  }
}

/**
* @param {number} userId
* @return {number[]}
*/
Twitter.prototype.getNewsFeed = function (userId) {
  if (!this.follows[userId]) {
    return [];
  }

  const users = Object.keys(this.follows[userId]);
  users.push(userId);

  let newsFeed = new PriorityQueue({ compare: (a, b) => a.time - b.time });
  let hasNewer = false;
  let offset = 0;
  do {
    hasNewer = false;
    for (const user of users) {
      const tweets = this.tweets[user];
      if (!tweets.length || offset >= tweets.length) {
        continue;
      }

      const tweet = tweets[tweets.length - 1 - offset];
      if (newsFeed.size() === this.feedLimit
        && tweet.time < newsFeed.front().time) {
        continue;
      }

      newsFeed.enqueue(tweet);
      hasNewer = true;

      if (newsFeed.size() > this.feedLimit) {
        newsFeed.dequeue();
      }
    }
    offset++;
  } while (hasNewer);

  const publishedFeed = [];
  while (newsFeed.size()) {
    publishedFeed.push(newsFeed.dequeue().id);
  }

  return publishedFeed.reverse();
};

/**
* @param {number} followerId
* @param {number} followeeId
* @return {void}
*/
Twitter.prototype.follow = function (followerId, followeeId) {
  this.generateUser(followerId);
  this.generateUser(followeeId);

  this.follows[followerId][followeeId] = this.tweets[followeeId];
};

/**
* @param {number} followerId
* @param {number} followeeId
* @return {void}
*/
Twitter.prototype.unfollow = function (followerId, followeeId) {
  if (this.follows[followerId]) {
    delete this.follows[followerId][followeeId];
  }
};

class Tweet {
  constructor(tweetId, tweetCount) {
    this.id = tweetId;
    this.time = tweetCount;
  }
}

/**
* Your Twitter object will be instantiated and called as such:
* var obj = new Twitter()
* obj.postTweet(userId,tweetId)
* var param_2 = obj.getNewsFeed(userId)
* obj.follow(followerId,followeeId)
* obj.unfollow(followerId,followeeId)
*/