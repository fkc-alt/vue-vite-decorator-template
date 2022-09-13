

const params = { name: '冯凯超', age: 22 };

type Params = typeof params;

function descriptors<T extends object, U>(params: T): Function {
    return function (target: any, name: string, descriptor: any) {
        const oldDescriptor: Function = descriptor.value;
        descriptor.value = function (args: U): void {
            Object.keys(params).forEach(key => target[key] = params[key as keyof T]);
            target.NumList = args;
            oldDescriptor.call(this, ...arguments);
        }
    }
}

class Demo {
    private num = 20;
    @descriptors<Params, Array<Number>>(params)
    public Log<T>(args: T): void {
        console.log('Log', this, arguments);
    }
}

export default new Demo();