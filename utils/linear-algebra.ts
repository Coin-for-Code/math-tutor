
export class Vector3D {
    readonly x: number;
    readonly y: number;
    readonly z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public isEqual(other: Vector3D): boolean {
        return this.x===other.x && this.y===other.y && this.z===other.z
    }
}

export function isNumber(text: string): boolean {
    if (text.startsWith('-')) {
        return !isNaN(Number(text.slice(1)));
    }
    return !isNaN(Number(text));
}


export function randomInteger(): number {
    return Math.floor(Math.random()*10)
}

function randomSignedInteger(): number {
    return (Math.random() >= 0.5 ? 1 : -1)*randomInteger()
}

export function randomVector() {
    return new Vector3D(randomSignedInteger(), randomSignedInteger(), randomSignedInteger());
}

export function cross(v1: Vector3D, v2: Vector3D): Vector3D {
    return new Vector3D((v1.y*v2.z)-(v2.y*v1.z),(v2.x*v1.z)-(v1.x*v2.z),(v1.x*v2.y)-(v2.x*v1.y));
}