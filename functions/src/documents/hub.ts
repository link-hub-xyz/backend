import { } from 'firebase-admin';

interface Hub extends FirebaseFirestore.DocumentData {
    creator: String
    name: String
    items: [FirebaseFirestore.DocumentReference]
}

export default Hub;