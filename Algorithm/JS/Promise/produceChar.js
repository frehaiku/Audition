// 用尽可能快的方式生成有一万个相同字符的字符串

function productChar(char) {
    let promiseArr = []
        , total = ''

    for (let i = 0; i < 10000; i++) {
        promiseArr.push(new Promise((resolve) => {
            total += 'a'
            resolve(char)
        }))
    }

    Promise.all(promiseArr)
        .then(datas => {
            console.log(datas.join(''))
        })
}

productChar('a')