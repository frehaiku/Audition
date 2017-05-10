setImmediate(function () {
    setImmediate(function () {
        console.log(1)
        setImmediate(function () {
            console.log(2)
        })
    })

    setTimeout(function () {
        console.log('TIMEOUT FIRED')
    }, 0)
})

// 1
// TIMEOUT FIRED
// 2
