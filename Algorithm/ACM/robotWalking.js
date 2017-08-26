/**
 * Created by 海枯 on 2017/8/24.
 * 一排有N个位置，一个机器人在最开始停留在P位置上，
 * 如果P==0位置，下一分钟机器人一定向右移动到1位置；
 * 如果P==N-1，下一分钟机器人一定向左移动到N-2位置。
 * 如果P在0和N-1之间，下一分钟机器人一定回向左或右移动。
 * 求K分钟的时候，机器人到达T位置有多少种走法。
 *
 * 函数为int f(int N, int P, int K, int T),返回值为走法的数量
 */

/**
 * 暴力递归法
 * @param N 一共N个位置
 * @param P 当前位置（从第0个位置开始）
 * @param K 第K分钟后
 * @param T 目标位置（从第0个位置开始）
 */
function f(N, P, K, T) {
  if (N < 2 || P < 0 || T < 0 || N < P + 1 || K < 1 || N < T + 1)
    return 0

  if (K == 1)
    return P == T ? 1 : 0

  if (P == 0)
    return f(N, P + 1, K - 1, T)

  if (P == N - 1)
    return f(N, P - 1, K - 1, T)

  return f(N, P + 1, K - 1, T) + f(N, P - 1, K - 1, T)
}
// console.log(f(3, 0, 4, 1))

/**
 * DP法
 * @param N 一共N个位置
 * @param P 当前位置（从第0个位置开始）
 * @param K 第K分钟后
 * @param T 目标位置（从第0个位置开始）
 */
function f1(N, P, K, T) {
  if (N < 2 || P < 0 || T < 0 || N < P + 1 || K < 1 || N < T + 1)
    return 0

  let ans = new Array(K + 1)

  for (let i = 1; i <= K; i++) {
    let inner = new Array(N)
    if (i == 1) {
      inner[T] = 1
      for (let j = 0; j < T; j++)
        inner[j] = 0
      for (let j = T + 1; j < N; j++)
        inner[j] = 0
    } else {
      inner[0] = ans[i - 1][1]
      inner[N - 1] = ans[i - 1][N - 2]

      for (let j = 1; j < N - 1; j++)
        inner[j] = ans[i - 1][j - 1] + ans[i - 1][j + 1]
    }
    ans[i] = inner
  }
  return ans[K][P]
}
// console.log(f1(3, 0, 4, 1))

function main() {
  const SUM = 1000
  // 对数器
  for (let i = 0; i < SUM; i++) {
    let N = ~~(Math.random() * 5) * 5
    let P = ~~(Math.random() * N)
    let K = ~~(Math.random() * 10) + 2
    let T = ~~(Math.random() * N)

    let res1 = f(N, P, K, T)
    let res2 = f1(N, P, K, T)
    if (res1 !== res2) {
      console.log('error answer!')
    }
  }
}
main()