import { connectToDB } from '@/lib/mongodb';
import Quote from '@/lib/models/Quote';
import QuotesList from './QuotesList';

export const dynamic = 'force-dynamic';

export default async function AdminQuotesPage() {
  await connectToDB();
  const quotes = await Quote.find().sort({ createdAt: -1 }).lean();

  // Convert Mongo ObjectId and Date to strings
  const serializedQuotes = quotes.map(q => ({
    ...q,
    _id: q._id.toString(),
    createdAt: q.createdAt?.toISOString() || null,
    updatedAt: q.updatedAt?.toISOString() || null,
  }));

  return <QuotesList quotes={serializedQuotes} />;
}
