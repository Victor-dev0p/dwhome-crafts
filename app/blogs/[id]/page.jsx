import { connectToDB } from "@/lib/mongodb";
import Blog from "@/lib/models/Blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import AuthorMeta from "@/components/Admin/AuthorMeta";

export default async function BlogPostPage({ params }) {
  await connectToDB();

  let blog;
  try {
    blog = await Blog.findById(params.id)
      .select("title content excerpt image author createdAt")
      .lean();
  } catch (error) {
    console.error("Invalid blog ID:", error);
    notFound();
  }

  if (!blog) notFound();

  let blogImage = null;
  if (blog.image?.data && blog.image.contentType) {
    try {
      const buffer = blog.image.data.buffer;
      blogImage = `data:${blog.image.contentType};base64,${buffer.toString("base64")}`;
    } catch (error) {
      console.error("Error converting image buffer to base64:", error);
    }
  }

  const adHTML = `
    <div style="background-color:#111827;color:white;padding:0.50rem;border-radius:0.25rem;margin:2rem 0;">
      <p style="display:flex;align-items:center;gap:0.25rem;font-size:0.625rem;color:#9CA3AF;margin-bottom:0.25rem;">
        <span>📢</span>
        <span>Ad by Dwhome & Crafts</span>
      </p>
      <p style="font-size:1.5rem;color:#D1D5DB;margin:0;">Transform Your Home into a Masterpiece</p>
      <p style="color:#9CA3AF;font-size:0.875rem;margin-top:0.25rem;">Dwhome & Crafts offers premium furniture and bespoke interior designs that blend style, comfort, and functionality—bringing your dream home to life.</p>
      <div style="display:flex;justify-content:flex-end;margin-top:0.5rem;">
        <a href="https://wa.me/2347058749114" style="min-width:8rem;padding:0.5rem 0.50rem;border-radius:9999px;background-color:#F5F5F4;border-bottom:3px solid #A8A29E;color:#1F2937;text-decoration:none;display:inline-flex;align-items:center;gap:0.25rem;">
          <span>Get in Touch</span>
          <span>➜</span>
        </a>
      </div>
    </div>
  `;

  let blogContent = blog.content || "";
  const firstPIndex = blogContent.indexOf("</p>");
  if (firstPIndex !== -1) {
    blogContent =
      blogContent.slice(0, firstPIndex + 4) + adHTML + blogContent.slice(firstPIndex + 4);
  } else {
    blogContent += adHTML;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mt-6 mb-2">{blog.title}</h1>

      <AuthorMeta
        author={blog.author || "Unknown Author"}
        date={blog.createdAt || new Date()}
      />

      {blogImage ? (
        <Image
          src={blogImage}
          alt={blog.title}
          width={1024}
          height={400}
          className="w-full h-auto object-cover rounded mb-6"
          priority
        />
      ) : (
        <Image
          src={`https://placehold.co/1024x400/CCCCCC/333333?text=${encodeURIComponent(blog.title)}`}
          alt={blog.title}
          width={1024}
          height={400}
          className="w-full h-auto object-cover rounded mb-6"
        />
      )}

      {blog.excerpt && (
        <p className="text-xl italic text-gray-600 dark:text-gray-400 mb-6">
          {blog.excerpt}
        </p>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blogContent }}
      />
    </div>
  );
}
