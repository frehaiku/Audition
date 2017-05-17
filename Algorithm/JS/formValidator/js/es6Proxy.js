/**
 * Created by frehaiku on 2017/5/17.
 */
// 为false时表示验证不通过
const validators = {
    minLength (value, length) {
        return value.length >= length
    },
    isMobile (value) {
        return /^1(3|5|7|8|9)[0-9]{9}$/.test(value)
    },
    isEmail (value) {
        return /^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
    }
}

function validator(target, validator, errorMsg) {
    return new Proxy(target, {
        _validator: validator,
        set (target, key, value, proxy) {
            let errMsg = errorMsg
            if (value == '') {
                alert(`${errMsg[key]}不能为空`)
                return target[key] = false
            }

            let va = this._validator[key]
            if (!!va(value)) {
                return Reflect.set(target, key, value, proxy)
            } else {
                alert(`${errMsg[key]}格式不正确`)
                return target[key] = false
            }
        }
    })
}

const errorMsg = {name: '用户名', passwd: '密码', mobile: '手机号码', email: '邮箱地址'}
const vali = validator({}, validators, errorMsg)

let registerForm = document.querySelector('#registerForm')
registerForm.addEventListener('submit', function (e) {
    let validatorNext = function* () {
        yield vali.name = registerForm.userName.value
        yield vali.passwd = registerForm.passWord.value
        yield vali.mobile = registerForm.phoneNumber.value
        yield vali.email = registerForm.emailAddress.value
    }

    let validator = validatorNext()

    for (let correct of validator) {
        if (!correct) {
            e.preventDefault();
            return {done: true}
        }
    }
}, false)



