// import { connectToDatabase } from '@/lib/mongodb';
// import User from '@/lib/models/User';
// import bcrypt from 'bcryptjs';

// export async function GET() {
//   await connectToDatabase();

//   const email = process.env.ADMIN_USER;
//   const plainPassword = process.env.ADMIN_PASS;
//   const hashedPassword = await bcrypt.hash(plainPassword, 10);

//   const user = await User.findOneAndUpdate(
//     { email },
//     { email, password: hashedPassword },
//     { upsert: true, new: true }
//   );

//   return new Response(
//     JSON.stringify({
//       message: 'Admin password reset',
//       user: { id: user._id, email: user.email },
//     }),
//     { status: 200 }
//   );
// }
