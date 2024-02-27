// 海鸥类
function Flock() {
  this.seagulls = n;
}

const flock = new Flock(1);

// 其他海鸥加入
Flock.prototype.conjoin = function (other) {
  this.seagulls += other.seagulls;
  return this;
};

// 繁殖
Flock.prototype.breed = function (other) {
  this.seagulls = this.seagulls * other.seagulls;
  return this;
};

var flock_a = new Flock(4);
var flock_b = new Flock(2);
var flock_c = new Flock(0);

// 有外部数据，可能会影响结果输出
var result = flock_a
  .conjoin(flock_c)
  .breed(flock_b)
  .conjoin(flock_a.breed(flock_b)).seagulls;
//=> 32
