/**
 * Created by frehaiku on 2017/5/10.
 */
process.nextTick(() => {
    console.log(1)
    process.nextTick(() => console.log(2))
})

setTimeout(() => console.log(3))

// 1
// 2
// 3