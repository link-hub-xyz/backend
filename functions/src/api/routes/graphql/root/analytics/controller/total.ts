import { analyticsBaseQuery, intervalQuery, itemsQuery, interval } from './misc'

export default async function total(id: String) {

    const itemsRef = (await itemsQuery(id).get())
        .docs
        .map(doc => doc.data() as FirebaseFirestore.DocumentReference)
        .flat();
    
    const analyticsQuery = analyticsBaseQuery(itemsRef)

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
        analyticsQuery
        const query = intervalQuery(analyticsQuery, interval.start, interval.end);
        return {
            value: (await query.get()).docs.length,
            date: interval.end
        };
    }));

    return total;
}

