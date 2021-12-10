import { analyticsBaseQuery, intervalQuery, itemsQuery, interval } from './misc'

export default async function daily(id: String) {

    const itemsRef = (await itemsQuery(id).get())
        .docs
        .map(doc => doc.data() as FirebaseFirestore.DocumentReference)
        .flat();
    
    const analyticsQuery = analyticsBaseQuery(itemsRef)

    const intervals = [
        interval(-7, -6),
        interval(-6, -5),
        interval(-5, -4),
        interval(-4, -3),
        interval(-3, -2),
        interval(-2, -1),
        interval(-1, 0),
    ];

    const daily = Promise.all(intervals.map(async interval => {
        analyticsQuery
        const query = intervalQuery(analyticsQuery, interval.start, interval.end);
        return {
            value: (await query.get()).docs.length,
            date: interval.start
        };
    }));

    return daily;
}

