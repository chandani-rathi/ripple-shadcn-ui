import type { Tracked } from "ripple";
import { track } from "ripple";

export function isTrackedObject(v: Tracked) {
    return typeof v === 'object' && v !== null && typeof (v.f) === 'number';
}

export function isFunction(v: Tracked) {
    return typeof v === 'function';
}

export function trackProps(props: Record<string|symbol, any>) {
	var isTracked = isTrackedObject(props);

	if (isTracked || typeof props !== 'object' || props === null || Array.isArray(props)) {
		throw new TypeError('Invalid value: expected a non-tracked object');
	}

	return new Proxy(props, {
        ownKeys(target) {
            return Reflect.ownKeys(target);
        },
        getOwnPropertyDescriptor(target, key) {
            const desc = Object.getOwnPropertyDescriptor(target, key);
            if (!desc) return;
            return {
                ...desc,
                enumerable: true,
                configurable: true,
            };
        },
		get(target, key) {
			if (isTrackedObject(target[key]) || isFunction(target[key])) {
				return target[key];
			}
            
			let t = undefined;
			const prop = Object.getOwnPropertyDescriptor(props, key);
            if (prop && typeof prop.get === "undefined" && typeof prop.set == "undefined") {
                return prop.value
            }

            if(prop){
                t = track(undefined);
				t = Object.defineProperty(t, '__v', prop);
                t.isTrackedProxy = !prop.set;
            }
            
			return t;
		},
	});
}