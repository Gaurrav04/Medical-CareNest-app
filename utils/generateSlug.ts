export default function generateSlug(title:string) {
    return title
      .toLowerCase() // Convert to lowercase
      .trim() // Remove whitespace from both ends
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with dashes
      .replace(/-+/g, '-'); // Remove multiple dashes
  }