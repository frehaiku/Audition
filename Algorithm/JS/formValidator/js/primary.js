/**
 * Created by frehaiku on 2017/5/16.
 */

// 具体策略角色
const strategies = {
    isNonEmpty (value, errorMsg) {
        return value === '' ? errorMsg : void 0
    },
    minLength (value, length, errorMsg) {
        return value.length < length ? errorMsg : void 0
    },
    isMobile (value, error) {
        return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ?
            error : void 0
    },
    isEmail (value, error) {
        return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
            error : void 0
    }
}

class Validator {
    constructor() {
        this.cache = [] // 保存校验规则
    }

    add(dom, rules) {
        for (let rule of rules) {
            // [minLength, 6]
            let strategyArg = rule.strategy.split(/\s*:\s*/)
            let errMsg = rule.errorMsg

            this.cache.push(() => {
                let attr = strategyArg.shift() // minLength
                strategyArg.unshift(dom.value) // [dom.value, 6]
                strategyArg.push(errMsg)

                return strategies[attr].apply(dom, strategyArg)
            })
        }
    }

    start() {
        for (let fn of this.cache) {
            var errorMsg = fn();
            if (errorMsg) {
                return errorMsg
            }
        }
    }
}

let regForm = document.querySelector('#registerForm')

const validatorFunc = () => {
    var validator = new Validator()

    validator.add(regForm.userName, [
        {
            strategy: 'isNonEmpty',
            errorMsg: '用户名不能为空'
        },
        {
            strategy: 'minLength:6',
            errorMsg: '用户名的长度不能小于6位'
        }
    ])

    validator.add(regForm.passWord, [
        {
            strategy: 'minLength:6',
            errorMsg: '密码的长度不能小于6位'
        }
    ])

    validator.add(regForm.phoneNumber, [
        {
            strategy: 'isMobile',
            errorMsg: '手机号格式不匹配'
        }
    ])

    validator.add(regForm.emailAddress, [
        {
            strategy: 'isEmail',
            errorMsg: '邮箱格式不合法'
        }
    ])

    return validator.start()
}


regForm.addEventListener('submit', function (e) {
    let errorMsg = validatorFunc()
    if (errorMsg) {
        alert(errorMsg)
        e.preventDefault()
    }

}, false)