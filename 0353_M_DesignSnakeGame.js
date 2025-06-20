// 2025/06/20
// Initialize
//  O(1) time complexity
//  O(1) space complexity
// Move
//  O(1) time complexity
//  O(w * h + f) space complexity
//  where f = # food items
// Time to complete: +36:49 min
// Patterns: Design, Queue, Hashmap
// Notes w.r.t. solution: Done most of solution in this time.
//  Stopped recording time when debugging minor issues (had a few).
//  More explicit breakdown of steps/components into classes & functions could have avoided this.
/**
 * @param {number} width
 * @param {number} height
 * @param {number[][]} food
 */
var SnakeGame = function (width, height, food) {
  this.deltas = {};
  this.deltas['U'] = [-1, 0];
  this.deltas['D'] = [1, 0];
  this.deltas['L'] = [0, -1];
  this.deltas['R'] = [0, 1];

  this.width = width;
  this.height = height;
  this.food = new Queue(food);

  this.snake = new Snake();
  this.score = 0;
};

/**
* @param {string} direction
* @return {number}
*/
SnakeGame.prototype.move = function (direction) {
  const nextTile = this.nextTile(...this.snake.head(), direction);

  // check in-bounds
  // check self-intersection
  if (!this.isInBounds(...nextTile)
    || this.snake.hit(...nextTile)) {
    return -1;
  }

  const ateFood = this.isFoodAt(...nextTile);
  if (ateFood) {
    this.score++;
    this.food.dequeue();
  }

  this.snake.move(nextTile, ateFood);

  return this.score;
};

SnakeGame.prototype.nextTile = function (y, x, direction) {
  const [yDelta, xDelta] = this.deltas[direction];
  return [y + yDelta, x + xDelta];
}

SnakeGame.prototype.isInBounds = function (y, x) {
  return 0 <= x && x < this.width
    && 0 <= y && y < this.height;
}

SnakeGame.prototype.isFoodAt = function (y, x) {
  if (this.food.size()) {
    const [yFood, xFood] = this.food.front();

    return y === yFood && x === xFood;
  }

  return false;
}

/**
* Your SnakeGame object will be instantiated and called as such:
* var obj = new SnakeGame(width, height, food)
* var param_1 = obj.move(direction)
*/

class Snake {
  constructor(y = 0, x = 0) {
    this.ends = new Queue(),
      this.ends.enqueue([y, x]);

    this.body = new Set()
    this.body[[y, x]] = true;
  }

  head() {
    return this.ends.back();
  }

  tail() {
    return this.ends.front();
  }

  hit(y, x) {
    if ([y, x] in this.body) {
      const [yTail, xTail] = this.tail();
      if (!(y === yTail && x === xTail)) {
        return true;
      }
    }

    return false;
  }

  move(nextTile, ateFood = false) {
    if (!ateFood) { // Move tail along
      delete this.body[this.ends.dequeue()];
    }

    this.ends.enqueue(nextTile); // Move forward into head
    this.body[nextTile] = true;
  }
}