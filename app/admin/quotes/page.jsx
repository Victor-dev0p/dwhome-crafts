// app/admin/quotes/page.jsx - FIXED VERSION
import { connectToDB } from '@/lib/mongodb';
import Quote from '@/lib/models/Quote';
import QuotesList from './QuotesList';

export const dynamic = 'force-dynamic';

export default async function AdminQuotesPage() {
  let quotes = [];
  let error = null;
  
  try {
    console.log('🔌 Admin: Connecting to database...');
    await connectToDB();
    
    console.log('📋 Admin: Fetching quotes...');
    const rawQuotes = await Quote.find({})
      .sort({ createdAt: -1 })
      .lean()
      .exec();
    
    console.log(`✅ Admin: Found ${rawQuotes.length} quotes`);

    // Convert Mongo ObjectId and Date to strings for client components
    quotes = rawQuotes.map(q => ({
      ...q,
      _id: q._id.toString(),
      createdAt: q.createdAt?.toISOString() || null,
      updatedAt: q.updatedAt?.toISOString() || null,
      // Ensure all fields exist
      name: q.name || '',
      email: q.email || '',
      service: q.service || '',
      projectDetails: q.projectDetails || '',
      budget: q.budget || null,
      message: q.message || '',
    }));

  } catch (err) {
    console.error('❌ Admin: Failed to fetch quotes:', err);
    error = err.message;
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <h1 className="text-3xl font-bold mb-6 text-red-600">Error Loading Quotes</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-700">Failed to load quotes: {error}</p>
          <p className="text-sm text-red-600 mt-2">
            Check your database connection and try refreshing the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quote Requests</h1>
        <div className="text-sm text-gray-600">
          Total: {quotes.length} requests
        </div>
      </div>
      <QuotesList quotes={quotes} />
    </div>
  );
}