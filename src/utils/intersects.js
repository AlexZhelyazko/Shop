const intersect3 = (xs, ys) => xs.filter(x => ys.some(y => y.title === x.title));

export function intersect(...rest) {
    let nonEmptyArrays = []
    for (let i = 0; i < rest.length; i++) {
        if (rest[i].length !== 0) {
            nonEmptyArrays.push(rest[i])
        }
    }
    const firsrArr = nonEmptyArrays[0]
    const secondArr = nonEmptyArrays[1]
    const params = nonEmptyArrays[2]
    return intersect2(firsrArr, secondArr, params)
}

function intersect2(xs, ys, ...rest) {
    if (ys === undefined) {
        return xs
    } else {
        return intersect2(intersect3(xs, ys), ...rest)
    }
}