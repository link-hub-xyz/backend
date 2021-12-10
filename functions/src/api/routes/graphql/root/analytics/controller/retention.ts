import { interval } from "./misc";

export default async function retention(id: String) {

    const intervals = [
        interval(-7, -6),
        interval(-7, -5),
        interval(-7, -4),
        interval(-7, -3),
        interval(-7, -2),
        interval(-7, -1),
        interval(-7, 0),
    ];

    const total = Promise.all(intervals.map(async interval => {
        return {
            value: 0,
            date: interval.end
        };
    }));

    return total;
}