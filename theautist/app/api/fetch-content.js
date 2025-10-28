import { Octokit } from "@octokit/rest";
import { put, head } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const owner = "awfixer";
    const repo = "content";
    const path = "blog";

    // Recursive function to fetch and store files
    async function fetchAndStore(dirPath) {
      const { data: contents } = await octokit.repos.getContent({
        owner,
        repo,
        path: dirPath,
      });

      for (const item of contents) {
        if (item.type === "file") {
          // Fetch file content
          const { data: fileData } = await octokit.repos.getContent({
            owner,
            repo,
            path: item.path,
          });
          const contentBuffer = Buffer.from(fileData.content, "base64");

          // Optional: Check if changed by comparing SHA (using Blob metadata or head())
          const existingBlob = await head(`blog/${item.name}`).catch(
            () => null,
          );
          if (existingBlob && existingBlob.hashes.sha1 === fileData.sha) {
            console.log(`Skipping unchanged file: ${item.path}`);
            continue;
          }

          // Upload to Vercel Blob (public access for blog reading; overwrite if needed)
          await put(`blog/${item.name}`, contentBuffer, {
            access: "public",
            contentType: "text/markdown", // Or detect based on extension
            allowOverwrite: true, // Enable if you want to update existing files
            cacheControlMaxAge: 3600, // 1 hour cache; adjust as needed
          });
          console.log(`Uploaded: ${item.path}`);
        } else if (item.type === "dir") {
          // Recurse into subdirectories
          await fetchAndStore(item.path);
        }
      }
    }

    // Start fetching from root content path
    await fetchAndStore(path);

    res
      .status(200)
      .json({ message: "Content fetched and stored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch/store content" });
  }
}
