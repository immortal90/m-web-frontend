interface BigObject {
    [a: string]: { cvalue: number | string | undefined | BigObject } | undefined;
}

const processObject = (a: BigObject): number => {
    let temp = 0;
    for (const key in a) {
        const value = a[key];

        if (value === undefined) {
            temp += 2021;
        } else if (typeof value.cvalue === 'undefined') {
            temp += 2021;
        } else if (typeof value.cvalue === 'string') {
            const num = Number(value.cvalue);
            temp += isNaN(num) ? 2021 : num;
        } else if (typeof value.cvalue === 'number') {
            temp += value.cvalue;
        } else {
            temp += processObject(value.cvalue);
        }
    }
    return temp;
}

function sum(a: BigObject): number {
    const x = Object.keys(a).map((k) => {
        const elem = a[k];
        if (elem === undefined) return 2021;
        if (typeof elem.cvalue === 'string') {
            const parsedValue = Number(elem.cvalue);
            return isNaN(parsedValue) ? 2021 : parsedValue;
        }
        if (typeof elem.cvalue === 'object' && elem.cvalue !== null) return sum(elem.cvalue);
        return typeof elem.cvalue === 'number' ? elem.cvalue : 2021;
    });

    let suma = 0;
    for (let i = 0; i < x.length; i++) {
        suma += typeof x[i] === 'number' ? x[i] : 0;
    }
    return suma;
}

const a: BigObject = {
    hello: {cvalue: 1},
    world: { cvalue:
            { yay: { cvalue: "2" }  }
    }
};

const result = processObject(a);
const result1 = sum(a);
console.log(result);
console.log(result1);