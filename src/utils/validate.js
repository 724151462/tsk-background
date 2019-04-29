
import Globe_VM from '@/main.js'
function validator(target, validator) {
    return new Proxy(target, {
        _validator: validator,
        get(target, key) {
            if(key === 'age') {
                if(target[key] <18) {
                    return '未成年'
                }
            }else{
                return target[key]
            }
            
        },
        set(target, key, value, proxy) {
            if (target.hasOwnProperty(key)) {
                let va = this._validator[key];
                if (!!va(value)) {
                    return Reflect.set(target, key, value, proxy)
                } else {
                    // throw Error(`不能设置${key}到${value}`)
                    let msg = ''
                    if(key === 'userName') {
                        msg = '输入数字用户名'
                    }else{
                        msg = '密码长度过短'
                    }
                    Globe_VM.$store.commit("HIDELOADING");
                    Globe_VM.$message({
                        message: msg,
                        type: 'warning'
                    })
                }
            } else {
                throw Error(`${key} 不存在`)
            }
        }
    })
}

const personValidators = {
    userName(val) {
        let reg = /^[0-9]*$/;
        if(reg.test(val)) {
            return true
        }else{
            return false
        }
        
    },
    password(val) {
        return val.length > 5
    },
    mobile123(val) {

    }
}

class Person {
    constructor(name, pwd) {
        this.userName = name;
        this.password = pwd;
        return validator(this, personValidators)
    }
}

export default Person