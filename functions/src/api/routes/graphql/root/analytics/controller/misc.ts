
import * as admin from 'firebase-admin'

export function itemsQuery(
    id: String,
): FirebaseFirestore.Query<FirebaseFirestore.DocumentData> {
    const db = admin.firestore();
    return db
        .collection('hubs')
        .where('creator', '==', id)
        .select('items')
        .withConverter({
            toFirestore(_p: any) { throw 'cannot write' },
            fromFirestore(snapshot: admin.firestore.QueryDocumentSnapshot) {
                return snapshot.get('items')
            }
        })
}

export function analyticsBaseQuery(
    itemsRef: FirebaseFirestore.DocumentReference[]
): FirebaseFirestore.Query<FirebaseFirestore.DocumentData> {
    const db = admin.firestore();
    return db
        .collection('analytics')
        .where(
            'item',
            'in',
            itemsRef
        )
}

export function intervalQuery(
    analyticsQuery: FirebaseFirestore.Query<FirebaseFirestore.DocumentData>,
    start: Date,
    end: Date
): FirebaseFirestore.Query<FirebaseFirestore.DocumentData> {
    return analyticsQuery
        .where('date', '>', start)
        .where('date', '<=', end);
}

export function interval(start: number, end: number) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + start);
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + end);
    return {
        start: startDate,
        end: endDate
    }
}