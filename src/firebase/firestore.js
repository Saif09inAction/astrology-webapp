import { db } from './config'
import {
  collection, addDoc, getDocs, updateDoc, doc,
  serverTimestamp, query, orderBy, where
} from 'firebase/firestore'

const LEADS_COLLECTION = 'leads'

export async function submitLead(data) {
  return addDoc(collection(db, LEADS_COLLECTION), {
    ...data,
    status: 'new',
    createdAt: serverTimestamp(),
  })
}

export async function getLeads() {
  const q = query(collection(db, LEADS_COLLECTION), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function updateLeadStatus(id, status) {
  return updateDoc(doc(db, LEADS_COLLECTION, id), { status })
}

export async function filterLeadsByStatus(status) {
  const q = query(
    collection(db, LEADS_COLLECTION),
    where('status', '==', status),
    orderBy('createdAt', 'desc')
  )
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
