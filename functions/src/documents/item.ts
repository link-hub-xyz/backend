import { } from 'firebase-admin';
import Hub from './hub'

interface Item extends FirebaseFirestore.DocumentData {
    url: String
    hub: FirebaseFirestore.DocumentReference<Hub>
    analytics: Array<any>
}

export default Item;